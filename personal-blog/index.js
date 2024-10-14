const express = require("express");
const path = require("node:path");
const AuthMiddleware = require("./utils/auth");
const read = require("./utils/read");
const write = require("./utils/write");
const ejs = require("ejs");

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.json());

app.get('/', (req, res) => {
  const articles = read('data.json');

  res.render('index', { articles });
})

app.get('/article', (req, res) => {
  const articles = read('data.json');
  const article = articles.find(item => item.id === req.query.id);

  if (!article) {
    res.status(400).send({ error: "file not exits." });
  }

  res.render('article', { article });
})

app.get('/admin', AuthMiddleware, (req, res) => {
  const articles = read('data.json');

  res.render('admin', { articles });
})

app.put('/article', AuthMiddleware, (req, res) => {
  const { title, content } = req.body;
  const data = read("data.json");

  try {
    const { id } = data.find(article => article.id === req.query.id);

    if (!id) {
      throw new Error("article not found!")
    }

    if (!title || !content) {
      throw new Error('Missing required fields.');
    }

    const newData = data.map(article => article.id === id ? { ...article, title, content, updatedAt: new Date() } : article);

    write('data.json', newData);
    res.status(201).send(newData)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

app.post('/article', AuthMiddleware, (req, res) => {
  const { title, content } = req.body;
  const data = read("data.json");

  try {
    if (!title || !content) {
      throw new Error('Missing required fields.');
    }

    data.push({
      id: crypto.randomUUID(),
      title,
      content,
      createdAt: new Date()
    });

    write("data.json", data);
    res.status(201).send(data)
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})

app.delete('/article', AuthMiddleware, (req, res) => {
  const data = read("data.json");

  try {
    const { id } = data.find(article => article.id === req.query.id);


    if (!id) {
      throw new Error("article not found!")
    }

    const newData = data.filter(article => article.id !== id);

    write('data.json', newData);
    res.status(204).send(newData)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

app.get('/edit', AuthMiddleware, (req, res) => {
  const articles = read('data.json');

  res.render('edit', {});
})

app.get('/new', AuthMiddleware, (req, res) => {
  const articles = read('data.json');

  res.render('new', {});
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
})
