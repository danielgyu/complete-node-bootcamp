const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('../../models/tourModels.js');

// env var
dotenv.config({ path: '../../.env' });

// configure mongo db
console.log(process.env);
const DB = process.env.MONGO_DB.replace('<password>', process.env.MONGO_PW);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('DB connection successful');
    });

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Tour data imported');
    } catch (err) {
        console.log(err);
    }
};

if (process.argv[2] === '--import') {
    importData();
}
