// imports

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.port || 3000;
var mysql2 = require('mysql2');

// create server
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const controller = require('./controller/controller');
app.use(controller);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

