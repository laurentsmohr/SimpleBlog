const express = require('express')
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback')
const pool = require('./db/index')
const path = require('path')

const app = express()

app.use(history())
app.use(express.static(path.join(__dirname, '/../client/dist')))
app.use(bodyParser.json())

const PORT = process.env.PORT || 8000

// GETTING ALL ARTICLES
app.get('/articles', function (req, res) {
  let queryStr = `SELECT id, title, description FROM articles`
  pool.getConnection(function (error, connection) {
    connection.query(queryStr, function (err, result) {
      connection.release()
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(result)
      }
    })
    if (error) {
      console.log(error)
    }
  })
})

// GETTING A SPECIFIC ARTICLE
app.get('/articles/:id', function (req, res) {
  let queryStr = `SELECT * FROM articles WHERE id=(?)`
  let article, comments
  pool.getConnection(function (error, connection) {
    connection.query(queryStr, [req.params.id], function (err, result) {
      if (err) {
        res.status(500).send(err)
      } else {
        article = result[0]
      }
      let queryStr = `SELECT id, author, comment FROM comments WHERE article_id = (?)`
      connection.query(queryStr, [req.params.id], function (err, result) {
        connection.release()
        if (err) {
          res.status(500).send(err)
        } else {
          comments = result
          res.status(200).send({article, comments})
        }
      })
    })
    if (error) {
      console.log(error)
    }
  })
})

// CREATING AN ARTICLE
app.post('/articles', function (req, res) {
  let article = req.body
  let queryStr = `INSERT INTO articles (author, date, title, description, text) VALUES (?, ?, ?, ?, ?)`
  pool.getConnection(function (error, connection) {
    connection.query(queryStr, [article.author, article.date, article.title, article.description, article.text], function (err, result) {
      connection.release()
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(result)
      }
    })
    if (error) {
      console.log(error)
    }
  })
})

// EDITING AN ARTICLE
app.put('/articles/:id', function (req, res) {
  let article = req.body
  let queryStr = `UPDATE articles SET title=(?), author=(?), description=(?), text=(?) WHERE id=(?)`
  pool.getConnection(function (error, connection) {
    connection.query(queryStr, [article.title, article.author, article.description, article.text, req.params.id], function (err, result) {
      connection.release()
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(result)
      }
    })
    if (error) {
      console.log(error)
    }
  })
})

// DELETING AN ARTICLE
app.delete('/articles/:id', function (req, res) {
  let queryStr = `DELETE FROM comments WHERE article_id=(?)`
  pool.getConnection(function (error, connection) {
    connection.query(queryStr, [req.params.id], function (err, result) {
      if (err) {
        res.status(500).send(err)
      } else {
        let queryStr = `DELETE FROM articles WHERE id=(?)`
        connection.query(queryStr, [req.params.id], function (err, result) {
          connection.release()
          if (err) {
            res.status(500).send(err)
          } else {
            res.status(200).send(result)
          }
        })
      }
    })
    if (error) {
      console.log(error)
    }
  })
})

// POSTING A COMMENT
app.post('/articles/:id/comment', function (req, res) {
  let article = req.body
  let queryStr = `INSERT INTO comments (author, comment, article_id) VALUES (?, ?, ?)`
  pool.getConnection(function (error, connection) {
    connection.query(queryStr, [article.author, article.comment, req.params.id], function (err, result) {
      connection.release()
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(result)
      }
    })
    if (error) {
      console.log(error)
    }
  })
})

app.listen(PORT, () => console.log(`SimpleBlog listening on PORT: ${PORT}`))
