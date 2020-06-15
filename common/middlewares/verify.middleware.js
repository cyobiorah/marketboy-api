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
    // console.log(req.body);
    let errors = [];
    if (req.body) {
        if (!req.body.productName) {
            errors.push('Missing product name');
        }
        if (!req.body.imageUrl) {
            errors.push('Missing image url');
        } else {
            if (!req.body.imageUrl['url']) {
                errors.push('Missing url link');
            }
            if (!req.body.imageUrl['format']) {
                errors.push('Missing url format');
            }
        }
        if (!req.body.description) {
            errors.push('Missing product description');
        };
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

exports.hasUnitValidFields = (req, res, next) => {
    let errors = [];
    if (req.body) {
        if (!req.body.unitName) {
            errors.push('Missing unit name');
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
}

exports.hasCategoryValidFields = (req, res, next) => {
    let errors = [];
    if (req.body) {
        if (!req.body.categoryName) {
            errors.push('Missing category name');
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
}