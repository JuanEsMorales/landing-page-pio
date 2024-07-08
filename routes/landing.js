import { Router } from 'express';
import { getProduct, getProductsForSlides } from '../controllers/landing.js';

const router = Router();

router.get('/:id', getProduct);

router.get('/', getProductsForSlides);



export default router;