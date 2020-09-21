import Head from 'next/head'
import { Container, Heading, Center, Button, HStack, VStack } from '@chakra-ui/core'
import { useEffect, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import SelectTime from '../components/SelectTime'

// Concatenate a zero to the left of every single digit time frame
const concatZero = (timeFrame: number): string => {
  return timeFrame < 10 ? `0${timeFrame}` : `${timeFrame}`
}

const format = (time: number): string => {
  const min = Math.floor((time / 60) % 60)
  const sec = Math.floor(time % 60)
  return `${concatZero(min)} : ${concatZero(sec)}`
}

const formatSession = (time: number): string => {
  const min = Math.floor((time / 60) % 60)
  return `${concatZero(min)}`
}

const Home = () => {
  const { state, dispatch } = useContext(GlobalContext)
  // Counter is the amount of seconds left

  useEffect(() => {
    if (state.counter.state) {
      const timeoutId = setInterval(
        () => dispatch({ type: 'COUNT_DOWN' }),
        1000
      )

      return () => clearInterval(timeoutId)
    }
  }, [state.counter.state])

  return (
    <>
      <Head>
        <title>Pomodoro Clock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container display="grid" maxW="sm" h="100vh" alignContent="center">
        <Center
          h="200px"
          borderRadius={6}
          bgColor={state.counter.type === "SESSION" ? 'red.200' : 'green.200'}
        >
          <VStack>
          <Heading as="h1" fontSize="2rem">
            {state.counter.type}
          </Heading>
          <Heading as="h1" fontSize="5.5rem">
            {format(state.counter.value)}
          </Heading>
          </VStack>
        </Center>
        <HStack mt={4} gridColumnGap={4}>
          <Button
            isDisabled={state.counter.state}
            isFullWidth
            onClick={() => {
              dispatch({ type: 'START' })
            }}
          >
            Start
          </Button>
          <Button
            isFullWidth
            onClick={() => {
              dispatch({ type: 'RESET' })
            }}
          >
            {state.counter.state ? "Reset" : "Set"}
          </Button>
          <Button
            isDisabled={!state.counter.state}
            isFullWidth
            onClick={() => {
              dispatch({ type: 'STOP' })
            }}
          >
            Stop
          </Button>
        </HStack>
        <Center mt={5} gridColumnGap={5}>
          <SelectTime title="Session">
            {formatSession(state.sessionTime)}
          </SelectTime>
          <SelectTime title="Break">{formatSession(state.breakTime)}</SelectTime>
        </Center>
      </Container>
    </>
  )
}

export default Home
