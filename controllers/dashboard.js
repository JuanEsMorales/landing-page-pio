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
    res.status(400).json({ error: error.issues[0].message });
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
  let { name, description, category, persons_destinataries, price, newPrice, previousPrice, tallas, img1_url, img2_url, img3_url } = req.body;
  const images = req.files;

  price = parseInt(price);
  tallas = JSON.parse(tallas);

  
  const data = {
    
  }
  // look if any data has been changed
  
  const product = await getProductById(id);
  
  if (product.name != name) {
    data.name = name;
  }
  if (product.description != description) {
    data.description = description;
  }
  if (product.category != category) {
    data.category = category;
  }
  if (product.persons_destinataries != persons_destinataries) {
    data.persons_destinataries = persons_destinataries;
  }
  if (newPrice) {
    newPrice = parseInt(newPrice);
    previousPrice = parseInt(previousPrice);
    if (newPrice >= product.price) {
      return res.status(400).json({ error: "El nuevo precio debe ser menor que el actual" });
    }
    data.previous_price = previousPrice;
    data.price = newPrice;
    data.is_in_promotion = true;
  } else if (product.is_in_promotion) {
    data.previous_price = null;
    data.is_in_promotion = false;
    if (price != product.price) {
      data.price = price;
    }
  } else {
    data.price = price;
  }
  function arraysEqual(arr1, arr2) {
    console.log(arr1, arr2);
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
  if (!arraysEqual(product.available_sizes, tallas)) {
    data.available_sizes = tallas;
  }
  if (images) {
    const imageUrls = Object.values(images).map(fileArray => fileArray[0].path);
    img1_url = imageUrls[0];
    img2_url = imageUrls[1];
    img3_url = imageUrls[2];
    if (img1_url !== 'null' && img1_url != product.img1_url && img1_url !== undefined) {
      data.img1_url = img1_url;
    }
    if (img2_url !== 'null' && img2_url != product.img2_url && img2_url !== undefined) {
      data.img2_url = img2_url;
    }
    if (img3_url !== 'null' && img3_url != product.img3_url && img3_url !== undefined) {
      data.img3_url = img3_url;
    }
  }
  if (data.length == 0) {
   return res.status(400).json({ error: "No hay datos para actualizar" });
  }
  const { error } = validatePartialProduct(data);

  if (error) {
    res.status(400).json({error: error.issues[0].message});
  } else {
    const { error } = await updateProduct(id, data);
    if (error) {
      res.status(400).json({error});
    } else {
      res.status(200).json({ message: 'Producto actualizado' });
    }
  }
}

export async function removeProduct(req, res) {
  const { id } = req.params;
  const { error, message } = await deleteProduct(id);
  if (error) {
    res.status(400).json({ error, message });
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
    res.status(400).json({ error: error.issues[0].message });
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
    res.status(400).json({ error: error.issues[0].message });
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

export async function getAllProductsInPromotion(req, res) {
  const products = await getProductsInPromotion();
  res.send(products);
}
