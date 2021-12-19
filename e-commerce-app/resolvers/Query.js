exports.Query = {
  hello: () => 'World!',
  products: (parent, { filter }, { data }) => {
    let products = data.products;

    if (filter) {
      if ('onSale' in filter) {
        products = products.filter(p => p.onSale === filter.onSale)
      }
    }

    return products;
  },
  product: (parent, { id }, { data }) => data.products.find(p => p.id === id),
  categories: (parent, args, { data }) => data.categories,
  category: (parent, { id }, { data }) => data.categories.find(p => p.id === id),
};
