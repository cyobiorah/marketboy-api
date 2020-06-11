const ProductsController = require('./controllers/product.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const VerifyMiddleware = require('../common/middlewares/verify.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN_USER;

exports.routesConfig = function (app) {
    app.post('/products', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        VerifyMiddleware.hasProductValidFields,
        ProductsController.insert
    ]);
    app.get('/products/category/:categoryId', [
        ProductsController.listProductsByCategoryId
    ]);
    app.get('/products', [
        ProductsController.list
    ]);
    app.get('/products/:productId', [
        ProductsController.getById
    ]);
    app.patch('/products/:productId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ProductsController.patchById
    ]);
    app.delete('/products/:productId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ProductsController.removeById
    ])
}
