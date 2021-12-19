exports.Product = {
  categories: (parent, args, { data }) => (
    data.categories.filter(c => c.id === parent.categoryId)
  )
}
