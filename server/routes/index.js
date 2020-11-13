const express = require('express')
const app = express();

app.use(require('./tasks'));
app.use(require('./users'));
app.use(require('./login'));
app.use(require('./register'));

module.exports = app;