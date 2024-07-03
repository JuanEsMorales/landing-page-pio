import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import landingRouter from './routes/landing.js';
import dashboardRouter from './routes/dashboard.js';
import { PORT } from './config.js';

const app = express();

const __dirname = import.meta.dirname;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
}));
app.set('view engine', 'hbs');

app.use('/landing',landingRouter)
app.use('/admin', dashboardRouter)

app.get('/', (req, res) => {
  res.redirect('/landing');
});


app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});