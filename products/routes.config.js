const ProductsController = require('./controllers/product.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const VerifyMiddleware = require('../common/middlewares/verify.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN_USER;
const NORMAL = config.permissionLevels.NORMAL_USER

exports.routesConfig = function (app) {
    app.post('/products', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        VerifyMiddleware.hasProductValidFields,
        ProductsController.insert
    ]);
    app.get('/products', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ProductsController.list
    ]);
    app.get('/products/:productId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ProductsController.getById
    ]);
    app.delete('/products/:productId', [
        ProductsController.removeById
    ])
}
