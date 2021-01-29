const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// name, email photo, password, passwordConfirm

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'REQUIRED'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'REQUIRED'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'enter again'],
    },
    photo: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'REQUIRED'],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'REQUIRED'],
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: 'must match password',
        },
    },
    passwordChangedAt: {
        type: Date,
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.checkPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
