const Claim = require('../models/Claim');

module.exports = async (req, res, next) => {
    const userIP = req.ip;
    const userCookie = req.cookies.claimedCoupon;

    //  Check IP in database
    const lastClaim = await Claim.findOne({ ip: userIP }).sort({ claimedAt: -1 });

    if (lastClaim) {
        const timeElapsed = (Date.now() - lastClaim.claimedAt) / 1000 / 60; // Minutes
        if (timeElapsed < 60) {
            return res.status(429).json({ message: `⏳ Wait ${60 - timeElapsed.toFixed(0)} min before claiming again.` });
        }
    }

    // Check cookie
    if (userCookie) {
        return res.status(429).json({ message: "⏳ You already claimed a coupon in this session." });
    }

    next();
};
