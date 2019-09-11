const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const People = require('../people/people-model.js')

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if(token) {
        jwt.verify(token, process.env.JWT, (err, decodedToken) => {
            if(err) {
                res.status(401).json({
                    message: 'leave if you dont have the correct password'
                })
            } else {
                req.decodedToken = decodedToken
                next()
            }
        })
    } else {
        res.status(400).json({
            message: 'Leave if you dont have your magic token'
        })
    }
}