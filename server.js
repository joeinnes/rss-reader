var db = require('./lib/DB');
var server = require('./server/server');

var SourceParser = require('./lib/SourceParser');
var Articles = db.model('Article');
var articleList = Articles.find({});
var sources = require('./data/temp.js')

sources.forEach(function (source) {
  SourceParser(source.url);
});

/*
app.get("/articles", function (request, response) {
  response.json(articleList);
});

app.get("/sources", function (request, response) {
  response.json(sources);
}); */