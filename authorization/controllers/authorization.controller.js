const jwtSecret = require('../../common/config/env.config.js').jwt_secret,
    jwt = require('jsonwebtoken');
const crypto = require('crypto');
const uuid = require('uuid');
const UserModel = require('../../users/models/users.model');

exports.login = (req, res) => {
    UserModel.findByEmail(req.body.email)
        .then((_user) => {
            if (_user[0]) {
                const user = _user[0];
                user.__v = undefined;
                let token = jwt.sign(req.body, jwtSecret);
                res.status(200).send({
                    success: true,
                    data: user,
                    access_token: token,
                    message: 'Login Successful!',
                });
            } else {
                res.status(200).send({
                    success: false,
                    message: 'User does not exists!',
                })
            }
        })
}

exports.refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, jwtSecret);
        res.status(201).send({ id: token });
    } catch (err) {
        res.status(500).send({ errors: err });
    }
};
