const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: { type: String },
    imageUrl: { type: String },
    price: { type: String },
    description: { type: String },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brands',
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Units'
    }
});

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJson', {
    virtuals: true
});

productSchema.findById = function (cb) {
    return this.model('Products').find({ id: this.id }, cb);
};

const Product = mongoose.model('Products', productSchema);

exports.findByName = (name) => {
    return Product.find({ productName: name });
};

exports.findById = (id) => {
    return Product.findById(id)
        .populate('category', '-__v')
        .populate('unit', '-__v')
        .populate('brand', '-__v')
        .exec()
        .then((result) => {
            if (!result) {
                return {
                    error: 'No Product Found!',
                }
            } else {
                result = result.toJSON();
                delete result.__v;
                return result;
            }
        }).catch((err) => {
            console.log(err);
        });
};

exports.createProduct = (productData) => {
    productData.imageUrl = productData.imageUrl['url'];
    console.log(productData);
    const product = new Product(productData);
    return product.save();
};

// find product by category
exports.findByCategoryId = (id) => {
    return new Promise((resolve, reject) => {
        Product.find({ category: id })
            .populate('category', '-__v')
            .populate('unit', '-__v')
            .populate('brand', '-__v')
            .exec()
            .then((products) => {
                resolve(products);
            }, (err) => {
                reject(err);
            })
    });
};

exports.list = () => {
    return new Promise((resolve, reject) => {
        Product.find({})
            .populate('category', '-__v')
            .populate('unit', '-__v')
            .populate('brand', '-__v')
            .exec()
            .then((products) => {
                resolve(products);
            }, (err) => {
                reject(err);
            })
    });
};

exports.patchProduct = (id, productData) => {
    if (productData.imageUrl) {
        productData.imageUrl = productData.imageUrl['url'];
    }
    return new Promise((resolve, reject) => {
        Product.findById(id, function (err, product) {
            if (err) reject(err);
            for (let i in productData) {
                product[i] = productData[i];
            }
            product.save(function (err, updatedProduct) {
                if (err) return reject(err);
                resolve(updatedProduct)
            });
        });
    })
};

exports.removeById = (productId) => {
    return new Promise((resolve, reject) => {
        Product.deleteOne({ _id: productId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};