const Recipes = require('./models/recipes');

Recipes.find({}).removeAsync()