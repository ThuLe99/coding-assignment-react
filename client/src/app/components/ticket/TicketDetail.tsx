import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Swal from 'sweetalert2'

import "./ticketDetail.scss";
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import BeachAccessIcon from '@mui/icons-material/Description';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Tune from '@mui/icons-material/Tune';

import { Ticket, User } from "@acme/shared-models";

import * as ticketAPI from '../../../api/ticketAPI'
import TicketItem from "./TicketItem";

type Props = {
  ticket: Ticket,
  users: User[]
}

export default function TicketDetail({ ticket, users }: Props) {
  const params = useParams();
  const [ticketDetail, setTicket] = useState<Ticket>({
    id: 0,
    description: '',
    assigneeId: 1,
    completed: false,
  })
  const dispatch = useDispatch()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'tickets/update_request' })
    try {
      let data = {}
      if (ticketDetail.completed !== ticket.completed) {
        if (ticketDetail.completed === true) {
          data = await ticketAPI.completeTicket(Number(params['id']))
        }
        else {
          data = await ticketAPI.inCompleteTicket(Number(params['id']))
        }
      }
      dispatch({ type: 'tickets/update_success', payload: data })
    } catch (error) {
      dispatch({ type: 'tickets/update_error', payload: error })
    }


    dispatch({ type: 'tickets/update_request' })
    try {
      const data = await ticketAPI.assignTicket(Number(params['id']), Number(ticketDetail?.assigneeId))
        .then(res => {
          Swal.fire({
            icon: 'success',
            title: 'Ticket has been changed!',
            showConfirmButton: false,
            timer: 1500,
          })
          return res
        })
        .catch(message => {
          Swal.fire({
            icon: 'error',
            text: message,
          })
        })
      dispatch({ type: 'tickets/update_success', payload: data })
    } catch (error) {
      dispatch({ type: 'tickets/update_error', payload: error })
    }
  };

  return (

    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Detail Ticket</h1>
      </div>
      <div className="userContainer">

        <div className="userUpdate">
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <TicketItem> <ListItemText primary='ID' secondary={ticket.id} /></TicketItem>
                <TicketItem> <ListItemText primary="Description" secondary={ticket.description} /></TicketItem>
                <TicketItem>
                  <label htmlFor="assigneeId">Assign:</label>
                  <select className="ml-10" name="assigneeId" id="assigneeId" onChange={e => setTicket({ ...ticketDetail, assigneeId: parseInt(e.target.value, 10) })}>
                    {
                      users.map((item: User) => (
                        <option value={item?.id}>{item?.name}</option>
                      ))
                    }
                  </select>
                </TicketItem>
                <TicketItem>
                  <div className="checkboxes">
                    <label><span>Status</span><input type="checkbox" onChange={e => setTicket({ ...ticketDetail, completed: e.target.checked })}></input> </label>
                  </div>
                </TicketItem>
              </List>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="/assets/images/logo.png"
                  alt=""
                />
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}