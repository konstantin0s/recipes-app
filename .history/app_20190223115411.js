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

  app.locals.title = 'Recipes';
  let Recipes = require('./models/recipes');

  const index = require('./routes/index');
  app.use('/', index);
  const recipes = require('./routes/recipes');
  app.use('/', recipes);
  const recipe = require('./routes/recipe');
  app.use('/', recipe);
  const edit = require('./routes/edit');
  app.use('/', edit);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  
  module.exports = app;