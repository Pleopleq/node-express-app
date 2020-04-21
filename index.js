const express = require('express');
const app = express();

app.use(express.json())

let persons = [  
    {
        name: "Felix",
        number: "09834089230",
        id: 1
    },
    {
        name: "Derek",
        number: "0983497034",
        id: 2
    },
    {
        name: "Cesar",
        number: "8732789423",
        id: 3   
    }
]

app.get('/', (req, res) =>{
    res.send('<h1>Hello world!</h1>')
})

app.get('/api/persons', (req, res) =>{
    res.json(persons)
})

app.post('/api/persons', (req, res) =>{

    const randomId = Math.floor(Math.random() * 255);


    const newPerson = {
        name: req.body.name,
        number: req.body.number,
        id: randomId
    }

    if(!newPerson.name|| !newPerson.number)
    {
        res.status(400).json({error: 'Please fill all the fields'})
    } else if (persons[0].name.includes(req.body.name))
    {
        res.status(400).json({error: 'Name must be unique'})
    } else {
        persons.push(newPerson);
        res.json(newPerson)
    }
})

app.get('/api/persons/:id', (req, res) =>{
    const id = Number(req.params.id);
    const onePerson = persons.find(person => person.id === id );
    if(id > persons.length){
        res.send('That user doesnt exist')
    }
    res.json(onePerson)
})

app.delete('/api/persons/:id', (req, res) =>{
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()

})

app.get('/info', (req, res) =>{
    res.send(`
    <p> Phonebook has info of ${persons.length} people </p>
    <p>${new Date()}</p>
    `)
})

const PORT = 3001;

app.listen(PORT, () =>{
    console.log(`Server running in port ${PORT}`)
})

