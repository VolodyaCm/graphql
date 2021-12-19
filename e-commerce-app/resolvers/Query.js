const { products, categories } = require('../data');

exports.Query = {
  hello: () => 'World!',
  products: () => products,
  product: (parent, { id }) => products.find(p => p.id === id),
  categories: () => categories,
  category: (parent, { id }) => categories.find(p => p.id === id),
};
