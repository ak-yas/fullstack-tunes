import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import GradientLayout from '../components/gradientLayout'
import prisma from '../lib/prisma'

const Home = ({ artists }) => {
  return (
    <GradientLayout
      color="gray"
      roundImage
      subtitle="profile"
      title="Leslie Thurlow"
      description="12 public playlists"
      image="./avatar.jpg"
    >
      <Box paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold" marginTop="10px">
            Top artist this month
          </Text>
          <Text fontSize="md" color="gray">
            Only visible to you
          </Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box color="white" paddingX="10px" width="12%">
              <Box
                padding="20px"
                bg="rgba(255,255,255,0.04)"
                width="100%"
                borderRadius="5px"
                sx={{
                  ':hover': {
                    bg: 'rgba(255,255,255,0.1)',
                    transition: 'all 0.25s ease-in-out',
                  },
                }}
              >
                <Image
                  src="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"
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
