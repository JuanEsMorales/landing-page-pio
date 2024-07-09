import { Router } from 'express';
import { getProduct, getProductsForCategory, getProductsForSlides } from '../controllers/landing.js';

const router = Router();

router.get('/:id', getProduct);

router.get('/', getProductsForSlides);

router.get('/:category/:destinataries', getProductsForCategory);


export default router;