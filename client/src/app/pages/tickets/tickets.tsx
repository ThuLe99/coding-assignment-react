import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./tickets.scss";
import { useContext, useEffect, useState } from "react";
import Add from "../../components/add/Add"
import TicketsContext from "../../context";
import { Ticket } from "@acme/shared-models";
// import { useQuery } from "@tanstack/react-query";


const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 190 },
  {
    field: "description",
    type: "string",
    headerName: "Description",
    width: 400,
  },
  {
    field: "assigneeId",
    type: "string",
    headerName: "Assignee",
    width: 200,
  },
  {
    field: "completed",
    type: "string",
    headerName: "Status",
    width: 200,
  },

];


const TicketsPage = () => {
  const [open, setOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([])
  console.log("🚀 ~ TicketsPage ~ tickets:", tickets)

  useEffect(() => {
    async function fetchTickets() {
      const data = await fetch('/api/tickets').then();
      setTickets(await data.json());
    }
    fetchTickets()
  }, [])


  return (
    <div className="users">
      <div className="info">
        <h1>Tickets</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      <DataTable slug="tickets" columns={columns} rows={tickets} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default TicketsPage;
