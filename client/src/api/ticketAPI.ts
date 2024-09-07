import { Ticket } from "@acme/shared-models";
import axios from "axios";


export const getTickets = async () => {
  const res = await axios.get(`/api/tickets`);
  return res.data;
}

export const getTicketDetail = async (data: string) => {
  const res = await axios.get(`/api/tickets/${data}`);
  return res.data;
}

export const createTicket = async (data: Ticket) => {
  const res = await axios.post(`/api/tickets`, data);
  return res.data;
}

export const assignTicket = async (dataId: number, userId: number) => {
  const res = await axios.put(`/api/tickets/${dataId}/assign/${userId}`);
  return res.data;
}

export const unAssignTicket = async (data: Ticket) => {
  const res = await axios.put(`/api/tickets/${data.id}/unassign`, data);
  return res.data;
}


export const completeTicket = async (dataId: number) => {
  const res = await axios.put(`/api/tickets/${dataId}/complete`);
  return res.data;
}

export const inCompleteTicket = async (dataId: number) => {
  const res = await axios.delete(`/api/tickets/${dataId}/complete`);
  return res.data;
}

