const express = require('express');
const cors = require('cors');
const routes = require('./src/router');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(2105, () => {
  console.log("Servidor rodando na porta 2105");
});