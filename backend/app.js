require("dotenv").config();
const express = require("express");
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const axios = require("axios");
const PORT = process.env.PORT || 5000;
const app = express();


const API_URL = 'https://v6.exchangerate-api.com/v6';
const { API_KEY } = process.env;
//! Rate Limiter 5 minutes - 100 requests
const apiLimiter = rateLimit({
    windowMs: 5*60*1000, // 5 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

//! CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://currencyconverter-1-hmbx.onrender.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  }
};

app.use(cors(corsOptions));


//! Middlewares
app.use(express.json());
app.use(apiLimiter);


//! Conversion Routes
app.post('/api/convert', async (req, res) => {
    try {
        const { from, to, amount } = req.body;
        console.log({from, to, amount})
        const url = `${API_URL}/${API_KEY}/pair/${from}/${to}/${amount}`;
        const response = await axios.get(url);
        if ( response.data && response.data.result === 'success'){
            res.json({
                base : response.data.base_code,
                target : response.data.target_code,
                rate : response.data.conversion_rate,
                convertedAmount : response.data.conversion_result,
                Asof: new Date(response.data.time_last_update_utc).toString().replace(/:\d{2}:\d{2}/, '')

            }
            );}
            else{
                res.json({message: 'Something went wrong', details: response.data})
            }
    } catch (error) {
        res.json({message: 'Something went wrong', details: error.message})
    }
})


//! Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
