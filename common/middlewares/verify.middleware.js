exports.hasUserValidFields = (req, res, next) => {
    let errors = [];
    if (req.body) {
        if (!req.body.firstName) {
            errors.push('Missing firstname');
        }
        if (!req.body.lastName) {
            errors.push('Missing lastname');
        }
        if (!req.body.email) {
            errors.push('Missing email');
        }
        if (!req.body.password) {
            errors.push('Missing password');
        }
        if (errors.length) {
            return res.status(400).send({
                success: false,
                message: errors.join(', ')
            });
        } else {
            return next();
        }
    }
};

exports.hasProductValidFields = (req, res, next) => {
    let errors = [];
    if (req.body) {
        if (!req.body.productName) {
            errors.push('Missing product name');
        }
        if (!req.body.imageUrl) {
            errors.push('Missing image url');
        }
        if (!req.body.price) {
            errors.push('Missing price');
        }
        if (!req.body.category) {
            errors.push('Missing category');
        }
        if (errors.length) {
            return res.status(400).send({
                success: false,
                message: errors.join(', ')
            });
        } else {
            return next();
        }
    }
};