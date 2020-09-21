import { Box, Heading, Flex, VStack, Text } from '@chakra-ui/core'
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa'
import { GlobalContext } from '../context/GlobalState'
import { useContext } from 'react'

const SelectTime = ({ children, title }: SelectTimeProps) => {
  const { dispatch } = useContext(GlobalContext)

  return (
    <Box userSelect="none">
      <Heading as="h3" size="lg" textAlign="center" mb={2}>
        {title}
      </Heading>
      <Flex h="100px" borderRadius={6} bgColor={title === "Session" ? "red.200" : "green.200"}>
        <VStack justifyContent="center" mx={6}>
          <Heading as="h2" fontSize="3rem">
            {children}
          </Heading>
          <Text fontWeight="bold">Minutes</Text>
        </VStack>
        <VStack mr={3} justifyContent="space-evenly">
          <Box
            onClick={() => {
              dispatch({
                type:
                  title === 'Session' ? 'INC_SESSION' : 'INC_BREAK',
              })
            }}
          >
            <FaArrowAltCircleUp size="2rem" />
          </Box>
          <Box
            onClick={() => {
              dispatch({
                type:
                  title === 'Session' ? 'DEC_SESSION' : 'DEC_BREAK',
              })
            }}
          >
            <FaArrowAltCircleDown size="2rem" />
          </Box>
        </VStack>
      </Flex>
    </Box>
  )
}

export default SelectTime
