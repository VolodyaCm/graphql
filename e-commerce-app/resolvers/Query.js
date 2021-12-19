exports.Query = {
  hello: () => 'World!',
  products: (parent, { filter }, { data }) => {
    let products = data.products;

    if (filter) {
      if ('onSale' in filter) {
        products = products.filter(p => p.onSale === filter.onSale )
      }

      if ([1,2,3,4,5].includes(filter.rating)) {
        products = products.filter((p) => {
          const reviews = data.reviews.filter((r) => r.productId === p.id);
          const avg = reviews.reduce((a, b) => (a + b.rating), 0) / reviews.length;
          if (avg >= filter.rating) return true
        });
      }
    }

    return products;
  },
  product: (parent, { id }, { data }) => data.products.find(p => p.id === id),
  categories: (parent, args, { data }) => data.categories,
  category: (parent, { id }, { data }) => data.categories.find(p => p.id === id),
};
