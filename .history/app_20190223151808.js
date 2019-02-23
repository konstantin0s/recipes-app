const express      = require('express');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const path         = require('path');
const bodyParser   = require('body-parser');
const cors = require('cors');

const app = express();

mongoose
  .connect('mongodb://localhost/recipes', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


  //enables cors
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



  app.locals.title = 'Recipes';
  let Recipes = require('./models/recipes');

  const index = require('./routes/index');
  app.use('/', index);
  const recipes = require('./routes/recipes');
  app.use('/', recipes);
  const recipe = require('./routes/recipe');
  app.use('/', recipe);
  // const addRecipe = require('./routes/addRecipe');
  // app.use('/', addRecipe);
  // const edit = require('./routes/edit');
  // app.use('/', edit);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/recipes/add', function(req, res) {
  res.render('add_recipes');
  });

   //add submit POST route
   app.post('/recipes/add', function(req, res) {

    let newRecipe = new Recipes();
    newRecipe.title = req.body.title;
    newRecipe.level = req.body.level;
    newRecipe.ingredients = req.body.ingredients;
    newRecipe.cuisine = req.body.cuisine;
    newRecipe.dishType = req.body.dishType;
    newRecipe.image = req.body.image;
    newRecipe.duration = req.body.duration;
    newRecipe.creator = req.body.creator;
    newRecipe.date = req.body.date;
 
    newRecipe.save(function(err) {
         if (err) {
           console.log(err);
           return;
         } else {
           res.redirect('/recipes');
         }
    });
   });



  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  
  module.exports = app;