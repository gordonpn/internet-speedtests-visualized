const express = require('express');
const app = express();
require('dotenv').config();

const hostname = 'localhost';
const port = process.env.PORT || 3000;

require('./charts/routes')(app);

app.listen(port, () => console.log(`App listening on port http://${hostname}:${port}/`));