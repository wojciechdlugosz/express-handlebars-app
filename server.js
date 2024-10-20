const express = require('express');
const path = require('path');
const app = express();
const hbs = require('express-handlebars');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/contact/send-message', upload.single('file'), (req, res) => {

  const { author, sender, title, message } = req.body;
  const { file } = req;

  if(author && sender && title && message && file) {
    res.render('contact', { file: file.originalname, isSent: true });
  }
  else {
    res.render('contact', { isError: true });
  }
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});