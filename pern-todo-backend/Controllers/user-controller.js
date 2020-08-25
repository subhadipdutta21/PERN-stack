const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('config')

module.exports = {
    register: async (req, res) => {
        let { name, email, contact, password } = req.body
        try {
            // check for existing user
            let existingCheckResp = await pool.query('SELECT * FROM users WHERE email=($1)', [email])
            console.log(existingCheckResp.rowCount)
            if (existingCheckResp.rowCount == 0) {
                // create new user
                // hash the password
                let hashedPassword = await bcrypt.hash(password, 10)
                console.log(hashedPassword)
                try {
                    const resp = await pool.query('INSERT INTO users(name, email,contact, password) VALUES($1,$2,$3,$4) RETURNING * ', [name, email, contact, hashedPassword])
                    console.log(resp.rows)
                    res.send({ success: resp.rows[0].email + "successfully inserted!" })

                } catch (error) { res.send(error) }
            }
            else res.send({ error: 'user already exists!' })

        } catch (error) { res.send(error) }
    },


    login: async (req, res) => {
        let { email, password } = req.body
        try {
            let useCheckResp = await pool.query('SELECT * FROM users WHERE email=($1)', [email])
            if (useCheckResp.rowCount !== 0) {
                // user found check password                
                if (bcrypt.compareSync(password, useCheckResp.rows[0].password)) {
                    // passwords matched ,generate JWT
                    const payload = { id: useCheckResp.rows[0].user_id }
                    let token = await jwt.sign(payload, config.get('jwtSecret'))
                    res.send({ token, ...useCheckResp.rows[0] })

                } else res.send({ error: 'wrong password!' })

            } else res.send({ error: 'user does not exist!' })

        } catch (error) { res.send(error) }

    }
}