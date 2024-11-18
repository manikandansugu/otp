const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.get("/app/msg", (req, res) => {
  res.status(200).json({ message: " hello robot !" });
});

app.get("/api/sent-otp", async (req, res) => {
  try {
    const { phoneNumber } = req.query;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization:
          "80ZEaiC9dxbSf5XAUcqzw6sOQenkRyjp2tMV4JDYohur3FmlWBln1CxzckVGA6DOI3ZJf4sXLNbHh5tW",
        variables_values: otp,
        route: "otp",
        numbers: phoneNumber,
      },
      headers: {
        "cache-control": "no-cache",
      },
    });
    if (response) {
      res.status(200).json({ success: true, message: "otp sent successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(7000, () => console.log("port running on 7000"));
