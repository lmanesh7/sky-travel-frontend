import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";
import { BACKEND_BASE_URL } from "../../../../helpers/variables";

const AdminSupportTicketsPage = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch the list of support tickets from the backend
    const fetchSupportTickets = async () => {
      try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/support-tickets`);
        const data = await response.json();
        console.log(data)
        setTickets(data.tickets);
      } catch (error) {
        console.error("Error fetching support tickets:", error);
      }
    };

    fetchSupportTickets();
  }, []);

  return (
    <div>
      <h1>Support Tickets</h1>
      <List>
        {tickets.map((ticket) => (
          <ListItem key={ticket._id}>
            <Card>
              <Link to={`/airline/support-tickets-reply/${ticket._id}`}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Ticket ID: {ticket.ticket_ref}
                  </Typography>
                  <Typography color="text.secondary">Subject: {ticket.message}</Typography>
                  <Typography color="text.secondary">Status: {ticket.status}</Typography>
                </CardContent>
              </Link>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AdminSupportTicketsPage;
