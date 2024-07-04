import { addCollection, deleteCollection, getCollectionById, getNewCollections, updateCollection } from "../models/collections.js";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../models/products.js";
import { addProductToPromotion, deleteProductFromPromotion, getProductsInPromotion, updateProductFromPromotion } from "../models/promotions.js";
import { validateCollection, validatePartialCollection } from "../schemas/collection.js";
import { validateProduct, validatePartialProduct, validateProductInPromotion, validatePartialProductInPromotion } from "../schemas/product.js";

export async function formCreateProduct(req, res) {
  const { id } = req.params;
  if (id) {
    const product = await getProductById(id);
    res.render('new_product', { product });
  }
  res.render('new_product');
}

export async function formCreateCollection(req, res) {
  const { id } = req.params;
  if (id) {
    const collection = await getCollectionById(id);
    res.render('new_collection', { collection });
  }
  res.render('new_collection');
}

export async function getProduct(req, res) {
  const { id } = req.params;
  try {
    const result = await getProductById(id);
    if (result.error) {
      res.status(400).json({ error: result.error });
    }
    res.send(result);
  } catch (error) {
    return { error: "Error al obtener producto", error: error.message }
  }
}

export async function createProduct(req, res) {
  const { name, description, category, destinataries, price, tallas } = req.body;
  const images = req.files;


  const imageUrls = Object.values(images).map(fileArray => fileArray[0].path);

  const sizes = JSON.parse(tallas);

  const data = {
    name,
    description,
    category,
    persons_destinataries: destinataries,
    price: parseInt(price),
    img1_url: imageUrls[0],
    img2_url: imageUrls[1],
    img3_url: imageUrls[2],
    available_sizes: sizes,
    is_in_promotion: false,
  }


  const { error } = validateProduct(data);
  if (error) {
    res.status(400).json({ error });
  } else {
    const { error } = await addProduct(data);
    if (error) {
      res.status(400).json({ error });
    } else {
      res.status(201).json({ message: 'Producto agregado' });
    }
  }
}

export async function editProduct(req, res) {
  const { id } = req.params;
  let data = req.body;
  const images = req.files;

  console.log(data, id);

  if (data.price) {
    data.price = parseInt(data.price);
  }

  if (images) {
    const imageUrls = Object.values(images).map(fileArray => fileArray[0].path);
    data.img1_url = imageUrls[0];
    data.img2_url = imageUrls[1];
    data.img3_url = imageUrls[2];
  }

  if (data.tallas) {
    const sizes = JSON.parse(data.tallas);
    data.available_sizes = sizes;
  }

  if (data.img1_url === 'null' || data.img2_url === 'null' || data.img3_url === 'null') {
    data.img1_url = null;
    data.img2_url = null;
    data.img3_url = null;
  }
  

  const { error } = validatePartialProduct(data);

  if (error) {
    res.status(400).send(error);
  } else {
    const { error } = await updateProduct(id, data);
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send({ message: 'Producto actualizado' });
    }
  }
}

export async function removeProduct(req, res) {
  const { id } = req.params;
  const { error } = await deleteProduct(id);
  if (error) {
    res.status(400).json({ error });
  } else {
    res.status(200).json({ message: 'Producto eliminado' });
  }
}

export async function getAllProducts(req, res) {
  const {category, destinataries} = req.query;

  if (category || destinataries) {
    const products = await getProducts(category, destinataries);
    res.send(products);
  } else {
    const products = await getProducts();
    res.render("products", { layout: "dashboard", products });
  }
}

export async function getCollections(req, res) {
  const { category, destinataries } = req.query;

  if (category) {
    const collections = await getNewCollections(category, destinataries);
    res.json(collections);
  } else {
    const collections = await getNewCollections();
    res.json(collections);
  }
}

export async function getCollection(req, res) {
  const { id } = req.params;
  const collection = await getCollectionById(id);
  res.send(collection);
}

export async function createCollection(req, res) {
  const data = req.body;
  const { error } = validateCollection(data);
  if (error) {
    res.status(400).json({ error });
  } else {
    const { error } = await addCollection(data);
    if (error) {
      res.status(400).json({ error });
    } else {
      res.status(201).json({ message: 'Coleccion agregada' });
    }
  }
}

export async function editCollection(req, res) {
  const { id } = req.params;
  const data = req.body;
  const { error } = validatePartialCollection(data);
  if (error) {
    res.status(400).json({ error });
  } else {
    const { error } = await updateCollection(id, data);
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json({ message: 'Coleccion actualizada' });
    }
  }
}

export async function removeCollection(req, res) {
  const { id } = req.params;
  const { error } = await deleteCollection(id);
  if (error) {
    res.status(400).json({ error });
  } else {
    res.status(201).json({ message: 'Coleccion eliminada' });
  }
}

export async function createProductInPromotion(req, res) {
  const { error } = validateProductInPromotion(req.body);
  const { newPrice, previuosPrice, id } = req.body;
  if (error) {
    res.status(400).json({ error });
  } else {
    const { error } = await addProductToPromotion(id, newPrice, previuosPrice);
    if (error) {
      res.status(400).json({ error });
    } else {
      res.status(201).json({ message: 'Producto agregado' });
    }
  }
}

export async function getAllProductsInPromotion(req, res) {
  const products = await getProductsInPromotion();
  res.send(products);
}

export async function updateProductInPromotion(req, res) {
  const { id } = req.params;
  const { newPrice, previuosPrice } = req.body;
  const { error } = validatePartialProductInPromotion(data);
  if (error) {
    res.status(400).json({ error });
  } else {
    const { error } = await updateProductFromPromotion(id, newPrice, previuosPrice);
    if (error) {
      res.status(400).json({ error });
    } else {
      res.status(200).json({ message: 'Producto actualizado' });
    }
  }
}

export async function deleteProductInPromotion(req, res) {
  const { id } = req.params;
  const { previuosPrice } = req.body;
  const { error } = await deleteProductFromPromotion(id, previuosPrice);
  if (error) {
    res.status(400).json({ error });
  } else {
    res.status(200).json({ message: 'Producto eliminado' });
  }
}