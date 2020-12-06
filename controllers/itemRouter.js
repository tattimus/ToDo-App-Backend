const itemRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { getTokenFrom } = require('../utils/routerHelp')
const Item = require('../models/item')

// Fetch and return all items
itemRouter.get('/', async (req, res, next) => {
  try {
    const items = await Item.find()
    res.json(items.map((item) => item.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

// Create and save new item
itemRouter.post('/', async (req, res, next) => {
  const { body } = req
  if (req.get('authorization')) {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (token && decodedToken.id) {
      try {
        const item = new Item({
          textContent: body.textContent,
          priority: body.priority
        })
        const savedItem = await item.save()
        res.json(savedItem.toJSON())
      } catch (exception) {
        next(exception)
      }
    } else {
      res.status(401).end()
    }
  } else {
    res.status(401).end()
  }
})

// Update item information
itemRouter.put('/:id', async (req, res, next) => {
  if (req.get('authorization')) {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (token && decodedToken.id) {
      const { id } = req.params
      const { body } = req
      try {
        const item = await Item.findById(id)
        item.textContent = body.textContent
        item.priority = body.priority
        const updItem = await item.save()
        res.json(updItem.toJSON())
      } catch (exception) {
        next(exception)
      }
    } else {
      res.status(401).end()
    }
  } else {
    res.status(401).end()
  }
})

// Delete item
itemRouter.delete('/:id', async (req, res, next) => {
  if (req.get('authorization')) {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (token && decodedToken.id) {
      try {
        const item = await Item.findById(req.params.id)
        if (item) {
          await Item.findByIdAndRemove(req.params.id)
          res.status(204).end()
        } else {
          res.status(404).end()
        }
      } catch (exception) {
        next(exception)
      }
    } else {
      res.status(401).end()
    }
  } else {
    res.status(401).end()
  }
})

module.exports = itemRouter