const { categories } = require('../data');

exports.Product = {
  categories: (parent) => (
    categories.filter(c => c.id === parent.categoryId)
  )
}
