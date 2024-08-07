import { Router } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import cloudinary from '../cloudinaryConfig.js';
import { createCollection, createProduct, editCollection, editProduct, getAllProducts, getAllProductsInPromotion, getCollection, getCollections, getProduct, logOut, removeCollection, removeProduct } from '../controllers/dashboard.js';

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

router.get('/logout', logOut);

router.get('/', (req, res) => { res.redirect('/admin/products') });

router.get('/products', getAllProducts);

router.post('/products/new', upload.fields([{ name: 'img1' }, { name: 'img2' }, { name: 'img3' }]), createProduct);

router.get('/products/:id', getProduct);

router.patch('/products/:id', upload.fields([{ name: 'img1_url' }, { name: 'img2_url' }, { name: 'img3_url' }]), editProduct);

router.delete('/products/:id', removeProduct);

router.get('/collections', getCollections);

router.post('/collections', createCollection);

router.get('/collections/:id', getCollection);

router.patch('/collections/:id', editCollection);

router.delete('/collections/:id', removeCollection);

router.get('/promotion', getAllProductsInPromotion);


export default router;