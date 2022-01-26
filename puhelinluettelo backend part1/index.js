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
app.get('/api/persons/', (req, res) => {
  
  res.json(persons)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})