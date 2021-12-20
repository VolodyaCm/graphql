const { v4: uuid } = require('uuid');

exports.Mutation = {
  addCategory: (parent, { input }, { data }) => {
    const newCategory = {
      id: uuid(),
      name: input.name,
    }

    data.categories.push(newCategory);
    return newCategory;
  },

  addProduct: (parent, { input }, { data }) => {
    const newProduct = {
      id: uuid(),
      name: input.name,
      description: input.description,
      quantity: input.quantity,
      onSale: input.onSale,
      image: input.image,
      categoryId: input.categoryId,
    }

    data.products.push(newProduct);
    return newProduct;
  },

  addReview: (parent, { input }, { data }) => {
    const newReview = {
      date: new Date(),
      title: input.title,
      comment: input.comment,
      rating: input.rating,
      productId: input.productId,
    }

    data.reviews.push(newReview);
    return newReview;
  },

  deleteCategory: (parent, { id }, { data }) => {
    const index = data.categories.findIndex((c) => c.id === id);
    data.categories.splice(index, 1);
    data.products.forEach((p) => {
      if (p.categoryId === id) p.categoryId = null
    });
    return true;
  },

  deleteProduct: (parent, { id }, { data }) => {
    const index = data.products.findIndex((c) => c.id === id);
    const reviews = data.reviews.filter((r) => r.productId === id);
    reviews.forEach((r) => data.reviews.slice(data.reviews.indexOf(r), 1));
    data.products.splice(index, 1);
    return true
  },

  deleteReview: (parent, { id }, { data }) => {
    const index = data.reviews.findIndex((r) => r.id === id);
    data.reviews.splice(index, 1);
    return true;
  },

  updateCategory: (parent, { id, input }, { data }) => {
    const index = data.categories.findIndex((c) => c.id === id);
    data.categories[index] = { ...data.categories[index], ...input }

    return data.categories[index];
  },

  updateProduct: (parent, { id, input }, { data }) => {
    const index = data.products.findIndex((c) => c.id === id);
    data.products[index] = { ...data.products[index], ...input }

    return data.products[index];
  },

  updateProduct: (parent, { id, input }, { data }) => {
    const index = data.reviews.findIndex((c) => c.id === id);
    data.reviews[index] = { ...data.reviews[index], ...input }

    return data.reviews[index];
  },
}
