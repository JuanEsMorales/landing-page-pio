import pool from "./db/database.js";
import bcrypt from 'bcrypt';

export async function createUser(name, password, email) {
  const user = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (user[0].length > 0) {
    return { error: 'El email ya esta en uso' };
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await pool.query('INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)', [name, hashedPassword, email, 'admin']);
    console.log(user);
    return user;
  } catch (error) {
    return { error: error.message };
  }
}

export async function initializeUser(name, password) {
  try {
    const user = await pool.query('SELECT * FROM users WHERE username = ?', [name]);
    if (user.length === 0) {
      return { error: 'Usuario no encontrado' };
    }
    const passwordMatch = await bcrypt.compare(password, user[0][0].password);
    if (!passwordMatch) {
      return { error: 'Contraseña incorrecta' };
    }
    return {user: user[0]};
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}