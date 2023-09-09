const mongoose = require('mongoose')

const Url = new mongoose.Schema({
   url : String,
   shortened : String
  })
  
  module.exports = Url