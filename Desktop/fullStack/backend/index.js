//IMPORTAR LIBRERIAS
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
//METODOS DE LAS LIBRERIAS
const app = express();
require('dotenv').config();

// Middlewares: funciones qe se ejecuta antes de llegar a las rutas
app.use(morgan('dev'));
app.use(bodyParser.json()); // IDEM app.use(exprres.json())
app.use(cors());
app.use(express.json()); // Sirve para poder entender los datos que se envian

// Database setup
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => { console.log("Base de datos conectada")});

// Routes Setup
app.use('/api/category', require('./routes/category'));
app.use('/api/videogame', require('./routes/videogame'));
app.use('/api/usuario', require('./routes/usuario'));
app.use('/api/auth', require('./routes/auth'));

// Listen to Port
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor the videojuegos MERN esta ejecutando en el puerto ${port}`);
})