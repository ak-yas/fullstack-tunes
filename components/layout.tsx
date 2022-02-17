import { Box } from '@chakra-ui/layout'

const Layout = ({ children }) => {
  return (
    <>
      <Box width="100vw" height="100vh">
        <Box position="absolute" top="0" left="0" width="250px">
          navigation bar
        </Box>
        <Box marginLeft="250px">{children}</Box>
        <Box position="absolute" bottom="0" left="0">
          Music platey
        </Box>
      </Box>
    </>
  )
}

export default Layout
