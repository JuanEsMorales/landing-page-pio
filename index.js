import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import jwt from "jsonwebtoken";


import landingRouter from './routes/landing.js';
import dashboardRouter from './routes/dashboard.js'
import usersRouter from './routes/users.js';
import { PORT, SECRET } from './config.js';


const app = express();

const __dirname = import.meta.dirname;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };

  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token no valido' });
      } else {
        req.session.user = decoded;
        next();
      }
    });
  } else {
    return res.redirect('/users/login');
  }
};

const verifyUsers = (req, res, next) => {
  try {
    const { user } = req.session;
    if (user) {
      return res.redirect('/admin');
    } else {
      next();
    }
  } catch (error) {
    next()
  }
};

app.set("views", path.join(__dirname, "views"))

app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
}));
app.set('view engine', 'hbs');

app.use('/landing',landingRouter)
app.use('/admin', verifyToken, dashboardRouter)
app.use('/users', verifyUsers, usersRouter)

app.get('/', (req, res) => {
  res.redirect('/landing');
});


app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
