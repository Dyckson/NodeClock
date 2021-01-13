const express = require('express');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/index-routes'));

app.listen(8080);
console.log('Server on port', 8080);