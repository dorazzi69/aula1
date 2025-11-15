const { Product, Feedback } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      return res.status(201).json(product);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async list(req, res) {
    const products = await Product.findAll({ include: [{ model: Feedback, as: 'feedbacks' }] });
    return res.json(products);
  },

  async getById(req, res) {
    const product = await Product.findByPk(req.params.id, { include: [{ model: Feedback, as: 'feedbacks' }] });
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    return res.json(product);
  },

  async update(req, res) {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    await product.update(req.body);
    return res.json(product);
  },

  async remove(req, res) {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    await product.destroy();
    return res.json({ message: 'Produto deletado' });
  }
};
