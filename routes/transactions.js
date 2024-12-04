const express = require('express');
const Transaction = require('../models/transaction');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
      const transaction = await Transaction.create(req.body);
      res.status(201).json(transaction); // Certifique-se de enviar apenas a nova transação
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByPk(id);
      res.status(200).json(transaction);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.destroy({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
