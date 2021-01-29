const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/errorControllers');

// initiate app
const app = express();

// morgan middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// serve static files
app.use(express.static(`${__dirname}/public`));

// custom middlewares
app.use(express.json());
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours/", postTour);
// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", patchTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// handle unknown routes
app.all('*', (req, res, next) => {
    next(new AppError('no page', 404));
});

app.use(globalErrorController);

module.exports = app;
