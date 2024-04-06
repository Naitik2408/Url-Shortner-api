const express = require("express");
const {handleGenerateNewShortURL, handleGetAnalytics, hadleGetAllUrl} = require("../Controller/url.js")
const { checkAuth } = require('../middleware/auth.js')

const router = express.Router()

router.post("/", handleGenerateNewShortURL);

router.get('/analy/:shortId', handleGetAnalytics);

router.post('/analy',checkAuth, hadleGetAllUrl);
// router.get('/analy', hadleGetAllUrl);

module.exports = router;