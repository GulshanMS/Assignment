const mongoose = require('mongoose');

const ClaimSchema = new mongoose.Schema({
    ip: { type: String, required: true },
    coupon: { type: String, required: true },
    claimedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Claim', ClaimSchema);
