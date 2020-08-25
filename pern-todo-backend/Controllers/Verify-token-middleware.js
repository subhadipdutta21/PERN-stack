const jwt = require('jsonwebtoken')
const config = require('config')

const verifyToken = async = (req, res, next) => {
    console.log(req.header)
    const token = req.header('auth-token')
    if (!token) res.send({ error: 'Access denied!' })
    else {
        try {
            const verified = jwt.verify(token, config.get('jwtSecret'))            
            if (verified) next()
        } catch (error) { res.send(error) }
    }
}

module.exports = verifyToken
