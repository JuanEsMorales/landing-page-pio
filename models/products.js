import pool from "./db/database.js"

export async function addProduct(data) {
  try {
    const {
      name,
      description,
      category,
      persons_destinataries,
      previous_price,
      price,
      img1_url,
      img2_url,
      img3_url,
      available_sizes,
      is_in_promotion,
    } = data
    const query = `INSERT INTO products (name, description, category, persons_destinataries, previous_price, price, img1_url, img2_url, img3_url, available_sizes, is_in_promotion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [
      name,
      description,
      category,
      persons_destinataries,
      previous_price,
      price,
      img1_url,
      img2_url,
      img3_url,
      JSON.stringify(available_sizes),
      is_in_promotion,
    ]
    await pool.query(query, values)
    return { message: "Producto agregado" }
  } catch (error) {
    return { error: "Error al agregar producto", message: error }
  }
}

export async function getProducts(
  category = null,
  persons_destinataries = null
) {
  let query =
    category || persons_destinataries
      ? `SELECT * FROM products WHERE `
      : `SELECT * FROM products`
  const queryCategoryAndPersons =
    category && persons_destinataries
      ? `category = ? AND persons_destinataries = ?`
      : ``
  if (!queryCategoryAndPersons) {
    const queryPersons = persons_destinataries
      ? `persons_destinataries = ?`
      : ``
    const queryCategory = category ? `category = ?` : ``
    query += queryPersons || queryCategory
  } else {
    query += queryCategoryAndPersons
  }
  try {
    const products = await pool.query(query, [category, persons_destinataries])
    return products[0]
  } catch (error) {
    return { error: "Error al obtener productos" }
  }
}

export async function getRelatedProducts(category, destinataries, id) {
  try {
    const products = await pool.query(
      "SELECT * FROM products WHERE category = ? AND persons_destinataries = ? AND id != ? LIMIT 6",
      [category, destinataries, id]
    )
    return products[0]
  } catch (error) {
    return { error: "Error al obtener productos" }
  }
}

export async function getProductById(id) {
  try {
    const product = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ])
    if (product[0].length === 0) {
      return { error: "Producto no encontrado" }
    }
    return product[0][0]
  } catch (error) {
    return { error: "Error al obtener producto" }
  }
}

export async function updateProduct(id, fieldsToUpdate) {
  if (Object.keys(fieldsToUpdate).length === 0) {
    return { error: "No hay campos para actualizar" }
  }
  if (fieldsToUpdate.available_sizes) {
    fieldsToUpdate.available_sizes = JSON.stringify(
      fieldsToUpdate.available_sizes
    )
  }
  const set = Object.keys(fieldsToUpdate)
    .map((key) => `${key} = ?`)
    .join(", ")
  const values = Object.values(fieldsToUpdate)
  values.push(id)
  try {
    const query = `UPDATE products SET ${set} WHERE id = ?`
    await pool.query(query, values)
    return { message: "Producto actualizado", id }
  } catch (error) {
    return { error: "Error al actualizar producto", error: error.message }
  }
}

export async function deleteProduct(id) {
  try {
    const query = `DELETE FROM products WHERE id = ?`
    await pool.query(query, [id])
    return { message: "Producto eliminado" }
  } catch (error) {
    return { error: "Error al eliminar producto", message: error.message }
  }
}
