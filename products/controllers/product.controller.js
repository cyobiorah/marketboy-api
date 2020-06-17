const ProductModel = require('../models/products.model');

exports.insert = (req, res) => {
    ProductModel.findByName(req.body.productName)
        .then((product) => {
            if (product[0]) {
                res.status(404).send({
                    success: false,
                    message: 'Product already exists!',
                });
            } else {
                ProductModel.createProduct(req.body)
                    .then((result) => {
                        res.status(201).send(
                            {
                                success: true,
                                data: result,
                                message: 'Product Created Successfully!'
                            }
                        )
                    });
            }
        })
};

exports.listProductsByCategoryId = (req, res) => {
    ProductModel.findByCategoryId(req.params.categoryId)
        .then((result) => {
            res.status(200).send({
                success: true,
                data: result
            });
        })
};

exports.list = (req, res) => {
    ProductModel.list()
        .then((result) => {
            res.status(200).send({
                data: result,
                success: true,
            });
        })
};

exports.getById = (req, res) => {
    ProductModel.findById(req.params.productId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.patchById = (req, res) => {
    ProductModel.patchProduct(req.params.productId, req.body)
        .then((result) => {
            res.status(201).send({
                success: true,
                data: result,
                message: 'Product Updated Successfully!'
            });
        });
};

exports.removeById = (req, res) => {
    ProductModel.removeById(req.params.productId)
        .then((result) => {
            // console.log(result);
            res.status(204).send({});
        });
};