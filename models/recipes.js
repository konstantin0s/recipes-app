let mongoose = require('mongoose');

//Movie schema
let recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    required: true
  },
  directions: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

let Recipes = module.exports = mongoose.model('Recipes', recipeSchema);
