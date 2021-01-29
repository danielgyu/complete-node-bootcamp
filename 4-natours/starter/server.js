const mongoose = require('mongoose');
const dotenv = require('dotenv');

// env var
dotenv.config({ path: './.env' });

// read in app after env
const app = require('./app.js');

// configure mongo db
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

// bind server to port
const port = process.env.PORT || 3100;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
