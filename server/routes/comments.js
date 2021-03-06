const express = require('express')
const db = require('../db/comments')
const router = express.Router()

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getAllComments(id)
    .then(comments => {
      res.json(comments)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Unable to get comments from database')
    })
})

router.post('/', (req, res) => {
  const comment = req.body
  db.addComment(comment)
    .then(() => {
      res.status(200).end()
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Unable to add comment to database')
    })
})

router.put('/', (req, res) => {
  const comment = req.body
  db.updateComment(comment)
    .then(() => {
      res.status(200).end()
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Unable to update comment')
    })
})

router.delete('/', (req, res) => {
  const id = Number(req.body.id)
  db.delComment(id)
    .then(() => {
      res.status(200).end()
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Unable to update comment')
    })
})

module.exports = router