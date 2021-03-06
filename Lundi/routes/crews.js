const express = require("express")
const mysql = require("../config/db")

const router = express.Router()

router.get("/", (req, res) => {
	const sql = "SELECT * FROM crews"
	mysql.query(sql, (err, result) => {
		if (err) {
			res.status(500).send("Error retrieving data from database")
		} else {
			console.table(result)
			res.status(200).json(result)
		}
	})
})

router.get("/:id", (req, res) => {
	const { id } = req.params
	const sql = "SELECT * FROM crews WHERE id = ?"
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
	const sql = `INSERT INTO crews (crewname) VALUES (?)`
	console.log(req.body)
	const values = [req.body.crewname]
	mysql.query(sql, values, (err, result) => {
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
	const sql = `UPDATE crews SET crewname = ? WHERE id = ?`
	console.log(req.body)
	const values = [req.body.crewname, id]
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
	const sql = `DELETE FROM crews  WHERE id = ?`
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