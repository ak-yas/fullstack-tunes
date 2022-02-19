import { Box, Flex } from '@chakra-ui/layout'
import NextImage from 'next/image'

// pages/404.js
const Custom404 = () => {
  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="1px solid white"
      >
        <NextImage src="/logo.svg" height={60} width={150} />
      </Flex>
      <Flex
        justify="center"
        align="center"
        height="calc(100vh - 100px)"
        fontSize="22px"
      >
        <Box>404 - Page Not Found</Box>
      </Flex>
    </Box>
  )
}

Custom404.authPage = true

export default Custom404
