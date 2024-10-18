const express = require('express');
const { User, Show } = require('../models/index'); // Adjust the path if necessary
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

router.get('/:id/shows', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      const show = await user.getShows();
      res.json(show);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve shows' });
  }
});


router.put('/:userId/shows/:showId', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const show = await Show.findByPk(req.params.showId);
    if (user && show) {
      await user.addShow(show);
      res.status(200).json({ message: 'Show added to user' });
    } else {
      res.status(404).json({ error: 'User or Show not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to associate user with show' });
  }
});

module.exports = router;