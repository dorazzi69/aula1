const { User, Feedback } = require('..');

feedbackController.js
module.exports = {
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async list(req, res) {
    const users = await User.findAll({ include: [{ model: Feedback, as: 'feedbacks' }] });
    return res.json(users);
  },

  async getById(req, res) {
    const user = await User.findByPk(req.params.id, { include: [{ model: Feedback, as: 'feedbacks' }] });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    return res.json(user);
  },

  async update(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    await user.update(req.body);
    return res.json(user);
  },

  async remove(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    await user.destroy();
    return res.json({ message: 'Usuário deletado' });
  }
};
