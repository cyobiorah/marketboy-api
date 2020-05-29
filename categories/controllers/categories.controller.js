const CategoryModel = require('../models/categories.model');

exports.insert = (req, res) => {
    // console.log(req.body);
    CategoryModel.findByName(req.body.categoryName)
        .then((category) => {
            if (category[0]) {
                res.status(404).send({
                    success: false,
                    message: 'Category already exists!',
                });
            } else {
                CategoryModel.createCategory(req.body)
                    .then((result) => {
                        res.status(201).send(
                            {
                                success: true,
                                data: result,
                                message: 'Category Created Successfully!'
                            }
                        )
                    })
            }
        })
};

exports.list = (req, res) => {
    // console.log(req);
    CategoryModel.list()
        .then((result) => {
            res.status(200).send({
                data: result,
                success: true
            });
        })
};

exports.getById = (req, res) => {
    // console.log(req);
    CategoryModel.findById(req.params.categoryId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.patchById = (req, res) => {
    CategoryModel.patchCategory(req.params.categoryId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

exports.removeById = (req, res) => {
    CategoryModel.removeById(req.params.categoryId)
        .then((result) => {
            console.log(result);
            res.status(204).send({});
        });
};