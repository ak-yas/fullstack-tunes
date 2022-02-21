import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image, Skeleton } from '@chakra-ui/react'
import GradientLayout from '../components/gradientLayout'
import { useMe } from '../lib/hooks'
import prisma from '../lib/prisma'

const Home = ({ artists }) => {
  const { user, isLoading } = useMe()

  return (
    <GradientLayout
      home
      isLoading={isLoading}
      color="gray"
      roundImage
      subtitle="profile"
      title={!isLoading && `${user.firstName} ${user.lastName}`}
      description={!isLoading && `${user?.playlistCount} public playlists`}
      image={!isLoading && user.avatar}
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
          <Text fontSize="md" color="gray">
            Only visible to you
          </Text>
        </Box>
        <Flex wrap="wrap" justify="space-between" justifyContent="start">
          {artists.map((artist) => (
            <Box
              color="white"
              key={artist.name}
              minWidth="180px"
              padding="10px"
            >
              <Skeleton isLoaded={!isLoading}>
                <Box
                  padding="10px"
                  bg="rgba(255,255,255,0.04)"
                  width="100%"
                  borderRadius="5px"
                  sx={{
                    ':hover': {
                      cursor: 'pointer',
                      bg: 'rgba(255,255,255,0.1)',
                      transition: 'all 0.25s ease-in-out',
                    },
                  }}
                >
                  <Image
                    src={artist.avatar}
                    borderRadius="50%"
                    objectFit="cover"
                    boxSize="120px"
                  />

                  <Box marginTop="20px" marginBottom="20px">
                    <Text fontSize="16px" fontWeight="medium">
                      {artist.name}
                    </Text>
                    <Text fontSize="small" color="gray" marginTop="2px">
                      Artist
                    </Text>
                  </Box>
                </Box>
              </Skeleton>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})
  console.log(artists)
  return {
    props: { artists },
  }
}

export default Home
