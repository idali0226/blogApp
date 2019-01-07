const express = require('express')
const { Blog } = require('../sequelize')

const router = express.Router()

router
  .route('/')
  .get((req, res) => {
    Blog.findAll({ order: [['id', 'DESC']] }).then(blogs => res.json(blogs))
  })
  .post((req, res) => {
    Blog.create(req.body).then(blog => res.json(blog))
  })

router.route('/search').get((req, res) => {
  const { isPublish, author } = req.query

  let where = {}
  if (isPublish) {
    where = { ...where, isPublish }
  } else {
    where = { ...where, author }
  }
  Blog.findAll({
    order: [['id', 'DESC']],
    where,
  }).then(blogs => res.json(blogs))
})

router
  .route('/:id')
  .all((req, res, next) => {
    const { id } = req.params
    Blog.findById(id).then(blogItem => {
      req.item = blogItem
      next()
    })
  })
  .get((req, res) => {
    const blogItem = req.item
    if (!blogItem) {
      res.sendStatus(404)
    } else {
      res.status(200).json(blogItem)
    }
  })
  .delete((req, res) => {
    const blogItem = req.item
    if (!blogItem) {
      res.sendStatus(404)
    } else {
      blogItem.destroy()
      res.status(200).json(blogItem)
    }
  })
  .put((req, res) => {
    const { author, content, description, slug, title, isPublish } = req.body

    const blogItem = req.item
    if (!blogItem) {
      res.sendStatus(404)
    } else {
      const newData = {
        author,
        content,
        description,
        slug,
        title,
        isPublish,
      }

      blogItem
        .update(newData, {
          returning: true,
        })
        .then(updatedblog => {
          res.status(200).json(updatedblog)
        })
    }
  })

module.exports = router
