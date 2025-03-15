const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Coupon = require('../models/Coupon');

dotenv.config();

mongoose.connect('mongodb+srv://msgulshan:Gulshan123%40@cluster0.m6qzv.mongodb.net/round-robin-coupons?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Connection Error:", err));

const addCoupons = async () => {
    const coupons = [
        { code: "DISCOUNT10", assigned: false },
        { code: "DISCOUNT20", assigned: false },
        { code: "DISCOUNT30", assigned: false }
    ];

    await Coupon.insertMany(coupons);
    console.log("Coupons added!");
    mongoose.disconnect();
};

addCoupons();
