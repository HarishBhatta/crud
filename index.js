const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ProductModel = require("./models/product.models");
const Product = require("./models/product.models");
app.use(express.json());

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update
app.patch("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    const updatedProduct = await Product.findById(id);
    res
      .status(200)
      .json({ updatedProduct, message: "Product Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete a Product

app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.params");
    // Check if the provided id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const product = await Product.findByIdAndDelete(id);
    console.log(product);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Could Not Find The File You Were Looking For" });
    }
    return res.status(200).json({ message: "Product Deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://bhattaharish:root@cluster0.v3xv5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected To The Database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection to the database failed");
  });

app.get("/", (req, res) => {
  res.send("Hello Node Server");
});
