const mongoose = require('mongoose')
const password = process.argv[2]

const url = process.env.MONGODB_URI

mongoose.connect(url).then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Person = mongoose.model('people', personSchema)

module.exports = Person

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})
if (process.argv.length === 4) {
    person.save().then(result => {
        console.log(`person ${process.argv[3]} added to phonebook`)
        mongoose.connection.close()
    })
} else if (process.argv.length === 2) {
    Person.find({}).then(persons => {
        persons.forEach(person => {
            console.log(`name: ${person.name} number: ${person.number}`)
        })
        mongoose.connection.close()
    })
} else {
    console.log('Check parameters!!')
    process.exit(1)
}

