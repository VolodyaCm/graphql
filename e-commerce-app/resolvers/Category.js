exports.Category = {
  products: (parent, args, { data }) => (
    data.products.filter(p => p.categoryId === parent.id)
  )
};
