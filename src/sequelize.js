/* eslint-disable no-console */
const Sequelize = require('sequelize')
const BlogModel = require('./models/blog')
// const TodoModel = require('./models/todo')

const sequelize = new Sequelize('postgres', 'postgres', 'mysecretpassword', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

const Blog = BlogModel(sequelize, Sequelize)

// sequelize.sync().then(() => {
//   console.log(`Database & tables created!`)
// })

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`)
})

module.exports = {
  // User,
  Blog,
}
