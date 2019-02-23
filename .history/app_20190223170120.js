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
  const addRecipe = require('./routes/addRecipe');
  app.use('/', addRecipe);
  const edit = require('./routes/edit');
  app.use('/', edit);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


 //load edit form
 router.get('/recipe/edit/:id', function(req, res) {
  Recipes.findOne({_id: req.params.id}, function(err, recip) {
    if (err) {
      console.log(err);
    } else {
      res.render('edit_recipe',
      {recip: recip});
    }
  });
});

//update submit
router.get('/recipes/add', function(req, res) {
  res.render('add_recipes');
  });

   //add submit POST route
   router.post('/recipes/edit/:id', function(req, res) {

    let recips = {};
    recips.title = req.body.title;
    recips.level = req.body.level;
    recips.ingredients = req.body.ingredients;
    recips.cuisine = req.body.cuisine;
    recips.dishType = req.body.dishType;
    recips.image = req.body.image;
    recips.duration = req.body.duration;
    recips.creator = req.body.creator;
    recips.date = req.body.date;

    let query = {_id: req.params.id}
 
    Recipes.update(query, recips, function(err) {
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