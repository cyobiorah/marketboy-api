const BrandModel = require('../models/brands.models');

exports.insert = (req, res) => {
    BrandModel.findByName(req.body.brandName)
        .then((brand) => {
            if (brand[0]) {
                res.status(404).send({
                    success: false,
                    message: 'Brand already exists!',
                });
            } else {
                BrandModel.createBrand(req.body)
                    .then((result) => {
                        res.status(201).send({
                            success: true,
                            data: result,
                            message: 'Brand Created Successfully!'
                        })
                    })
            }
        })
};

exports.list = (req, res) => {
    BrandModel.list()
        .then((result) => {
            res.status(200).send({
                success: true,
                data: result
            });
        })
};

exports.getById = (req, res) => {
    BrandModel.findById(req.params.brandId)
        .then((result) => {
            res.status(200).send({
                success: true,
                data: result,
            });
        });
};

exports.patchById = (req, res) => {
    BrandModel.patchBrand(req.params.brandId, req.body)
        .then((result) => {
            res.status(204).send({
                success: true,
                data: result,
                message: 'Successfully Updated!'
            });
        });
};

exports.removeById = (req, res) => {
    BrandModel.removeById(req.params.brandId)
        .then((result) => {
            res.status(204).send({
                success: true,
                message: 'Successfully deleted brand'
            });
        });
};