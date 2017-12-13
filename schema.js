DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(4,0),
  stock_quantity INT,
  
  PRIMARY KEY(item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(10, "Jeans", "Women's Clothing", 20, 15), (11, "Dress", "Women's Clothing", 24, 20),
(12, "Scarf", "Women's Clothing", 90, 25), (13, "Shoes", "Women's Clothing", 30, 10),
(14, "Jeans", "Men's Clothing", 20, 15), (15, "Ties", "Men's Clothing", 12, 7),
(16, "Jacket", "Men's Clothing", 40, 3), (17, "Boots", "Men's Clothing", 30, 9),
(18, "Shoes", "Kid's Clothing", 20, 15), (19, "Bows", "Kid's Clothing", 2, 18),
(20, "Balls", "Kid's Toys", 2, 28), (21, "Trucks", "Kid's Toys", 3, 13) ,
(22, "Doll", "Kid's Toys", 20, 2); 