const express      = require('express');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const path         = require('path');
const bodyParser   = require('body-parser');

const app = express();

mongoose
  .connect('mongodb://localhost/recipes', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


  const index = require('./routes/index');
  app.use('/', index);

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  
  module.exports = app;