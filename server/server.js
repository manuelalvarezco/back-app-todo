require('./config/config');

const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors())

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Config routes
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos online');
})

app.listen(process.env.PORT, () => {
    console.log('Corriendo en el puerto ', process.env.PORT);
})