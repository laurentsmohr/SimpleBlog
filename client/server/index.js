const app = require('express')();
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const db = require('./db/index');

app.use(history());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;

// GETTING ALL ARTICLES
app.get('/articles', function (req, res){
  let queryStr = `SELECT title, description FROM articles`;
  db.query(queryStr, function(err, result) {
    if(err) res.status(500).send(err);
    else res.status(200).send(result);
  });
});

// GETTING A SPECIFIC ARTICLE
app.get('/articles/:id', function (req, res){
  let queryStr = `SELECT * FROM articles WHERE id=(?)`;
  let article, comments;
  db.query(queryStr, [req.params.id], function(err, result) {
    if(err) res.status(500).send(err);
    else article = result;
    let queryStr = `SELECT id, author, comment FROM comments WHERE article_id = (?)`;
    db.query(queryStr, [req.params.id], function(err, result) {
      if(err) {
        res.status(500).send(err)
      } else {
        comments = result;
        res.status(200).send({article, comments});
      }
    });
  });
});

// CREATING AN ARTICLE
app.post('/articles', function (req, res){
  let article = req.body;
  let queryStr = `INSERT INTO articles (author, date, title, description, text) VALUES (?, ?, ?, ?, ?)`
  db.query(queryStr, [article.author, article.date, article.title, article.description, article.text], function(err, result) {
    if(err) res.status(500).send(err);
    else res.status(200).send(result);
  });
});

// EDITING AN ARTICLE
app.put('/articles/:id', function (req, res){
  let article = req.body;
  let queryStr = `UPDATE articles SET title=(?), description=(?), text=(?) WHERE id=(?)`;
  db.query(queryStr, [article.title, article.description, article.text, req.params.id], function(err, result) {
    if(err) res.status(500).send(err);
    else res.status(200).send(result);
  });
});

// DELETING AN ARTICLE
app.delete('/articles/:id', function (req, res){
  let queryStr = `DELETE FROM articles WHERE id=(?)`;
  db.query(queryStr, [req.params.id], function(err, result) {
    if(err) res.status(500).send(err);
    else res.status(200).send(result);
  });
});

// POSTING A COMMENT
app.post('/articles/:id/comment', function (req, res){
  let article = req.body;
  let queryStr = `INSERT INTO comments (author, comment, article_id) VALUES (?, ?, ?)`
  db.query(queryStr, [article.author, article.comment, req.params.id], function(err, result) {
    if(err) res.status(500).send(err);
    else res.status(200).send(result);
  });
});

app.listen(PORT, () => console.log(`SimpleBlog listening on PORT: ${PORT}`));