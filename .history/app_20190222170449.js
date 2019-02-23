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

  const index = require('./routes/index');
  app.use('/', index);
  const recipes = require('./routes/recipes');
  app.use('/', recipes);
  let Recipes = require('./models/recipes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/recipes', (req, res) => {
  Recipes.find({}, (err, foodie) => {
    if (err) {
      console.log(err);
    } else {
      res.render('recipes',
      {foodie: foodie});
    }
    
  });
});


  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  
  module.exports = app;