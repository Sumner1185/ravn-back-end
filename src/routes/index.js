const express = require('express');
const db = require('../api/queries');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
  response.json({
    info: 'Node.js, Express, and Postgres API',
    message: 'Welcome! Successful connection',
  });
});

app.get('/tickets', db.getTickets);
app.get('/tickets/:id', db.getTicketsById);
app.post('/tickets', db.createTicket);
app.put('/tickets/:id', db.updateTicket);
app.delete('/tickets/:id', db.deleteTicket);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

module.exports = app
