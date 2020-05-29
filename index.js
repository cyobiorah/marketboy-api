const config = require('./common/config/env.config.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const AuthorizationRouter = require('./authorization/routes.config');
const UsersRouter = require('./users/routes.config');
const CategoriesRouter = require('./categories/routes.config');
const ProductsRouter = require('./products/routes.config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    // console.log(req.body);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    // if (req.method === 'POST') {
    //     var jsonString = '';

    //     req.on('data', function (data) {
    //         jsonString += data;
    //     });

    //     req.on('end', function () {
    //         if (req.originalUrl === '/auth') {
    //             req.body = jsonString;
    //         } else {
    //             req.body = JSON.parse(jsonString);
    //         }
    //         // console.log(req.body);
    //         return next();
    //     });
    // }
    next();
});

AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
CategoriesRouter.routesConfig(app);
ProductsRouter.routesConfig(app);


app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
