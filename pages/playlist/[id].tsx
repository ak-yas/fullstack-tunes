import { Box } from '@chakra-ui/layout'
import GradientLayout from '../../components/gradientLayout'
import SongsPanel from '../../components/SongsPanel'
import { validateToken } from '../../lib/auth'
import prisma from '../../lib/prisma'

const getBGColor = (id) => {
  const colors = [
    'red',
    'blue',
    'orange',
    'purple',
    'yellow',
    'teal',
    'red',
    'pink',
    'green',
  ]
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const Playlist = ({ playlist }) => {
  const color = getBGColor(playlist.id)

  return (
    <GradientLayout
      home={false}
      roundImage={false}
      isLoading={!playlist}
      color={color}
      subtitle="playlist"
      title={playlist.name}
      description={`${playlist.songs.length} songs`}
      image="https://socioblend.com/blog/wp-content/uploads/2020/12/spotify-909238494-1024x536.jpg"
    >
      <Box paddingX="10px">
        <SongsPanel songs={playlist.songs} />
      </Box>
    </GradientLayout>
  )
}
export const getServerSideProps = async ({ query, req }) => {
  let user

  try {
    user = validateToken(req.cookies.TUNES_ACCESS_TOKEN)
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    }
  }
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
              avatar: true,
            },
          },
        },
      },
    },
  })
  return {
    props: { playlist },
  }
}

export default Playlist
