import express from 'express';
import path from 'path';
let app = express();

let port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.redirect('/bubble');
});

app.get('/bubble', (req, res) => {
  res.render('pages/index', { title: 'Bubble Sort', css: ['main.css'], sortType: 'bubble' });
});

app.get('/cocktail', (req, res) => {
  res.render('pages/index', { title: 'Cocktail Sort', css: ['main.css'], sortType: 'cocktail' });
});

app.get('/selection', (req, res) => {
  res.render('pages/index', { title: 'Selection Sort', css: ['main.css'], sortType: 'selection' });
});

app.get('/insertion', (req, res) => {
  res.render('pages/index', { title: 'Insertion Sort', css: ['main.css'], sortType: 'insertion' });
});

app.listen(port, () => {
  console.log('Listening on port:', port);
});
