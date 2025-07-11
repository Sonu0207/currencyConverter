require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const axios = require("axios");
const PORT = process.env.PORT || 5000;
const app = express();


const API_URL = 'https://v6.exchangerate-api.com/v6';
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
    try {
        const { from, to, amount } = req.body;
        console.log({from, to, amount})
        const url = `${API_URL}/${API_KEY}/pair/${from}/${to}/${amount}`;
        console.log(`Calling URL: ${url}`); // ✅ Logs full API URL
        const response = await axios.get(url);
        res.json(response.data);     
    } catch (error) {}
})

//! Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
