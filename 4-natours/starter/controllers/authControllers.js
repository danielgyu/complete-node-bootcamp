const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
    return jwt.sign(
        {
            id: id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES,
        }
    );
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser,
        },
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('enter required fields', 400));
    }

    const user = await User.findOne({
        email: email,
    }).select('+password');

    if (!user || !(await user.checkPassword(password, user.password))) {
        return next(new AppError('incorrect id or pw', 401));
    }

    const token = signToken(user._id);
    res.status(200).json({
        status: 'succes',
        token,
    });
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('login first', 401));
    }

    // verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // check if user exist
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
        return next(new AppError('user of this token no longer exist', 401));
    }

    if (freshUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('password changed, login', 401));
    }

    // check if user changed password
    req.user = freshUser;
    next();
});
