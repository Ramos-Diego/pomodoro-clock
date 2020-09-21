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
        session: state.session < 59 * 60 ? state.session + 60 : state.session,
      }
    case 'DEC_SESSION':
      return {
        ...state,
        // Minimun 1 minute allowed
        session: state.session > 1 * 60 ? state.session - 60 : state.session,
      }
    case 'INC_BREAK':
      return {
        ...state,
        break: state.break < 59 * 60 ? state.break + 60 : state.break,
      }
    case 'DEC_BREAK':
      return {
        ...state,
        break: state.break > 1 * 60 ? state.break - 60 : state.break,
      }
    case 'COUNT_DOWN':
      return {
        ...state,
        counter: state.counter - 1,
        counting: state.counter > 1
      }
    case 'START':
      return {
        ...state,
        counting: true,
      }
    case 'STOP':
      return {
        ...state,
        counting: false,
      }
    case 'RESET':
      return {
        ...state,
        counter: state.session,
        counting: false,
      }
    default:
      return state
  }
}

export default AppReducer
