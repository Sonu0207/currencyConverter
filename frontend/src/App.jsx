import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    amount: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const currencies = ["AED",	"AFN",	"ALL",	"AMD",	"ANG",	"AOA",	"ARS",	"AUD",	"AWG",	"AZN",	"BAM",	"BBD",	"BDT",	"BGN",	"BHD",	"BIF",	"BMD",	"BND",	"BOB",	"BRL",	"BSD",	"BTN",	"BWP",	"BYN",	"BZD",	"CAD",	"CDF",	"CHF",	"CLP",	"CNY",	"COP",	"CRC",	"CUP",	"CVE",	"CZK",	"DJF",	"DKK",	"DOP",	"DZD",	"EGP",	"ERN",	"ETB",	"EUR",	"FJD",	"FKP",	"FOK",	"GBP",	"GEL",	"GGP",	"GHS",	"GIP",	"GMD",	"GNF",	"GTQ",	"GYD",	"HKD",	"HNL",	"HRK",	"HTG",	"HUF",	"IDR",	"ILS",	"IMP",	"INR",	"IQD",	"IRR",	"ISK",	"JEP",	"JMD",	"JOD",	"JPY",	"KES",	"KGS",	"KHR",	"KID",	"KMF",	"KRW",	"KWD",	"KYD",	"KZT",	"LAK",	"LBP",	"LKR",	"LRD",	"LSL",	"LYD",	"MAD",	"MDL",	"MGA",	"MKD",	"MMK",	"MNT",	"MOP",	"MRU",	"MUR",	"MVR",	"MWK",	"MXN",	"MYR",	"MZN",	"NAD",	"NGN",	"NIO",	"NOK",	"NPR",	"NZD",	"OMR",	"PAB",	"PEN",	"PGK",	"PHP",	"PKR",	"PLN",	"PYG",	"QAR",	"RON",	"RSD",	"RUB",	"RWF",	"SAR",	"SBD",	"SCR",	"SDG",	"SEK",	"SGD",	"SHP",	"SLE",	"SOS",	"SRD",	"SSP",	"STN",	"SYP",	"SZL",	"THB",	"TJS",	"TMT",	"TND",	"TOP",	"TRY",	"TTD",	"TVD",	"TWD",	"TZS",	"UAH",	"UGX",	"USD",	"UYU",	"UZS",	"VES",	"VND",	"VUV",	"WST",	"XAF",	"XCD",	"XDR",	"XOF",	"XPF",	"YER",	"ZAR",	"ZMW",	"ZWL"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const { from, to, amount } = formData;

    if (!from || !to || !amount) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post("https://currencyconverter-70mg.onrender.com/api/convert", {
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        amount: parseFloat(amount),
      });

      if (res.data && res.data.convertedAmount) {
        setResult(res.data);
      } else {
        setError(res.data.message || "Conversion failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error occurred.");
    }
  };

  return (
    <div className="app-container">
      <header className="hero">
        <h1>Live Conversion Rate</h1>
        <p className="subtitle">Fast & Reliable Currency Conversion</p>
      </header>

      <main className="converter-section">
        <form onSubmit={handleSubmit} className="converter-form">
          <div className="input-group">
            <label htmlFor="from">From Currency</label>
            <select
              id="from"
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select currency</option>
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="to">To Currency</label>
            <select
              id="to"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select currency</option>
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              name="amount"
              type="number"
              min="0"
              step="any"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              className="input"
            />
          </div>

          <button type="submit" className="submit-btn">
            Convert
          </button>
        </form>

        {result && (
          <div className="result-box">
            <p>
              <strong>Conversion Rate:</strong> {result.rate}
            </p>
            <p>
              <strong>Converted Amount:</strong> {result.convertedAmount} {result.target}
            </p>
            <p>
              <strong>Updated on:</strong> {result.Asof}
            </p>
          </div>
        )}


        {error && <p className="error-msg">{error}</p>}
      </main>


    </div>
  );
}

export default App;
