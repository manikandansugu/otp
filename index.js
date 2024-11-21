const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

// CORS is a security mechanism that allows web browsers to make cross-origin HTTP requests safely. This middleware adds appropriate CORS headers to the HTTP responses
app.use(cors());

// CORS preflight request handler for all routes
app.options("*", cors());

app.get("/api/msg", (req, res) => {
  res.status(200).json({ message: " hello robot !" });
});

app.get("/api/sent-otp", async (req, res) => {
  try {
    const { phoneNumber } = req.query;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const response = await axios.get(
      `https://www.fast2sms.com/dev/bulkV2?authorization=80ZEaiC9dxbSf5XAUcqzw6sOQenkRyjp2tMV4JDYohur3FmlWBln1CxzckVGA6DOI3ZJf4sXLNbHh5tW&route=otp&variables_values=${otp}&flash=0&numbers=${phoneNumber}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response?.data?.return) {
      res.status(200).json({ success: true, message: "otp sent successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 7000;
app.listen(port, "0.0.0.0", () =>
  console.log(`Server running on port ${port}`)
);
