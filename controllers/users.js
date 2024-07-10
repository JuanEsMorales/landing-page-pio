import { createUser, initializeUser } from "../models/users.js";
import userSchema from "../schemas/user.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

export async function registerUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Faltan datos' });
  }
  const { error } = userSchema.safeParse(req.body);
  if (error) {
    return res.status(400).json({ error: error.errors[0].message });
  }
  const user = await createUser(name, password, email);
  if (user.error) {
    return res.status(400).json({ error: user.error });
  }
  res.json({ message: 'Registro exitoso' });
}

export async function loginUser(req, res) {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: 'Faltan datos' });
  }
  const { error } = userSchema.safeParse(req.body);
  if (error) {
    return res.status(400).json({ error: error.errors[0].message });
  }
  const user = await initializeUser(name, password);
  if (user.error) {
    return res.status(400).json({ error: user.error });
  }
  const token = jwt.sign({ user_id: user.user.id, name: user.user.username }, SECRET, { expiresIn: '1h' });
  res.cookie('access_token', token, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict' 
  }).json({ message: 'Login exitoso' });
}

export function loginForm(req, res) {
  res.render('login', { layout: 'loginUser' });
}

export function registerForm(req, res) {
  res.render('register', { layout: 'loginUser' });
}
