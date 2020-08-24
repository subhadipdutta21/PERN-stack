const express = require('express')
const router = express.Router()
const todoController = require('../Controllers/todo-controller')

// get all todos
router.get('', todoController.getAll)

// add todos
router.post('', todoController.addOne)

//get a single todo by id
router.get('/:id', todoController.getOne)

// delete a todo by id
router.get('/:id', todoController.deleteOne)

// update a todo
router.put('/:id', todoController.updateOne)

module.exports = router