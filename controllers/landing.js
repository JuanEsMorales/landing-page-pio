import { getNewCollections } from "../models/collections.js"
import { getProductById, getProducts, getRelatedProducts } from "../models/products.js"
import { getProductsInPromotion } from "../models/promotions.js"

export async function getProduct(req, res) {
  const product = await getProductById(req.params.id);
  const relatedProducts = await getRelatedProducts(product.category, product.id);
  if (product.is_in_promotion) {
    const { id, name, description, img1_url, img2_url, img3_url, price, previous_price, category, available_sizes } = product;
    return res.render('product', {
      id,
      name,
      description,
      image: img1_url,
      secondImage: img2_url,
      thirdImage: img3_url,
      previuosPrice: previous_price,
      price,
      sizesAvailable: available_sizes,
      relatedProducts: relatedProducts,
      category,
    });
  }
  const { id, name, description, img1_url, img2_url, img3_url, price, category, available_sizes } = product;
  res.render('product', {
    id,
    name,
    description,
    image: img1_url,
    secondImage: img2_url,
    thirdImage: img3_url,
    price,
    sizesAvailable: available_sizes,
    relatedProducts: relatedProducts,
    category,
  });
}

export async function getProductsForSlides(req, res) {
  const productsInPromotion = await getProductsInPromotion();
  const collections = await getNewCollections();
  res.render('index', { productsInPromotion, collections });
}

export async function getProductsForCategory(req, res) {
  let { category, destinataries } = req.params;
  const products = await getProducts(category, destinataries);
  if (category === 'jackets') {
    category = 'Chaquetas';
  } else if (category === 'jeans') {
    category = 'Jeans';
  }
  if (destinataries == 'women') {
    destinataries = 'mujeres';
  } else if (destinataries == 'men') {
    destinataries = 'hombres';
  }
  res.render('categoryProducts', { products, category, destinataries });
}