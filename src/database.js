const mongoose = require("mongoose");

async function connectDatabase() {
    try {
        await mongoose.connect("mongodb://localhost:27017/meubanco");
        console.log("📌 Conectado ao MongoDB!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao MongoDB:", error);
    }
}

module.exports = connectDatabase;
