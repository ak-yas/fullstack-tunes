import { Box, Text } from '@chakra-ui/layout'
import GradientLayout from '../../components/gradientLayout'
import { validateToken } from '../../lib/auth'
import { usePlaylist } from '../../lib/hooks'
import prisma from '../../lib/prisma'

const Playlist = () => {
  const { playlists, isLoading } = usePlaylist()

  return (
    <GradientLayout
      isLoading={isLoading}
      color="red"
      subtitle="playlist"
      title={!isLoading && `Playlist`}
      image="https://socioblend.com/blog/wp-content/uploads/2020/12/spotify-909238494-1024x536.jpg"
    >
      <Box paddingX="40px">
        <Box marginBottom="40px">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            marginTop="10px"
            minWidth="250px"
          >
            Top artist this month
          </Text>
          <Text fontSize="md" color="gray" minWidth="250px">
            Only visible to you
          </Text>
        </Box>
      </Box>
    </GradientLayout>
  )
}
export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies.TUNES_ACCESS_TOKEN)
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
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
