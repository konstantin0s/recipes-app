let Recipes = require('./models/recipes');

Recipes.find({}).removeAsync()