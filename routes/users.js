import { Router } from 'express';

import { loginForm, loginUser, registerForm, registerUser } from '../controllers/users.js';

const router = Router();

router.get('/register', registerForm);

router.post('/register', registerUser);

router.get('/login', loginForm);

router.post('/login', loginUser);


export default router;