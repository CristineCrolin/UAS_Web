const jwt = require('jsonwebtoken')

module.exports.GenerateToken = (username, id) => {
    return jwt.sign({
        id: id,
        email: username,
    }, "Secret", { expiresIn: '7d' })
} 