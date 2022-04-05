const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql2/promise')

function getConnection () {
	return mysql.createConnection({
		host: process.env.DB_HOST,
		database: 'khlee_test',
		port: 3306,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD
	})
}

const devNotes = []
let id = 0

app.use(cors())
app.use(express.json())

app.get('/notes', async (req, res) => {
	const conn = await getConnection()
	const q = await conn.query('SELECT * FROM khlee_test')
	res.json(q).end()
})

app.get('/note/:id', (req, res) => {
	// res.json(devNotes.find(note => note.id === req.params.id)).end()
	const conn = await getConnection()
	const q = await conn.query('SELECT * FROM khlee_test WHERE id = ?', req.params.id)
	res.json(q).end()
})

app.post('/note', (req, res) => {
	// devNotes.push({ value: req.body.value, id: id++, createDate: new Date() })
	// res.status(200).end()
	const conn = await getConnection()
	const rand = Math.floor(Math.random() * 100000000)
	const q = await conn.query('INSERT INTO khlee_test (id, value) VALUES (?, ?)', [rand, req.body.value || ''])
	res.json(q).end()
})

app.listen(3033, () => console.log('server start'))
