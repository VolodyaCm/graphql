exports.Product = {
  categories: (parent, args, { data }) => (
    data.categories.filter(c => c.id === parent.categoryId)
  ),
  reviews: (parent, args, { data }) => (
    data.reviews.filter(r => r.productId === parent.id)
  )
}
