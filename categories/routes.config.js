const CategoriesController = require('./controllers/categories.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const VerifyMiddleware = require('../common/middlewares/verify.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN_USER;
// const NORMAL = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/categories', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        VerifyMiddleware.hasCategoryValidFields,
        CategoriesController.insert
    ]);
    app.get('/categories', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        CategoriesController.list
    ]);
    app.get('/categories/:categoryId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        CategoriesController.getById
    ]);
    app.delete('/categories/:categoryId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        CategoriesController.removeById
    ]);
};