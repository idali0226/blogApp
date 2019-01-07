module.exports = (sequelize, type) => {
  return sequelize.define('blog', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: type.STRING,
    description: type.STRING,
    content: type.STRING,
    author: type.STRING,
    isPublish: type.BOOLEAN,
    slug: type.STRING,
  })
}
