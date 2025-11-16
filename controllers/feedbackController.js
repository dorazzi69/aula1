const { Feedback, User, Product } = require('..');

module.exports = {
  async create(req, res) {
    try {
      const { userId, productId } = req.body;

      const user = await User.findByPk(userId);
      if (!user) return res.status(400).json({ error: 'Usuário inválido' });

      const product = await Product.findByPk(productId);
      if (!product) return res.status(400).json({ error: 'Produto inválido' });

      const feedback = await Feedback.create(req.body);
      return res.status(201).json(feedback);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async list(req, res) {
    const feedbacks = await Feedback.findAll({ include: ['user', 'product'] });
    return res.json(feedbacks);
  },

  async getById(req, res) {
    const feedback = await Feedback.findByPk(req.params.id, { include: ['user', 'product'] });
    if (!feedback) return res.status(404).json({ error: 'Feedback não encontrado' });
    return res.json(feedback);
  },

  async update(req, res) {
    const feedback = await Feedback.findByPk(req.params.id);
    if (!feedback) return res.status(404).json({ error: 'Feedback não encontrado' });
    await feedback.update(req.body);
    return res.json(feedback);
  },

  async remove(req, res) {
    const feedback = await Feedback.findByPk(req.params.id);
    if (!feedback) return res.status(404).json({ error: 'Feedback não encontrado' });
    await feedback.destroy();
    return res.json({ message: 'Feedback deletado' });
  }
};
