import { Router } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import cloudinary from '../cloudinaryConfig.js';
import { createCollection, createProduct, createProductInPromotion, deleteProductInPromotion, editCollection, editProduct, formCreateProduct, getAllProducts, getAllProductsInPromotion, getCollection, getCollections, getProduct, removeCollection, removeProduct } from '../controllers/dashboard.js';

const router = Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    format: async (req, file) => 'jpg', // Puedes ajustar el formato según sea necesario
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});

const upload = multer({ storage: storage });


router.get('/register', );

router.post('/register', );

router.get('/login', );

router.post('/login', );

router.get('/logout', );

router.get('/products', getAllProducts);

router.get('/products/new', formCreateProduct);

router.post('/products/new', upload.fields([{ name: 'img1' }, { name: 'img2' }, { name: 'img3' }]), createProduct);

router.get('/products/:id', getProduct);

router.patch('/products/:id', upload.fields([{ name: 'img1' }, { name: 'img2' }, { name: 'img3' }]), editProduct);

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