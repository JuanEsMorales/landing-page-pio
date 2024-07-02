import pool from "./db/database.js";

export async function addProduct(data) {
  try {
    const { name, description, category, persons_destinataries, previous_price, price, img1_url, img2_url, img3_url, available_sizes, is_in_promotion } = data;
    const query = `INSERT INTO products (name, description, category, persons_destinataries, previous_price, price, img1_url, img2_url, img3_url, available_sizes, is_in_promotion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [name, description, category, persons_destinataries, previous_price, price, img1_url, img2_url, img3_url, JSON.stringify(available_sizes), is_in_promotion];
    await pool.query(query, values);
    return { message: 'Producto agregado' };
  } catch (error) {
    return { error: 'Error al agregar producto', error: error };
  }
}

export async function getProducts(category = null) {
  const query = category ? `SELECT * FROM products WHERE category = ?` : `SELECT * FROM products`;
  try {
    const products = await pool.query(query, [category]);
    return products[0];
  } catch (error) {
    return { error: 'Error al obtener productos' };
  }
}

export async function getRelatedProducts(category, id) {
  try {
    const products = await pool.query('SELECT * FROM products WHERE category = ? AND id != ? LIMIT 6', [category, id]);
    return products[0];
  } catch (error) {
    return { error: 'Error al obtener productos' };
  }
}

export async function getProductById(id) {
  try {
    const product = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return product[0][0];
  } catch (error) {
    return { error: 'Error al obtener producto' };
  }
}

export async function updateProduct(id, data) {
  try {
    const { name, description, category, persons_destinataries, previous_price, price, img1_url, img2_url, img3_url, available_sizes, is_in_promotion } = data;
    const query = `UPDATE products SET name = ?, description = ?, category = ?, persons_destinataries = ?, previous_price = ?, price = ?, img1_url = ?, img2_url = ?, img3_url = ?, available_sizes = ?, is_in_promotion = ? WHERE id = ?`;
    const values = [name, description, category, persons_destinataries, previous_price, price, img1_url, img2_url, img3_url, JSON.stringify(available_sizes), is_in_promotion, id];
    await pool.query(query, values);
    return { message: 'Producto actualizado' };
  } catch (error) {
    return { error: 'Error al actualizar producto' };
  }
}

export async function deleteProduct(id) {
  try {
    const query = `DELETE FROM products WHERE id = ?`;
    await pool.query(query, [id]);
    return { message: 'Producto eliminado' };
  } catch (error) {
    return { error: 'Error al eliminar producto' };
  }
}

export async function getProductsInPromotion() {
  try {
    const products = await pool.query('SELECT * FROM products_in_promotion');
    return products[0];
  } catch (error) {
    return { error: 'Error al obtener productos en promoción' };
  }
}