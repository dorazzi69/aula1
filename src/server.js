const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/aula1")
    .then(() => console.log("Conectado ao MongoDB!"))
    .catch((err) => console.log("Erro ao conectar ao MongoDB:", err));

const Product = mongoose.model("Product", {
    name: String,
    price: Number
});

app.post("/products", async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});

app.get("/products", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.get("/products/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
});

app.put("/products/:id", async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
});

app.delete("/products/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Produto removido." });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
