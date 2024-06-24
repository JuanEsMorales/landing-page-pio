import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';

const app = express();

const __dirname = import.meta.dirname;

app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(5000, () => {
  console.log('Server running on port http://localhost:5000');
});