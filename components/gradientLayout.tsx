import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'

const GradientLayout = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}) => {
  return (
    <Box
      color="white"
      height="100%"
      overflow="auto"
      bgGradient={`linear(${color}.500 0%, rgba(0,0,0,0.92) 15%)`}
    >
      <Flex bg={`${color}.900`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            src={image}
            objectFit="cover"
            boxSize="180px"
            boxShadow="2xl"
            borderRadius={roundImage ? '100%' : '3px'}
          />
        </Box>
        <Box padding="20px" lineHeight="40px">
          <Text
            fontSize="11px"
            fontWeight="medium"
            casing="uppercase"
            marginBottom="10px"
          >
            {subtitle}
          </Text>
          <Text fontSize="7xl" fontWeight="bold" marginBottom="20px">
            {title}
          </Text>
          <Text fontSize="smaller" color="gray">
            {description}
          </Text>
        </Box>
      </Flex>
      <Box padding="20px">{children}</Box>
    </Box>
  )
}

export default GradientLayout
