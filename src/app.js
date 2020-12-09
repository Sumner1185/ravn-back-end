const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./api/queries');

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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

module.exports = app;
