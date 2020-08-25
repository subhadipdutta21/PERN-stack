const express = require('express')
const router = express.Router()
const todoController = require('../Controllers/todo-controller')
const verifyTokenMiddleware = require('../Controllers/Verify-token-middleware')

// get all todos
router.get('', verifyTokenMiddleware, todoController.getAll)

// add todos
router.post('', verifyTokenMiddleware, todoController.addOne)

//get a single todo by id
router.get('/:id', verifyTokenMiddleware, todoController.getOne)

// delete a todo by id
router.delete('/:id', verifyTokenMiddleware, todoController.deleteOne)

// update a todo
router.put('/:id', verifyTokenMiddleware, todoController.updateOne)

module.exports = router