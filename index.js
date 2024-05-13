const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = 3001;

// crate product schema
const productsSchema= new mongoose.Schema({
  title: String,
  
  price: Number,
  descreption: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// create products model 


const Product = mongoose.model("products",productsSchema)

const connecDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("DB is connected");
  } catch (error) {
    console.log("DB is not connected");
    console.log(error.message);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
  res.send("Hi, Welcome to MongoDb");
});

app.listen(PORT, async () => {
  console.log(`Server in running at http://localhost:${PORT}`);
  await connecDB();
});
