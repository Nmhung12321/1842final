const categoryBuilder = require('../controller/CategoryController');

module.exports = app => {
  app
    .route('/categories')
    .get(categoryBuilder.list_all_categories)
    .post(categoryBuilder.create_a_category);

  app
    .route('/categories/:id')
    .get(categoryBuilder.read_a_category)
    .put(categoryBuilder.update_a_category)
    .delete(categoryBuilder.delete_a_category);
};
