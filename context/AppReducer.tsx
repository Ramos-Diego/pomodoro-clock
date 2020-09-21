import { Howl } from 'howler'

// Alert user about session and break
function sessionEnded(breakTime: number) {
  const notification = new Notification('Your session has ended.', {
    body: `Take a ${Math.floor((breakTime / 60) % 60)} min. break now!`,
    icon: '/timer.png',
  })
  return notification
}

function sessionStarted() {
  const notification = new Notification('Your break is over.', {
    body: 'Get to work!',
    icon: '/timer.png',
  })
  return notification
}

const yamete = new Howl({
  src: ['/ding.mp3'],
})

function countLogic({ counter, breakTime, sessionTime }: State) {
  // If counter is running and counter has not finished
  if (counter.state && counter.value > 1) {
    counter.value = counter.value - 1
    return counter
    // If counter is running and counter finished
  } else if (counter.state && counter.value > 0) {
    if (counter.type === 'SESSION') {
      counter.value = breakTime
      counter.type = 'BREAK'
      sessionEnded(breakTime)
      yamete.play()
    } else {
      counter.value = sessionTime
      counter.type = 'SESSION'
      sessionStarted()
      yamete.play()
    }
    return counter
  } else {
    return counter
  }
}

// The 'state' parameter for the useReducer function
// is the current state. The action is a function that gets
// called to update the state.
const AppReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'INC_SESSION':
      return {
        ...state,
        // This simplified logic only changes timer by 60 seconds
        // Maximun 59 minutes allowed
        sessionTime:
          state.sessionTime < 59 * 60
            ? state.sessionTime + 60
            : state.sessionTime,
      }
    case 'DEC_SESSION':
      return {
        ...state,
        // Minimun 1 minute allowed
        sessionTime:
          state.sessionTime > 1 * 60
            ? state.sessionTime - 60
            : state.sessionTime,
      }
    case 'INC_BREAK':
      return {
        ...state,
        breakTime:
          state.breakTime < 59 * 60 ? state.breakTime + 60 : state.breakTime,
      }
    case 'DEC_BREAK':
      return {
        ...state,
        breakTime:
          state.breakTime > 1 * 60 ? state.breakTime - 60 : state.breakTime,
      }
    case 'COUNT_DOWN':
      return {
        ...state,
        counter: countLogic(state),
      }
    case 'START':
      return {
        ...state,
        counter: {
          ...state.counter,
          state: true,
        },
      }
    case 'STOP':
      return {
        ...state,
        counter: {
          ...state.counter,
          state: false,
        },
      }
    case 'RESET':
      return {
        ...state,
        counter: {
          value: state.sessionTime,
          type: 'SESSION',
          state: false,
        },
      }
    default:
      return state
  }
}

export default AppReducer
