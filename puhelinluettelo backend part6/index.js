const express = require('express')
const { status } = require('express/lib/response')
const app = express()


app.use(express.json())
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
  persons.splice(id - 1, 1)
  console.log(`deleted from index ${id}`)
  res.send(persons)
})
app.post('/api/persons', (req, res) => {
  let valid = true
  const id = Math.floor(Math.random() * 9999)
  const newperson = req.query
  newperson.id = id

  if (typeof (newperson.name) !== "string" || typeof (newperson.number) !== "string") {
    res.status(401)
    res.writeHead(401, 'Error, please set name and number')
    valid = false
  }
  if (newperson.name === '') {
    res.status(401)
    res.send(res.writeHead(401, 'Error, please set a name'))
    valid = false
  }
  if (newperson.number === '') {
    res.status(401)
    res.writeHead(401, 'Error, please set a number')
    valid = false
  }

  if (valid) {
  for (let i = 0; i < persons.length; i++) {
    let check = persons[i].name.toUpperCase()
    let check2 = newperson.name.toUpperCase()
    if (check === check2) {
      res.status(303)
      res.writeHead(303, 'Error, name must be unique')
      valid = false
    }
  }
  
  persons.push(newperson)
  console.log(req.query)
  res.send(persons)
}

  else {
    res.end()
  }
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})