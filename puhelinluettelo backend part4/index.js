const express = require('express')
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

app.get('/api/persons/:id' ,(req,res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)
  res.json(person)
})

app.get('/api/persons/', (req, res) => {
  res.json(persons)
})

app.get('/api/info/', (req,res) => {
  const date = new Date()
  res.send(`<p>Phonebook has info for ${persons.length} people</p><br></br><p>${date}</p>`)
  
})
app.delete('/api/persons/:id', (req,res) => {
  const id = req.params.id
  persons.splice(id, 1)
  console.log(`deleted from index ${id}`)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})