const { Router } = require('express')
const pool = require('../modules/pool')

const router = Router()

router.get('/', async (req, res) => {
  // Got tired of the .tnen().catch() syntax for promises
  try {
    const result = await pool.query(`SELECT * FROM "todos";`)
    res.send(result.rows)
  } catch (err) {
    console.error('Error executing query', err.stack)
    res.sendStatus(500)
  }
})

module.exports = router
