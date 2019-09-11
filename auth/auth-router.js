const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const People = require('../people/people-model')

router.post('/register', (req, res) => {
    let person = req.body
    const hash = bcrypt.hashSync(person.password, 10)
    person.password = hash

    People.add(person)
        .then(newUser => {
            const token = makeAToken(newUser)
            res.status(201).json({
                person: newUser,
                token
            })
        })
        .catch(err => {
            res.status(500).json(error)
        })

})

router.post('/login', (req, res) => {
    let { username, password } = req.body

    People.findBy({ username })
        .first()
        .then(person => {
            if (person && bcrypt.compareSync(password, person.password)) {
                const token = makeAToken(person)
                res.status(200).json({
                    message: `welcome, ${person.username}!`,
                    token
                })
            } else {
                res.status(401).json({ 
                    message: 'invalid credentials'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

function makeAToken(person) {
    const payload = {
        sub: person.id,
        username: person.username,
        department: person.department
    }
    const options = {
        expiresIn: '2d'
    }

    return jwt.sign(payload, process.env.JWT, options)
}

module.exports = router