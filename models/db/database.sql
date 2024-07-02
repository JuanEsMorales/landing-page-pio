CREATE DATABASE db_pio;

CREATE TABLE users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category ENUM('jeans', 'jackets') NOT NULL,
  persons_destinataries ENUM('men', 'women') NOT NULL,
  previous_price INT,
  price INT NOT NULL,
  img1_url VARCHAR(255) NOT NULL,
  img2_url VARCHAR(255) NOT NULL,
  img3_url VARCHAR(255),
  available_sizes JSON NOT NULL,
  is_in_promotion BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products_in_promotion(
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE collections(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  category ENUM('jeans', 'jackets') NOT NULL,
  products JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);