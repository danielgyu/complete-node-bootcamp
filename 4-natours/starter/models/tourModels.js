const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'REQUIRED'],
            unique: true,
            trim: true,
            maxlength: [40, 'MAX 40'],
            minlength: [10, 'MIN 10'],
        },
        duration: {
            type: Number,
            required: [true, 'REQUIRED'],
        },
        slug: { type: String },
        maxGroupSize: {
            type: Number,
            required: [true, 'REQUIRED'],
        },
        ratingAverage: {
            type: Number,
            default: 4.0,
            min: [1, 'MIN 1'],
            max: [5, 'MAX 5'],
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        difficulty: {
            type: String,
            required: [true, 'REQUIRED'],
            enum: {
                values: ['easy', 'medium', 'difficult'],
                message: 'option: easy, medium, difficult',
            },
        },
        price: {
            type: Number,
            required: [true, 'REQUIRED'],
        },
        priceDiscount: {
            type: Number,
            validate: {
                validator: function (val) {
                    return val < this.price;
                },
                message: 'price must be higher than discount',
            },
        },
        summary: {
            type: String,
            trim: true,
            required: [true, 'REQUIRED'],
        },
        description: {
            type: String,
            trim: true,
        },
        imageCover: {
            type: String,
            required: [true, 'REQUIRED'],
        },
        images: [String],
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false,
        },
        startDates: [Date],
        secretTour: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// virtual property
tourSchema.virtual('durationInWeeks').get(function () {
    return this.duration / 7;
});

// document middleware
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

tourSchema.post('save', function (doc, next) {
    console.log(doc);
    next();
});

// query middleware
tourSchema.pre('find', function (next) {
    this.find({
        secretTour: { $ne: true },
    });
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
