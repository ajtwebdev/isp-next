#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const https = require('https')

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const full = path.join(dir, file)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      walk(full, filelist)
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      filelist.push(full)
    }
  })
  return filelist
}

function fetchJson(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'node-fetch-vimeo/1.0',
        },
      },
      (res) => {
        // handle redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          if (redirects > 5) return reject(new Error('Too many redirects'))
          const next = new URL(res.headers.location, url).toString()
          return resolve(fetchJson(next, redirects + 1))
        }

        if (res.statusCode !== 200) {
          let errBody = ''
          res.on('data', (c) => (errBody += c))
          res.on('end', () => reject(new Error(`HTTP ${res.statusCode}: ${errBody.slice(0, 200)}`)))
          return
        }

        const contentType = (res.headers['content-type'] || '').toLowerCase()
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => {
          try {
            // Defensive: if server returns something with a prefix (rare), try to locate the JSON start
            if (!/application\/json/.test(contentType)) {
              const idx = data.indexOf('{')
              if (idx > 0) data = data.slice(idx)
            }
            resolve(JSON.parse(data))
          } catch (err) {
            const snippet = data.slice(0, 200).replace(/\n/g, ' ')
            reject(new Error(`Failed to parse JSON (${err.message}). Response snippet: ${snippet}`))
          }
        })
      }
    )

    req.on('error', reject)
  })
}

function fetchBuffer(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      { headers: { 'User-Agent': 'node-fetch-vimeo/1.0' } },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          if (redirects > 5) return reject(new Error('Too many redirects'))
          const next = new URL(res.headers.location, url).toString()
          return resolve(fetchBuffer(next, redirects + 1))
        }

        if (res.statusCode !== 200) {
          let errBody = ''
          res.on('data', (c) => (errBody += c))
          res.on('end', () => reject(new Error(`HTTP ${res.statusCode}: ${errBody.slice(0, 200)}`)))
          return
        }

        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => resolve(Buffer.concat(chunks)))
      }
    )

    req.on('error', reject)
  })
}

async function main() {
  const root = process.cwd()
  const scanDirs = [path.join(root, 'components'), path.join(root, 'pages')]
  const files = []
  scanDirs.forEach((d) => {
    if (fs.existsSync(d)) files.push(...walk(d))
  })

  const idSet = new Set()
  const re = /player\.vimeo\.com\/video\/(\d+)/g
  for (const f of files) {
    const txt = fs.readFileSync(f, 'utf8')
    let m
    while ((m = re.exec(txt))) idSet.add(m[1])
  }

  if (!fs.existsSync(path.join(root, 'public'))) fs.mkdirSync(path.join(root, 'public'))
  const postersDir = path.join(root, 'public', 'posters')
  if (!fs.existsSync(postersDir)) fs.mkdirSync(postersDir)

  const sharp = (() => {
    try {
      return require('sharp')
    } catch (e) {
      return null
    }
  })()

  const ids = Array.from(idSet)
  if (!ids.length) {
    console.log('No Vimeo IDs found in components/pages')
    return
  }

  for (const id of ids) {
    try {
      console.log('Processing', id)

      const destJpg = path.join(postersDir, `${id}.jpg`)
      const destWebp = path.join(postersDir, `${id}.webp`)

      if (fs.existsSync(destWebp) || fs.existsSync(destJpg)) {
        console.log('Already downloaded', id)
        continue
      }

      // Try primary and alternate oEmbed endpoints
      const oembedUrls = [
        `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}`,
        `https://vimeo.com/api/oembed.json?url=https://player.vimeo.com/video/${id}`,
      ]

      let oembed = null
      let lastErr = null
      for (const u of oembedUrls) {
        try {
          oembed = await fetchJson(u)
          break
        } catch (e) {
          lastErr = e
        }
      }

      // If oEmbed failed (404/private/deleted), fall back to vumbnail.com
      if (!oembed || !oembed.thumbnail_url) {
        // Attempt vumbnail service as a last resort
        const vumbnail = `https://vumbnail.com/${id}.jpg`
        try {
          const buf = await fetchBuffer(vumbnail)
          if (sharp) {
            await sharp(buf).resize({ width: 1600 }).webp({ quality: 75 }).toFile(destWebp)
            console.log('Saved (vumbnail)', destWebp)
          } else {
            fs.writeFileSync(destJpg, buf)
            console.log('Saved (vumbnail)', destJpg)
          }
          continue
        } catch (e) {
          console.error('Failed for', id, (lastErr && lastErr.message) || (e && e.message))
          continue
        }
      }

      const thumb = oembed.thumbnail_url

      if (!thumb) {
        console.warn('No thumbnail for', id)
        continue
      }

      const buf = await fetchBuffer(thumb)
      if (sharp) {
        await sharp(buf).resize({ width: 1600 }).webp({ quality: 75 }).toFile(destWebp)
        console.log('Saved', destWebp)
      } else {
        fs.writeFileSync(destJpg, buf)
        console.log('Saved', destJpg)
      }
    } catch (err) {
      console.error('Failed for', id, err && err.message)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
