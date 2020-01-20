const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

const hostname = 'localhost';
const port = process.env.PORT || 3000;

require('./charts/routes')(app);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, () => console.log(`App listening on port http://${hostname}:${port}/`));