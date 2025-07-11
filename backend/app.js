require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const axios = require("axios");
const PORT = process.env.PORT || 5000;
const app = express();


const API_URL = "https://v6.exchangerate-api.com/v6";
const API_KEY = process.env.API_KEY;
//! Rate Limiter 15 minutes - 100 requests
const apiLimiter = rateLimit({
    windowMs: 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

//! Middlewares
app.use(express.json());
app.use(apiLimiter);


//! Conversion Routes
app.post('/api/convert', async (req, res) => {
    const {from, to, amount} = req.body;
    console.log({ from, to, amount });
    try {
        
    } catch (error) {
        
    }
})

//! Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
