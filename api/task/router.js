const express = require('express');
const Tasks = require('./model');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const tasks = await Tasks.getAll() 
        res.status(200).json(tasks)
      } catch (err) {
        next(err)
      }
});

router.post('/', async (req, res, next) => {
  const taskData = req.body;

  try {
      const postedTask = await Tasks.add(taskData)
      res.status(201).json(postedTask);
    } catch (err) {
      next(err)
    }
});



module.exports = router;