import { Box, Flex, Text } from '@chakra-ui/layout'

const PlayerBox = () => {
  return (
    <Box height="100px" bg="gray.900" width="100vw" padding="10px">
      <Flex align="center">
        <Box padding="20px" color="white" width="30%">
          <Text fontSize="large">Song name</Text>
          <Text fontSize="sm">Artist name</Text>
        </Box>
        <Box width="40%">Controls</Box>
      </Flex>
    </Box>
  )
}

export default PlayerBox
