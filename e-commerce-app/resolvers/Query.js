exports.Query = {
  hello: () => 'World!',
  products: (parent, args, context) => context.products,
  product: (parent, { id }, { data }) => data.products.find(p => p.id === id),
  categories: () => categories,
  category: (parent, { id }, { data }) => data.categories.find(p => p.id === id),
};
