// Initializes the `products` service on path `/products`
const createService = require('feathers-mongoose');
const createModel = require('../../models/products.model');
const hooks = require('./products.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/products', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('products');

  service.hooks(hooks);
};
