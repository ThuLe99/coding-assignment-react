import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";

import { Ticket } from "@acme/shared-models";
import * as ticketAPI from './../../../api/ticketAPI'

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = (props: Props) => {
  const [ticket, setTicket] = useState<Ticket>({
    id: 0,
    description: '',
    assigneeId: 0,
    completed: false,
  })

  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'tickets/create_request' })

    try {
      const data = await ticketAPI.createTicket({ ...ticket, assigneeId: Number(ticket.assigneeId) })
      dispatch({ type: 'tickets/create_success', payload: data })

    } catch (error) {
      dispatch({ type: 'tickets/create_error', payload: error })
    }

  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new ticket</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "completed")
            .map((column) => (
              <div className="item" key={column.headerName}>
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field}
                  onChange={(e: { target: { value: any; }; }) => setTicket({ ...ticket, [column.field]: e.target.value })} />
              </div>
            ))}

          <label>Status<input type="checkbox" className="ckbBtn" onChange={e => setTicket({ ...ticket, completed: e.target.checked })}></input></label>
          <button className="userUpdateButton">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
