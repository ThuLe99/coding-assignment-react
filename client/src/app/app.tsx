import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
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

  return (
    <div className='contentContainer'>
      <div className='header'>
        <Link to={'/'}>
          <img className="logo" src="/assets/images/logo.png" alt="logo"></img>

        </Link>
      </div>
      <Routes>
        <Route path="/" element={<TicketsPage></TicketsPage>} />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/:id" element={<TicketPage></TicketPage>} />
      </Routes>
    </div>
  );
};

export default App;
