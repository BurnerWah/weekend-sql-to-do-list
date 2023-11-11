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

router.post('/', async (req, res) => {
  /** @type {TodoClientAddItem} */
  const { body } = req
  try {
    const result = await pool.query(
      `INSERT INTO "todos" ("text") VALUES ($1);`,
      [body.text],
    )
    console.log(result)
    res.sendStatus(201)
  } catch (err) {
    console.error('Error executing query', err)
    res.sendStatus(500)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query(`DELETE FROM "todos" WHERE "id" = $1;`, [
      id,
    ])
    console.log(result)
    res.sendStatus(200)
  } catch (err) {
    console.error('Error executing query', err)
    res.sendStatus(500)
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query(
      /*sql*/ `
        UPDATE "todos"
        SET "isComplete" = NOT "isComplete"
        WHERE "id" = $1;
      `,
      [id],
    )
    console.log(result)
    res.sendStatus(200)
  } catch (err) {
    console.error('Error executing query', err)
    res.sendStatus(500)
  }
})

module.exports = router
