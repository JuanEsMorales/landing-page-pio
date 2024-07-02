import { Router } from 'express';
import { getProduct } from '../controllers/landing.js';

const router = Router();

router.get('/:id', getProduct);



export default router;