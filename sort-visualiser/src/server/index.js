import express from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../../webpack.config.js';

let app = express();
const port = process.env.PORT || 3000

let compiler = webpack(webpackConfig);
if (process.env.NODE_ENV === 'development') {
  app.use(webpackMiddleware(compiler, {
    stats: {colors: true},
    publicPath: webpackConfig.output.publicPath
  }));
}


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
  res.redirect('/bubble');
});

app.get('/bubble', (req, res) => {
  res.render('index', { title: 'Bubble Sort', css: ['main.css'], sortType: 'bubble' });
});

app.get('/cocktail', (req, res) => {
  res.render('index', { title: 'Cocktail Sort', css: ['main.css'], sortType: 'cocktail' });
});

app.get('/selection', (req, res) => {
  res.render('index', { title: 'Selection Sort', css: ['main.css'], sortType: 'selection' });
});

app.get('/double-selection', (req, res) => {
  res.render('index', { title: 'Double Selection Sort', css: ['main.css'], sortType: 'double-selection' });
});

app.get('/insertion', (req, res) => {
  res.render('index', { title: 'Insertion Sort', css: ['main.css'], sortType: 'insertion' });
});


app.listen(port, (err) => {
  console.log(`Listening on port ${port}`);
});
