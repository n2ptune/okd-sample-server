const express = require('express')
const app = express()
const cors = require('cors')

const devNotes = []
let id = 0

app.use(cors())
app.use(express.json())

app.get('/notes', (req, res) => {
	res.json(devNotes).end()
})

app.get('/note/:id', (req, res) => {
	res.json(devNotes.find(note => note.id === req.params.id)).end()
})

app.post('/note', (req, res) => {
	devNotes.push({ value: req.body.value, id: id++, createDate: new Date() })
	res.status(200).end()
})

app.listen(3033, () => console.log('server start'))
