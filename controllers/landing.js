import { getNewCollections } from "../models/collections.js"
import { getProductById, getRelatedProducts } from "../models/products.js"
import { getProductsInPromotion } from "../models/promotions.js"

const jeansOnPromotion = [
  {
    id: 7,
    name: 'Jeans azul oscuro',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    image: 'first-slide/2-first-slide.JPEG',
    previuosPrice: '$110.000',
    price: '$90.000',
  },
  {
    id: 8,
    name: 'Jeans azul oscuro',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: 'first-slide/3-first-slide.jpg',
    previuosPrice: '$140.000',
    price: '$110.000',
  },
  {
    id: 9,
    name: 'Jeans azul oscuro',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: 'first-slide/5-first-slide.JPEG',
    previuosPrice: '$150.000',
    price: '$90.000',
  },
  {
    id: 10,
    name: 'Jeans azules',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    image: 'first-slide/6-first-slide.jpg',
    price: '$30.000',
  },
  {
    id: 11,
    name: 'Jeans azul cielo',
    image: 'first-slide/5-first-slide.JPEG',
    price: '$150.000',
  },
  {
    id: 12,
    name: 'Jeans negros',
    image: 'first-slide/6-first-slide.jpg',
    price: '$110.000',
  },
]

const jeansSecondSlide = [
  {
    id: 1,
    name: 'Jeans azul oscuro',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: 'second-slide/3-second-slide.jpg',
    secondImage: 'second-slide/3.1-second-slide.jpg',
    price: '$90.000',
  },
  {
    id: 2,
    name: 'Jeans azul oscuro',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: 'second-slide/2-second-slide.jpg',
    secondImage: 'second-slide/2.1-second-slide.JPEG',
    price: '$90.000',
  },
  {
    id: 3,
    name: 'Jeans azul oscuro',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.',
    image: 'second-slide/3-second-slide.jpg',
    secondImage: 'second-slide/3.1-second-slide.jpg',
    price: '$100.000',
  },
  {
    id: 4,
    name: 'Jeans azul claro',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    image: 'second-slide/4-second-slide.jpg',
    secondImage: 'second-slide/4.1-second-slide.jpg',
    price: '$30.000',
  },
  {
    id: 5,
    name: 'Jeans azul oscuro',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: 'second-slide/5-second-slide.jpg',
    secondImage: 'second-slide/5.1-second-slide.jpg',
    price: '$150.000',
  },
  {
    id: 6,
    name: 'Jeans azul oscuro',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'second-slide/6-second-slide.jpg',
    secondImage: 'second-slide/6.1-second-slide.jpg',
    price: '$110.000',
  },
]

const jacketsSecondSlide = [
  {
    id: 1,
    name: 'Chaqueta de mezclilla azul claro',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    image: 'third-slide/1-third-slide.jpg',
    secondImage: 'third-slide/1.1-third-slide.jpg',
    price: '$90.000',
  },
  {
    id: 2,
    name: 'Chaqueta de cuero negra',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute.',
    image: 'third-slide/2-third-slide.JPEG',
    secondImage: 'third-slide/2.1-third-slide.JPEG',
    price: '$110.000',
  }
]

const sizesAvailableJeans = [
  32,
  28,
  30,
  34
]

const sizesAvailableJackets = [
  'S',
  'M',
  'L',
  'XL',
  'XXL'
]

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
  res.send(productsInPromotion, collections);
}
