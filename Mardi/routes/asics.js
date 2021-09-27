const express = require('express');
const mysql = require('../config/db')
const router = express.Router()

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM asics'
    mysql.query(sql, (err, result) => {
        if (err) {
            res.status(500).send('error retrieving data from database')
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

router.get("/:id", (req, res) => {
	const { id } = req.params
	const sql = "SELECT * FROM asics WHERE id = ?"
	const values = [id]
	mysql.query(sql, values, (err, result) => {
		if (err) {
			res.status(500).send("Error retrieving data from database")
		} else {
			console.table(result)
			res.status(200).json(result)
		}
	})
})

router.post("/", (req, res) => {
	const asicsData = [
		req.body.model,
		req.body.colorway
	]
	const sql = 'INSERT INTO asics (model, colorway) VALUES (?, ?)'
	console.log(req.body)
	mysql.query(sql, asicsData, (err, result) => {
		if (err) {
			res.status(500).send("Error retrieving data from database")
		} else {
			console.table(result)
			res.status(200).json(result)
		}
	})
})

router.put("/:id", (req, res) => {
	const { id } = req.params
	const sql = `UPDATE asics SET (model, colorway) = (?, ?) WHERE id = ?`
	console.log(req.body)
	const values = [req.body.name, id]
	mysql.query(sql, values, (err, result) => {
		if (err) {
			res.status(500).send("Error retrieving data from database")
		} else {
			console.table(result)
			res.status(200).json(result)
		}
	})
})

router.delete("/:id", (req, res) => {
	const { id } = req.params
	const sql = `DELETE FROM asics WHERE id = ?`
	const values = [id]
	mysql.query(sql, values, (err, result) => {
		if (err) {
			res.status(500).send("Error retrieving data from database")
		} else {
			console.table(result)
			res.status(200).json(result)
		}
	})
})

module.exports = router