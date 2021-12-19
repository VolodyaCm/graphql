exports.Category = {
  products: (parent, { filter }, { data }) => {
    let products = data.products.filter(p => p.categoryId === parent.id)

    if (filter) {
      if ('onSale' in filter) {
        products = products.filter(p => p.onSale === filter.onSale )
      }
    }

    return products;
  }
};
