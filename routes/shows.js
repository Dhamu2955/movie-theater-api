const express = require('express')
const { Show, User } = require('../models/index')
const { body, validationResult } = require('express-validator')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const shows = await Show.findAll()
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve shows' })
  }
});

router.get('/:id', async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id)
    if (show) {
      res.json(show);
    } else {
      res.status(404).json({ error: 'Show not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve show' })
  }
});

router.get('/:id/users', async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id)
    if (show) {
      const users = await show.getUsers()
      res.json(users);
    } else {
      res.status(404).json({ error: 'Show not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' })
  }
})

router.put('/:id/available', [
  body('available').isBoolean(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const show = await Show.findByPk(req.params.id)
    if (show) {
      show.available = req.body.available
      await show.save()
      res.json(show)
    } else {
      res.status(404).json({ error: 'Show not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update show' })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id)
    if (show) {
      await show.destroy()
      res.status(204).send()
    } else {
      res.status(404).json({ error: 'Show not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete show' })
  }
})

router.get('/genre/:genre', async (req, res) => {
  try {
    const shows = await Show.findAll({ where: { genre: req.params.genre } })
    res.json(shows)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve shows by genre' })
  }
})

module.exports = router
