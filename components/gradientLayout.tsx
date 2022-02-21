import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image, Skeleton } from '@chakra-ui/react'

const GradientLayout = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
  isLoading,
  home,
}) => {
  return (
    <Box
      color="white"
      height="100%"
      overflow="auto"
      bgGradient={
        home
          ? `linear(${color}.500 0%, rgba(0,0,0,0.92) 0%)`
          : `linear(${color}.500 0%, ${color}.600 10%, ${color}.700 30%, rgba(0,0,0,0.93) 65%)`
      }
    >
      <Skeleton isLoaded={!isLoading}>
        <Flex
          bg={home ? `${color}.900` : `${color}.500`}
          padding="25px"
          align="end"
        >
          <Box padding="20px">
            <Image
              src={image}
              objectFit="cover"
              boxSize="200px"
              boxShadow="2xl"
              borderRadius={roundImage ? '100%' : '3px'}
              minWidth="160px"
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
            <Text
              fontSize="7xl"
              fontWeight="bold"
              marginBottom="20px"
              minWidth="600px"
            >
              {title}
            </Text>
            <Text fontSize="smaller" color="gray">
              {description}
            </Text>
          </Box>
        </Flex>
      </Skeleton>
      <Box padding="20px">{children}</Box>
    </Box>
  )
}

export default GradientLayout
