import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export default function LazyVimeo({ src, title = 'Video', placeholderColor = 'var(--clr-dark)', aspectRatio = '100%', poster = null, autoLoad = true, priority = false }) {
  // aspectRatio is expressed as padding-top percentage string, e.g. '56.25%'
  const [loaded, setLoaded] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    if (!autoLoad) return
    if (typeof IntersectionObserver !== 'undefined') {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setLoaded(true)
              io.disconnect()
            }
          })
        },
        { rootMargin: '200px' }
      )
      io.observe(ref.current)
      return () => io.disconnect()
    }

    const t = setTimeout(() => setLoaded(true), 1500)
    return () => clearTimeout(t)
  }, [autoLoad])

  function handleClick() {
    setLoaded(true)
  }

  return (
    <div ref={ref} style={{ padding: `${aspectRatio} 0 0 0`, position: 'relative' }}>
      {!loaded && (
        <div
          onClick={handleClick}
          role="button"
          tabIndex={0}
          aria-label={`Load ${title}`}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: placeholderColor,
            cursor: 'pointer',
            overflow: 'hidden',
          }}
        >
          {poster ? (
            <Image
              src={poster}
              alt={title}
              fill
              priority={priority}
              style={{ objectFit: 'cover', pointerEvents: 'none' }}
              sizes="(max-width: 640px) 100vw, 800px"
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0 }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.02) 100%)',
                  animation: 'shimmer 1.6s infinite',
                }}
              />
              <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>
            </div>
          )}

          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#fff', pointerEvents: 'auto' }}>
            <svg width="68" height="48" viewBox="0 0 68 48" aria-hidden>
              <path d="M66.52 7.03a8 8 0 00-5.66-5.66C55.55 0 34 0 34 0s-21.55 0-26.86 1.37a8 8 0 00-5.66 5.66C0 12.34 0 24 0 24s0 11.66 1.48 16.97a8 8 0 005.66 5.66C12.45 48 34 48 34 48s21.55 0 26.86-1.37a8 8 0 005.66-5.66C68 35.66 68 24 68 24s0-11.66-1.48-16.97z" fill="#f00"/>
              <path d="M45 24L27 14v20z" fill="#fff"/>
            </svg>
            <div style={{ marginTop: 8, opacity: 0.95 }}>Play video</div>
          </div>
        </div>
      )}

      {loaded && (
        <iframe
          src={src}
          frameBorder={0}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
          onLoad={() => setIframeLoaded(true)}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      )}

      {loaded && !iframeLoaded && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          <div style={{ width: '60%', height: '60%', borderRadius: 8, background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.02) 100%)', animation: 'shimmer 1.6s infinite' }} />
          <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>
        </div>
      )}
    </div>
  )
}
