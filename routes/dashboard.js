import { Router } from 'express';
import { createProduct, getAllProducts, getUsers } from '../controllers/dashboard.js';

const router = Router();

router.get('/users', getUsers);

router.post('/products/new', createProduct);

router.get('/products', getAllProducts);

export default router;