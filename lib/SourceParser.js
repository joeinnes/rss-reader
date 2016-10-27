var request = require('request');
var FeedParser = require('feedparser');
var db = require('./DB');
var ArticleSchema = require('../models/Article');
var Article = db.model('Article', ArticleSchema);
var logItem = true;

var parseSource = function (url, articles) {
  var parser = new FeedParser()
  var req = request(url) 
  req.on('error', function (error) {
    console.log(error);
  });
  req.on('response', function (res) {
    var stream = this;
    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
      stream.pipe(parser);
  });
  
  // Tell the feedparser what to do
  parser.on('error', function(error) {
    console.log(error);
  });
  parser.on('readable', function() {
    var stream = this;
    var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance 
    var item;

 
    while (item = stream.read()) {
      var thisItem = item;
      Article.count({guid: item.guid}, function (err, count){ 
        if (err) console.log(err);
        if (count === 0) {
          var article = new Article();
          article.title = thisItem.title || 'Unknown';
          article.guid = thisItem.guid;
          article.source = thisItem.meta && thisItem.meta.title ? thisItem.meta.title : 'Unknown';
          article.body = thisItem.description || '';
          article.date = thisItem.date || new Date();
          article.save(function (err) {
            if (err) console.log(err);
          });
        }
      }); 
    }
  });
}

module.exports = parseSource;