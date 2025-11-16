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

const User = mongoose.model("User", {
    name: String,
    email: String
});

const Feedback = mongoose.model("Feedback", {
    userId: String,
    productId: String,
    comment: String,
    rating: Number
});

// -------------------- PRODUCTS --------------------
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
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(product);
});

app.delete("/products/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Produto removido." });
});

// -------------------- USERS --------------------
app.post("/users", async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
});

app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.get("/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

app.put("/users/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(user);
});

app.delete("/users/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Usuário removido." });
});

// -------------------- FEEDBACK --------------------
app.post("/feedback", async (req, res) => {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.json(feedback);
});

app.get("/feedback", async (req, res) => {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
});

app.get("/feedback/:id", async (req, res) => {
    const feedback = await Feedback.findById(req.params.id);
    res.json(feedback);
});

app.put("/feedback/:id", async (req, res) => {
    const feedback = await Feedback.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(feedback);
});

app.delete("/feedback/:id", async (req, res) => {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: "Feedback removido." });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
