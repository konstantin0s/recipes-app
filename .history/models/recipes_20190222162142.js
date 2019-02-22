let mongoose = require('mongoose');

//Movie schema
let recipesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  catchPhrase: {
    type: String,
    required: true
  }
});

let Recipes = module.exports = mongoose.model('Recipes', recipesSchema);