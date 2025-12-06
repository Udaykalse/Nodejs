const express = require("express");

const {
  handleGenerateNewShortURL,
  handleAnalyticsOfURL,
} = require("../controllers/url.js");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleAnalyticsOfURL);

module.exports = router;
