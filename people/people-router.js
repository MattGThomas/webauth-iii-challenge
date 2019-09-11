const router = require('express').Router()

const People = require('./people-model.js')
const resMidware = require('../auth/midware.js')

router.get('/', resMidware, (req, res) => {
    const { sub, department } = req.decodedToken
    
    People.find()
        .then(people => {
            res.status(200).json(people)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

module.exports = router