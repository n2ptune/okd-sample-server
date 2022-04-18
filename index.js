const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql2/promise')
const morgan = requrie('morgan')

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
app.use(morgan())

app.get('/notes', async (req, res) => {
	const conn = await getConnection()
	const [rows, fields] = await conn.execute('SELECT * FROM khlee_test')
	res.json(rows).end()
})

app.get('/note/:id', async (req, res) => {
	// res.json(devNotes.find(note => note.id === req.params.id)).end()
	const conn = await getConnection()
	const [rows, fields] = await conn.execute('SELECT * FROM khlee_test WHERE id = ?', req.params.id)
	res.json(rows).end()
})

app.post('/note', async (req, res) => {
	// devNotes.push({ value: req.body.value, id: id++, createDate: new Date() })
	// res.status(200).end()
	const conn = await getConnection()
	const rand = Math.floor(Math.random() * 100000000)
	const [rows, fields] = await conn.execute('INSERT INTO khlee_test (id, value) VALUES (?, ?)', [rand, req.body.value || ''])
	res.json(rows).end()
})

app.listen(3033, () => console.log('server start'))
