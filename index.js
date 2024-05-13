const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded(true));

// crate product schema
const productsSchema = new mongoose.Schema({
  title: { 
    type: String,
     required: true 
    },

  price: Number,
  descreption: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// create products model

const Product = mongoose.model("products", productsSchema);

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
app.post("/products", async (req, res) => {
  try {
    const newProduct = new Product({
      title: req.body.title,
      price: req.body.price,
      descreption: req.body.descreption,
    });

    const productData = await newProduct.save();

    res.status(201).send(productData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.listen(PORT, async () => {
  console.log(`Server in running at http://localhost:${PORT}`);
  await connecDB();
});
