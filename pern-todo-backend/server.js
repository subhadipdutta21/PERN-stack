const express = require('express')
const cors = require('cors')
const pool = require('./db')

const app = express()

app.use(cors())
app.use(express.json())


// add todos
app.post('/todos', async (req, res) => {
    try {
        let { desc } = req.body
        const newTodo = await pool.query(
            'INSERT INTO todo (description) VALUES($1) RETURNING *'
            , [desc])

        res.json(newTodo.rows[0])

    } catch (err) {
        console.log(err)
    }
})

// get all todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query(
            'SELECT * FROM todo'
        )

        res.json(allTodos.rows)

    } catch (err) {
        console.log(err)
    }
})

// get a single todo by id
app.get('/todos/:id', async (req, res) => {
    try {
        let { id } = req.params
        const todo = await pool.query(
            'SELECT * FROM todo WHERE todo_id=($1)'
            , [id]
        )

        res.json(todo.rows)

    } catch (error) {
        console.log(error)
    }
})

// update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        let { id } = req.params
        let { desc } = req.body

        await pool.query(
            'UPDATE todo SET description =($1) WHERE todo_id=($2)'
            , [desc, id]
        )
        res.json('todo was updated')

    } catch (error) {
        console.log(error)
    }
})

// delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        let { id } = req.params
        await pool.query(
            'DELETE FROM todo WHERE todo_id=($1)'
            , [id]
        )
        res.json('todo deleted')

    } catch (error) {
        console.log(error)
    }
})

app.listen(5000, () => console.log('server running on port 5000'))