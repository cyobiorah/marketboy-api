const UnitModel = require('../models/units.models');

exports.insert = (req, res) => {
    UnitModel.findByName(req.body.unitName)
        .then((unit) => {
            if (unit[0]) {
                res.status(404).send({
                    success: false,
                    message: 'Unit already exists!'
                });
            } else {
                UnitModel.createUnit(req.body)
                    .then((result) => {
                        res.status(201).send({
                            success: true,
                            data: result,
                            message: 'Unit Created Successfully!'
                        })
                    })
            }
        })
};

exports.list = (req, res) => {
    UnitModel.list()
        .then((result) => {
            res.status(201).send({
                success: true,
                data: result
            });
        })
};

exports.getById = (req, res) => {
    UnitModel.findById(req.params.unitId)
        .then((result) => {
            res.status(200).send({
                success: true,
                data: result,
            });
        });
};

exports.patchById = (req, res) => {
    UnitModel.patchUnit(req.params.unitId, req.body)
        .then((result) => {
            res.status(201).send({
                success: true,
                data: result,
                message: 'Successfully Updated!'
            });
        });
};

exports.removeById = (req, res) => {
    UnitModel.removeById(req.params.unitId)
        .then((result) => {
            res.status(204).send({
                success: true,
                message: 'Successfully deleted unit'
            });
        });
};