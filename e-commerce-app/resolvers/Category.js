const { products } = require('../data');

exports.Category = {
  products: (parent) => (
    products.filter(p => p.categoryId === parent.id)
  )
};
