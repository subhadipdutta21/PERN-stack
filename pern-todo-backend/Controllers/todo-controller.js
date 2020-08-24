const pool = require('../db')

module.exports = {
    getAll: async (req, res) => {
        try {
            const allTodos = await pool.query('SELECT * FROM todo')
            res.json(allTodos.rows)

        } catch (err) {
            console.log(err)
        }
    },

    addOne: async (req, res) => {
        try {
            let { desc } = req.body
            const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [desc])
            res.json(newTodo.rows[0])

        } catch (err) {
            console.log(err)
        }
    },

    getOne: async (req, res) => {
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
    },

    deleteOne: async (req, res) => {
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
    },

    updateOne: async (req, res) => {
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
    }
}