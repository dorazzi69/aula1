const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/', feedbackController.create);
router.get('/', feedbackController.list);
router.get('/:id', feedbackController.getById);
router.put('/:id', feedbackController.update);
router.delete('/:id', feedbackController.remove);

module.exports = router;
