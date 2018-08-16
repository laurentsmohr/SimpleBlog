USE heroku_8d49b95dd7e54af;

CREATE TABLE articles (
  id INT NOT NULL AUTO_INCREMENT,
  author VARCHAR(30) DEFAULT 'Anonymous',
  date VARCHAR(10),
  title TINYTEXT,
  description TINYTEXT,
  text TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE comments (
  id INT NOT NULL AUTO_INCREMENT,
  author VARCHAR(30) DEFAULT 'Anonymous',
  comment VARCHAR(1000),
  article_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (article_id) REFERENCES articles(id)
);