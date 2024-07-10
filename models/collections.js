import pool from "./db/database.js"

export async function addCollection(data) {
  try {
    const { name, category, products, destinataries } = data
    const productsJson = JSON.stringify(products)
    const collection = await pool.query("SELECT * FROM collections WHERE products = ?", [productsJson])
    if (collection[0].length > 0) {
      return {
        error: "La coleccion ya existe",
      }
    }
    const query = `INSERT INTO collections (name, category, persons_destinataries, products) VALUES (?, ?, ?, ?)`
    const values = [name, category, destinataries, productsJson]
    await pool.query(query, values)
    return { message: "Coleccion agregada" }
  } catch (error) {
    return { error: "Error al agregar coleccion", error: error.message }
  }
}

export async function getCollectionById(id) {
  try {
    const collection = await pool.query("SELECT * FROM collections WHERE id = ?", [
      id,
    ])
    if (collection[0].length === 0) {
      return { error: "Coleccion no encontrada" }
    }
    return collection[0][0]
  } catch (error) {
    return { error: "Error al obtener coleccion" }
  }
}

export async function getNewCollections(category = null, persons_destinataries = null) {
  let query =
    category || persons_destinataries
      ? `SELECT * FROM collections WHERE `
      : `SELECT * FROM collections`
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
    const collections = await pool.query(query, [category, persons_destinataries])
    return collections[0]
  } catch (error) {
    return { error: "Error al obtener colecciones", error: error.message }
  }
}

export async function updateCollection(id, fieldsToUpdate) {
  if (Object.keys(fieldsToUpdate).length === 0) {
    return { error: "No hay campos para actualizar" }
  }
  if (fieldsToUpdate.products) {
    fieldsToUpdate.products = JSON.stringify(
      fieldsToUpdate.products
    )
  }
  const set = Object.keys(fieldsToUpdate)
    .map((key) => `${key} = ?`)
    .join(", ")
  const values = Object.values(fieldsToUpdate)
  values.push(id)
  try {
    const query = `UPDATE collections SET ${set} WHERE id = ?`
    await pool.query(query, values)
    return { message: "Coleccion actualizada", id }
  } catch (error) {
    return { error: "Error al actualizar coleccion", errorMessage: error.message }
  }
}

export async function deleteCollection(id) {
  try {
    const query = `DELETE FROM collections WHERE id = ?`
    await pool.query(query, [id])
    return { message: "Coleccion eliminada" }
  } catch (error) {
    return { error: "Error al eliminar coleccion", error: error.message }
  }
}
