import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Ticket, User } from '@acme/shared-models';

import "./styles/global.scss";

import TicketsPage from './pages/tickets/tickets';

import "./styles/global.scss"
import TicketPage from './pages/ticket/ticket';
const App = () => {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [users, setUsers] = useState([] as User[]);

  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  useEffect(() => {
    async function fetchTickets() {
      const data = await fetch('/api/tickets').then();
      setTickets(await data.json());
    }

    async function fetchUsers() {
      const data = await fetch('/api/users').then();
      setUsers(await data.json());
    }

    fetchTickets();
    fetchUsers();
  }, []);

  return (
    <div className='contentContainer'>
      <h1>Ticketing App</h1>
        <Routes>
          <Route path="/" element={<TicketsPage></TicketsPage>} />
          {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
          <Route path="/:id" element={<TicketPage></TicketPage>} />
        </Routes>
      </div>
  );
};

export default App;
