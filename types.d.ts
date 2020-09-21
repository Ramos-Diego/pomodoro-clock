type Counter = {
  state: boolean
  type: 'SESSION' | 'BREAK'
  value: number
} 

type State = {
  sessionTime: number
  breakTime: number
  counter: Counter
}

// TODO: Find out how to avoid duplicating these types
type Actions = {
  type:
    | 'INC_SESSION'
    | 'DEC_SESSION'
    | 'INC_BREAK'
    | 'DEC_BREAK'
    | 'START'
    | 'STOP'
    | 'RESET'
    | 'COUNT_DOWN'
}

type KeyProps = {
  children: React.ReactNode
  action:
    | 'INC_SESSION'
    | 'DEC_SESSION'
    | 'INC_BREAK'
    | 'DEC_BREAK'
    | 'START'
    | 'STOP'
    | 'RESET'
    | 'COUNT_DOWN'
}

type SelectTimeProps = {
  children: React.ReactNode
  title: 'Break' | 'Session'
}
