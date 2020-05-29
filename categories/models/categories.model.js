const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: String,
});

categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true
});

categorySchema.findById = function (cb) {
    return this.model('Categories').find({ id: this.id }, cb);
};

const Category = mongoose.model('Categories', categorySchema);

exports.findByName = (name) => {
    return Category.find({categoryName: name});
}

exports.findById = (id) => {
    return Category.findById(id)
        .then((result) => {
            if (!result) {
                return {
                    error: 'No Category found',
                }
            } else {
                result = result.toJSON();
                delete result._id;
                delete result.__v;
                return result;
            }
        });
};

exports.createCategory = (categoryData) => {
    // console.log(categoryData);
    const category = new Category(categoryData);
    return category.save();
};

exports.list = () => {
    return new Promise((resolve, reject) => {
        Category.find(function (err, categories) {
            if (err) {
                reject(err);
            } else {
                resolve(categories);
            }
        })
    });
};

exports.patchCategory = (id, categoryData) => {
    return new Promise((resolve, reject) => {
        Category.findById(id, function (err, category) {
            if (err) reject(err);
            for (let i in categoryData) {
                category[i] = categoryData[i];
            }
            category.save(function (err, updatedCategory) {
                if (err) return reject(err);
                resolve(updatedCategory);
            });
        });
    })
};

exports.removeById = (categoryId) => {
    return new Promise((resolve, reject) => {
        Category.deleteOne({ _id: categoryId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};