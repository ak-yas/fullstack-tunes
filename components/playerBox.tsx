import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import { useStoreState } from 'easy-peasy'
import Player from './player'

const PlayerBox = () => {
  const songs = useStoreState((store: any) => store.activeSongs)
  const activeSong = useStoreState((store: any) => store.activeSong)
  console.log(songs)
  return (
    <Box height="100px" bg="gray.900" width="100vw" padding="10px">
      <Flex align="center">
        {activeSong && (
          <Box padding="20px" color="white" width="30%">
            <Flex>
              <Box>
                <Image
                  src={activeSong.artist.avatar}
                  objectFit="cover"
                  boxSize="50px"
                />
              </Box>
              <Box marginLeft="15px">
                <Text fontSize="large">{activeSong.name}</Text>
                <Text fontSize="sm">{activeSong.artist.name}</Text>
              </Box>
            </Flex>
          </Box>
        )}
        {activeSong && (
          <Box width="40%">
            {activeSong && <Player activeSong={activeSong} songs={songs} />}
          </Box>
        )}
      </Flex>
    </Box>
  )
}

export default PlayerBox
