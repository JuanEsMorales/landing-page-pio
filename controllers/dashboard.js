import { addProduct, getProducts } from "../models/products.js";
import { validateProduct } from "../schemas/product.js";

export async function getUsers(req, res) {
  const users = await pool.query('SELECT * FROM users');
  res.json(users[0]);
}

export async function createProduct(req, res) {
  const data = req.body;
  const { error } = validateProduct(data);
  if (error) {
    res.status(400).json({ error });
  } else {
    const { error } = await addProduct(data);
    if (error) {
      res.status(400).json({ error });
    } else {
      res.status(200).json({ message: 'Producto creado' });
    }
  }
}

export async function getAllProducts(req, res) {
  const category = req.query.category;

  if (category) {
    const products = await getProducts(category);
    res.json(products);
  } else {
    const products = await getProducts();
    res.json(products);
  }
}