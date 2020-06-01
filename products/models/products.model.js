const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: String,
    imgageUrl: String,
    price: Number,
    description: String,
    categoryId: {
        ref: 'Categories',
        type: mongoose.Schema.Types.ObjectId,
    },
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
        .then((result) => {
            if (!result) {
                return {
                    error: 'No Product Found!',
                }
            } else {
                result = result.toJSON();
                delete result._id;
                delete result.__v;
                return result;
            }
        }).catch((err) => {
            console.log(err);
        });
};

exports.createProduct = (productData) => {
    // console.log(productData);
    const product = new Product(productData);
    return product.save();
};

exports.list = () => {
    return new Promise((resolve, reject) => {
        Product.find(function (err, products) {
            if (err) {
                reject(err);
            } else {
                resolve(products);
            }
        })
    });
};

exports.patchProduct = (id, productData) => {
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