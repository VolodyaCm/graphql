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
  }
}
