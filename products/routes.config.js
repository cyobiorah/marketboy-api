const ProductsController = require('./controllers/product.controller');
// const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
// const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN_USER;
const NORMAL = config.permissionLevels.NORMAL_USER

exports.routesConfig = function (app) {
    app.post('/products', [
        ProductsController.insert
    ]);
    app.get('/products', [
        ProductsController.list
    ]);
    app.get('/products/:productId', [
        ProductsController.getById
    ]);
    app.delete('/products/:productId', [
        ProductsController.removeById
    ])
}
