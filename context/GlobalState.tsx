import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

const initialState: State = {
  // This minutes field is for the user to set up custom timer
  sessionTime: 25 * 60,
  breakTime: 5 * 60,
  counter: {
    state: false,
    type: 'SESSION',
    value: 3
  }
}

// The global context becomes a single source of truth
// Any child element can grab states from it
export const GlobalContext = createContext<{
  state: State
  dispatch: React.Dispatch<Actions>
}>({
  state: initialState,
  dispatch: () => null,
})

// The global provider gives children elements access to
// the global context
export const GlobalProvider: React.FC = ({ children }) => {
  // A reducer function enables the consumption and modification of states
  const [state, dispatch] = useReducer(AppReducer, initialState)

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}
