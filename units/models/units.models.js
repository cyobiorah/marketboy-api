const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const unitSchema = new Schema({
    unitName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

unitSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

unitSchema.set('toJSON', {
    virtuals: true
});

unitSchema.findById = function (cb) {
    return this.model('Units').find({ id: this.id }, cb);
};

const Unit = mongoose.model('Units', unitSchema);

exports.findByName = (name) => {
    return Unit.find({ unitName: name });
};

exports.findById = (id) => {
    return Unit.findById(id)
        .then((result) => {
            if (!result) {
                return {
                    error: 'No Unit Found'
                }
            } else {
                result = result.toJSON();
                delete result._id;
                delete result.__v;
                return result;
            }
        });
};

exports.createUnit = (unitData) => {
    const unit = new Unit(unitData);
    return unit.save();
};

exports.list = () => {
    return new Promise((resolve, reject) => {
        Unit.find(function (err, units) {
            if (err) {
                reject(err);
            } else {
                resolve(units);
            }
        })
    });
};

exports.patchUnit = (id, unitData) => {
    return new Promise((resolve, reject) => {
        Unit.findById(id, function (err, unit) {
            if (err) reject(err);
            for (let i in unitData) {
                unit[i] = unitData[i];
            }
            unit.save(function (err, updatedUnit) {
                if (err) return reject(err);
                resolve(updatedUnit);
            });
        });
    })
};

exports.removeById = (unitId) => {
    return new Promise((resolve, reject) => {
        Unit.deleteOne({ _id: unitId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};