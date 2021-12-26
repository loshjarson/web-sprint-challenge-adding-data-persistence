const express = require('express');
const Resources = require('./model');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const resources = await Resources.getAll() 
        res.status(200).json(resources)
      } catch (err) {
        next(err)
      }
});

router.post('/', async (req, res, next) => {
  const resource = req.body;

  try {
      const newResource = await Resources.add(resource)
      res.status(201).json(newResource);
    } catch (err) {
      next(err)
    }
});

module.exports = router;