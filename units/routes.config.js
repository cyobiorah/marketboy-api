const UnitController = require('./controllers/units.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const VerifyMiddleware = require('../common/middlewares/verify.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN_USER;

exports.routesConfig = function (app) {
    app.post('/units', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        VerifyMiddleware.hasUnitValidFields,
        UnitController.insert
    ]);
    app.get('/units', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UnitController.list
    ]);
    app.get('/units/:unitId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UnitController.getById
    ]);
    app.patch('/units/:unitId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UnitController.patchById
    ]);
    app.delete('/units/:unitId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UnitController.removeById
    ]);
}