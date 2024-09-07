import { useParams} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";


import TicketDetail from "../../components/ticket/TicketDetail"
import Spinner from "../../components/common/Spinner";

import "./ticket.scss"
import { User } from "@acme/shared-models";
import * as ticketAPI from './../../../api/ticketAPI'
import * as userApi from './../../../api/userApi'

const TicketPage = () => {
  const [users, setUsers] = useState<User[]>([])

  const params = useParams();
  const dispatch = useDispatch()

  const {
    data: ticket, loading, error
  } = useSelector((state: any) => state.ticketState)

  useEffect(() => {
    async function fetchUsers() {
      userApi.getUsers()
        .then((data: User[]) => {
          setUsers(data);
        })
        .catch(err => {
          throw err
        })
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    dispatch({ type: `tickets/fetch_request` })
    ticketAPI.getTicketDetail(String(params['id']))
      .then(data => {
        dispatch({ type: 'ticket/fetch_success', payload: data })
      })
      .catch(err => {
        dispatch({ type: 'ticket/fetch_error', payload: err })
      })
  }, [dispatch])

  return (
    <>
      <TicketDetail ticket={ticket} users={users} />
      {loading && <Spinner />}

    </>

  )
}

export default TicketPage