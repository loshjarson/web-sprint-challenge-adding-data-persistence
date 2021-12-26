const express = require('express');
const Projects = require('./model');
const router = express.Router();

router.get('/', async (req ,res, next) => {
    try {
        const projects = await Projects.getAll()
        res.status(200).json(projects)
    } catch(err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    const project = req.body
    try {
        const newProject = await Projects.add(project)
        res.status(201).json(newProject)
    } catch(err) {
        next(err)
    }
})

module.exports = router;