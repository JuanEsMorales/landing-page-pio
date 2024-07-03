import { Router } from 'express';
import { createCollection, createProduct, createProductInPromotion, deleteProductInPromotion, editCollection, editProduct, formCreateProduct, getAllProducts, getAllProductsInPromotion, getCollection, getCollections, getProduct, removeCollection, removeProduct } from '../controllers/dashboard.js';

const router = Router();

router.get('/register', );

router.post('/register', );

router.get('/login', );

router.post('/login', );

router.get('/logout', );

router.get('/products', getAllProducts);

router.get('/products/new', formCreateProduct);

router.post('/products/new', createProduct);

router.get('/products/:id', getProduct);

router.patch('/products/:id', editProduct);

router.delete('/products/:id', removeProduct);

router.get('/collections', getCollections);

router.post('/collections', createCollection);

router.get('/collections/:id', getCollection);

router.patch('/collections/:id', editCollection);

router.delete('/collections/:id', removeCollection);

router.get('/promotion', getAllProductsInPromotion);

router.post('/promotion', createProductInPromotion);

router.delete('/promotion/:id', deleteProductInPromotion);

export default router;