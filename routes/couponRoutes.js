const express = require('express');
const Coupon = require('../models/Coupon');
const Claim = require('../models/Claim');
const abusePrevention = require('../middleware/abusePrevention');

const router = express.Router();

// Claim a coupon
router.get('/claim', abusePrevention, async (req, res) => {
    const availableCoupon = await Coupon.findOne({ assigned: false });

    if (!availableCoupon) {
        return res.status(400).json({ message: "⚠️ No coupons available." });
    }

    // Assign coupon
    availableCoupon.assigned = true;
    availableCoupon.claimedAt = new Date();
    await availableCoupon.save();

    // Save claim record
    await Claim.create({ ip: req.ip, coupon: availableCoupon.code, claimedAt: new Date() });

    // Set cookie
    res.cookie('claimedCoupon', 'true', { maxAge: 60 * 60 * 1000, httpOnly: true });

    res.json({ message: `🎉 Coupon ${availableCoupon.code} claimed successfully!` });
});

//  Fetch coupon claim history
router.get('/history', async (req, res) => {
    const claims = await Claim.find({ ip: req.ip }).sort({ claimedAt: -1 });
    res.json(claims);
});

module.exports = router;
