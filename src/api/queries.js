const Pool = require('pg').Pool;
let pool;

if (process.env.NODE_ENV === 'development') {
  pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
  });
} else {
  pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'test_api',
    password: 'password',
    port: 5432,
  });
}

const createCategories = (tickets) => {
  let categorisedData = {
    drop: [],
    add: [],
    keep: [],
    improve: [],
  };

  tickets.forEach((ticket) => {
    categorisedData[ticket.category].push(ticket);
  });

  return categorisedData;
};

const getTickets = (request, response) => {
  pool.query('SELECT * FROM tickets ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }

    const formatedResults = createCategories(results.rows);
    response.status(200).json(formatedResults);
  });
};

const getTicketsById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM tickets WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }

    console.log(results.rows);
    response.status(200).json(results.rows);
  });
};

const createTicket = (request, response) => {
  console.log(request.body)
  const { name, description, category } = request.body;

  pool.query(
    'INSERT INTO tickets (name, description, category) VALUES ($1, $2, $3) RETURNING id;',
    [name, description, category],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results)
      response.status(201).send(`Ticket added with ID: ${results.rows[0].id}`);
    }
  );
};

const updateTicket = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, description, category } = request.body;

  pool.query(
    'UPDATE tickets SET name = $1, description = $2, category = $3 WHERE id = $4',
    [name, description, category, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Ticket modified with ID: ${id}`);
    }
  );
};

const deleteTicket = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM tickets WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Ticket deleted with ID: ${id}`);
  });
};

module.exports = {
  getTickets,
  getTicketsById,
  createTicket,
  updateTicket,
  deleteTicket,
};
