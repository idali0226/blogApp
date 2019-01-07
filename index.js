const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const blogs = require('./src/routes/blogs')

app.use('/blogs', blogs)

app.listen(8000)
