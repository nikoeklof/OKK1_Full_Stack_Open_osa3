const mongoose = require('mongoose')
const password = process.argv[2]

const url =
    `mongodb+srv://nigey:${password}@cluster0.3oayx.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('people', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})
if (process.argv.length === 5) {
    person.save().then(result => {
        console.log(`person ${process.argv[3]} added to phonebook`)
        mongoose.connection.close()
    })
} else if (process.argv.length === 3) {
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

