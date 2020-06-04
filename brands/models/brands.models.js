const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    brandName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

brandSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

brandSchema.set('toJSON', {
    virtuals: true
});

brandSchema.findById = function (cb) {
    return this.model('Brands').find({ id: this.id }, cb);
};

const Brand = mongoose.model('Brands', brandSchema);

exports.findByName = (name) => {
    return Brand.find({ brandName: name });
};

exports.findById = (id) => {
    return Brand.findById(id)
        .then((result) => {
            if (!result) {
                return {
                    error: 'No Brand Found',
                }
            } else {
                result = result.toJSON();
                delete result._id;
                delete result.__v;
                return result;
            }
        });
};

exports.createBrand = (brandData) => {
    const brand = new Brand(brandData);
    return brand.save();
};

exports.list = () => {
    return new Promise((resolve, reject) => {
        Brand.find(function (err, brands) {
            if (err) {
                reject(err);
            } else {
                resolve(brands);
            }
        })
    });
};

exports.patchBrand = (id, brandData) => {
    return new Promise((resolve, reject) => {
        Brand.findById(id, function (err, brand) {
            if (err) reject(err);
            for (let i in brandData) {
                brand[i] = brandData[i];
            }
            brand.save(function (err, updatedBrand) {
                if (err) return reject(err);
                resolve(updatedBrand);
            });
        });
    })
};

exports.removeById = (brandId) => {
    return new Promise((resolve, reject) => {
        Brand.deleteOne({ _id: brandId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};