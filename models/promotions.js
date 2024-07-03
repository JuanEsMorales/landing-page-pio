import pool from "./db/database.js"

export async function addProductToPromotion(id, newPrice, previuosPrice) {
  try {
    const product = await pool.query("SELECT * FROM products WHERE id = ?", [id])
    if (product[0][0].is_in_promotion) {
      return {
        error: "El producto ya está en promoción",
      }
    }
    const queryPriceAndIsInPromotion = `UPDATE products SET price = ?, is_in_promotion = ?, previous_price = ? WHERE id = ?`
    await pool.query(queryPriceAndIsInPromotion, [
      newPrice,
      true,
      previuosPrice,
      id,
    ])
    return { message: "Producto agregado a promoción" }
  } catch (error) {
    return {
      error: "Error al agregar producto a promoción",
      error: error.message,
    }
  }
}

export async function updateProductFromPromotion(id, newPrice) {
  try {
    const query = `UPDATE products SET price = ?, WHERE id = ?`
    await pool.query(query, [newPrice, id])
    return { message: "Producto actualizado en promoción" }
  } catch (error) {
    return {
      error: "Error al actualizar producto en promoción",
      error: error.message,
    }
  }
}

export async function getProductsInPromotion() {
  try {
    const products = await pool.query("SELECT * FROM products WHERE is_in_promotion = true")
    return products[0]
  } catch (error) {
    return { error: "Error al obtener productos en promoción" }
  }
}


export async function deleteProductFromPromotion(id, previuosPrice) {
  try {
    const queryPriceAndIsInPromotion = `UPDATE products SET price = ?, is_in_promotion = ?, previous_price = ? WHERE id = ?`
    await pool.query(queryPriceAndIsInPromotion, [
      previuosPrice,
      false,
      null,
      id,
    ])
    return { message: "El producto ha dejado de estar en promoción" }
  } catch (error) {
    return {
      error: "Error al eliminar producto de promoción",
      error: error.message,
    }
  }
}

