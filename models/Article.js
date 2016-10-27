var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
 
var ArticleSchema = new Schema({
  source: String,
  title: String,
  body: String,
  date: Date,
  guid: String,
  link: String
});

module.exports = ArticleSchema;