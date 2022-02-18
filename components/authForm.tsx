import { Box, Flex, Button, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NextImage from 'next/image'
import { FC, useState } from 'react'
import { useSWRConfig } from 'swr'
import { auth } from '../lib/mutations'

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const user = await auth(mode, {
      email,
      password,
      name: mode === 'signup' && name,
    })
    setIsLoading(false)
    router.push('/')
  }
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
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <Input
                marginBottom="10px"
                placeholder="name"
                type="name"
                onChange={(e) => setName(e.target.value)}
                sx={{
                  '&:focus': {
                    borderColor: 'green.500',
                  },
                }}
              />
            )}
            <Input
              marginBottom="10px"
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '&:focus': {
                  borderColor: 'green.500',
                },
              }}
            />
            <Input
              marginBottom="18px"
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '&:focus': {
                  borderColor: 'green.500',
                },
              }}
            />
            <Button
              fontSize="17px"
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                '&:hover': {
                  bg: 'green.300',
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
