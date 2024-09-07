import React, { Component } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
type Props = {
    children: any
}
const TicketItem = ({children}: Props) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <img src='/assets/images/idTicket.svg'></img>
                </Avatar>
            </ListItemAvatar>
            {children}
        </ListItem>
    )
}

export default TicketItem