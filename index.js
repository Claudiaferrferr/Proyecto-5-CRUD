const express = require('express');
const { connect } = require('./utils/db');
const movieRoutes = require('./routes/movies.routes');

connect();

const PORT = 3000;
const server = express();

server.use(express.json());
server.use('/movies', movieRoutes);

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});