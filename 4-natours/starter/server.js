const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app.js');

// env var
dotenv.config({ path: './.env' });

// configure mongo db
const DB = process.env.MONGO_DB.replace('<password>', process.env.MONGO_PW);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log(DB);
        console.log('DB connection successful');
    });

// mongoose model
/*
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'REQUIRED'],
        unique: true,
    },
    rating: {
        type: Number,
        default: 4.0,
    },
    price: {
        type: Number,
        required: [true, 'REQUIRED'],
    },
});
const Tour = mongoose.model('Tour', tourSchema);

const testCamper = new Tour({
    name: 'The Park Camper',
    price: 200,
});

testCamper
    .save()
    .then((doc) => {
        console.log(doc);
    })
    .catch((err) => {
        console.log(`ERROR: ${err}`);
    });
*/

// bind server to port
const port = process.env.PORT || 3100;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
