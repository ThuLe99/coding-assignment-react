import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";

import "./tickets.scss";

import { GridColDef } from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add"
import Spinner from "../../components/common/Spinner";


import { User } from "@acme/shared-models";
import * as ticketAPI from './../../../api/ticketAPI'


const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "description",
    type: "string",
    headerName: "Description",
    flex: 2
  },
  {
    field: "assigneeId",
    type: 'number',
    headerName: "Assignee",
    flex: 0.5

  },
  {
    field: "completed",
    type: "string",
    headerName: "Status",
    flex: 0.5
  },

];


const TicketsPage = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([])

  const {
    data: tickets, loading, error
  } = useSelector((state: any) => state.ticketState)


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: `tickets/fetch_request` })

    ticketAPI.getTickets()
      .then(data => {
        dispatch({ type: 'tickets/fetch_success', payload: data })
      })
      .catch(err => {
        dispatch({ type: 'tickets/fetch_error', payload: err })
      })
  }, [dispatch])

  return (
    <div className="users">
      <div className="info">
        <h1>Tickets</h1>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          Add New Ticket
        </Button>
      </div>
      <DataTable slug="tickets" columns={columns} rows={tickets} />
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
      {loading && <Spinner />}
    </div>
  );
};

export default TicketsPage;
