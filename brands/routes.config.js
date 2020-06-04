const BrandsController = require('./controllers/brands.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN_USER;
// const NORMAL = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/brands', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        BrandsController.insert
    ]);
    app.get('/brands', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        BrandsController.list
    ]);
    app.get('/brands/:brandId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        BrandsController.getById
    ]);
    app.delete('/brands/:brandId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        BrandsController.removeById
    ])
}