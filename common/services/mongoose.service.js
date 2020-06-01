require('dotenv').config();
const mongoose = require('mongoose');
let count = 0;

// const uri = 'mongodb://heroku_fb6s18j2:password4password@ds033106.mlab.com:33106/heroku_fb6s18j2';
const uri = 'mongodb+srv://cyobiorah:passwordispassword@market-boy-98vqo.mongodb.net/market-boy?retryWrites=true&w=majority';
// const uri = 'mongodb://127.0.0.1/market-boy';
// const herokumongouri = 'mongodb://heroku_fb6s18j2:password4password@ds033106.mlab.com:33106/heroku_fb6s18j2'

const options = {
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true

};
const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect(process.env.MONGODB_URI || uri, options).then(() => {
        console.log('MongoDB is connected')
    }).catch(err => {
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();

exports.mongoose = mongoose;
