const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const products = [
  {
    name: "iPhone 15",
    description: "Apple latest flagship phone",
    price: 80000,
    image: "https://example.com/iphone15.jpg",
    category: "Mobile",
    stock: 10,
  },
  {
    name: "Samsung Galaxy S24",
    description: "Samsung premium Android phone",
    price: 75000,
    image: "https://example.com/s24.jpg",
    category: "Mobile",
    stock: 8,
  },
  {
    name: "Nike Air Max Shoes",
    description: "Comfortable running shoes",
    price: 12000,
    image: "https://example.com/nike.jpg",
    category: "Footwear",
    stock: 15,
  },
  {
    name: "HP Pavilion Laptop",
    description: "Intel i5, 16GB RAM laptop",
    price: 60000,
    image: "https://example.com/laptop.jpg",
    category: "Electronics",
    stock: 5,
  },
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    await Product.deleteMany(); // optional: old products remove

    await Product.insertMany(products);

    console.log("4 Products Added Successfully ✅");

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedData();