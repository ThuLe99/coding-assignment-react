import { createContext } from 'react'

const TicketsContext = createContext({
  tickets: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTickets: () => {}
});

export default TicketsContext