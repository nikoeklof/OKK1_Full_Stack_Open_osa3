require('dotenv').config()
console.log(process.env)
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const { response } = require('express')
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms -- :body'))
morgan.token('body', (req, res) => JSON.stringify(req.body));
let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "040-1332132"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "040-8634532"
  },
  {
    "id": "4",
    "name": "Mary Poppendick",
    "number": "040-1236643"
  }]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')

})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)
  res.json(person)
})

app.get('/api/persons/', (req, res) => {
  res.json(persons)
})

app.get('/api/info/', (req, res) => {
  const date = new Date()
  res.send(`<p>Phonebook has info for ${persons.length} people</p><br></br><p>${date}</p>`)

})
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  for(let i = 0; i < persons.length; i++){
    if(persons[i].id === id){
      persons.splice(i, 1)
    }
  }
  console.log(`deleted person with the id of: ${id}`)
  res.send(persons)
})
app.post('/api/persons', (req, res) => {
  console.log(req.body)
  let valid = true
  const id = Math.floor(Math.random() * 9999)
  const newperson = req.body
  newperson.id = id

  if (typeof (newperson.name) !== "string" || typeof (newperson.number) !== "string") {
    valid = false
    res.status(401).send({ error: 'Error, please set name and number' })
  }
  if (newperson.name === '') {
    valid = false
    res.status(401).send({ error: 'Error, please set a name' })
  }
  if (newperson.number === '') {
    valid = false
    res.status(401).send({ error: 'Error, please set a number' })
  }

  if (valid === true) {
    for (let i = 0; i < persons.length; i++) {
      let check = persons[i].name.toUpperCase()
      let check2 = newperson.name.toUpperCase()
      if (check === check2) {
        valid = false
        res.status(303).send({ error: 'Error, name must be unique' })

      }
    }
    const person = new Person({
      name: newperson.name,
      number: newperson.number,
      id: id
    })
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    
  }

  else {

    res.end()
    
  }
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})