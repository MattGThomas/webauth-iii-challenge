const router = require('express').Router()

const People = require('./people-model.js')
const resMidware = require('../auth/midware.js')

router.get('/', resMidware, (req, res) => {
    console.log(req.decodedToken)
    const { sub, department } = req.decodedToken
    
    if(department === 'administration'){
    People.find()
        .then(people => {
            res.status(200).json(people)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    } else {
        People.findById(sub)
            .then(person => {
                res.status(200).json(person)
            })
    }
})

module.exports = router