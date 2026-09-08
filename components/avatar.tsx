import Image from 'next/image'

const AVATAR_SIZE = 48

export default function Avatar({ author }) {
  const isAuthorHaveFullName = author?.node?.firstName && author?.node?.lastName
  const name = isAuthorHaveFullName
    ? `${author.node.firstName} ${author.node.lastName}`
    : author.node.name || null

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          position: 'relative',
          flexShrink: 0,
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          marginRight: '1rem',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <Image
          src={author.node.avatar.url}
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{name}</div>
    </div>
  )
}