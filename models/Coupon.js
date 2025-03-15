const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    assigned: { type: Boolean, default: false },
    expiryDate: { type: Date }  // Added expiry date
});

module.exports = mongoose.model('Coupon', CouponSchema);
