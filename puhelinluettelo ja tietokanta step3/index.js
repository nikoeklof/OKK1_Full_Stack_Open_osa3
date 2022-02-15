require('dotenv').config()
console.log(process.env)
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms -- :body'))
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')

})

app.get('/api/persons/:id', (req, res, next) => {
  console.log(req.params.id)
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }

  })
    .catch(error => next(error))
})


app.get('/api/persons/', (req, res) => {
  Person.find({}).then(response => {
    res.json(response)
  })


})

app.get('/api/info/', (req, res) => {
  const date = new Date()
  res.send(`<p>Phonebook has info for ${persons.length} people</p><br></br><p>${date}</p>`)

})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {

  const body = req.body
  console.log(body.id)

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: body.id || Math.floor(Math.random() * 9999),
  })
  console.log(person)

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name : body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(req.params.id, person, {new : true}).then(updatedPerson => {
    res.json(updatedPerson)
  }).catch(error => next(error))
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})