require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const couponRoutes = require('./routes/couponRoutes');

const app = express();

//const cors = require('cors');

app.use(cors({
    origin: "https://assignment-frontend-91wn.onrender.com", // ✅ Allow your frontend
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());

//  Connect to MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing in .env file");
    process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(" MongoDB Atlas Connected"))
    .catch(err => console.log(" MongoDB Connection Error:", err));

app.use('/api/coupons', couponRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
