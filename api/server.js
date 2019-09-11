const express = require('express')
require('dotenv').config()

const authRouter = require('../auth/auth-router.js')
const peopleRouter = require('../people/people-router.js')

const server = express()
server.use(express.json())

server.use('/api/auth', authRouter)
server.use('/api/people', peopleRouter)

server.get('/', (req, res) => {
    res.send('the monster lives')
})

module.exports = server