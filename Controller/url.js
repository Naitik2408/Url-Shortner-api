const shortid = require("shortid");
const URL = require('../Models/url.js')
const User = require('../Models/user.js')

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid(8);
  await URL.create({
    urlTitle: body.urlTitle,
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id
  });
  return res.json({resStatus: true, message: 'id created sucessfully', id: shortID });
}


async function handleGetAnalytics(req, res){
  const shortId = req.params.shortId;
  const result = await URL.findOne({shortId});
  return res.json({
    totalClick: result.visitHistory.length,
    clickData: result.visitHistory
  })
}


async function hadleGetAllUrl(req, res){
  try {
      // Check if the user is logged in
      if(!req.user){
          return res.status(401).json({resStatus: false, message:"you are not logged in"});
      }
      
      // Find the user in the database
      const user = await User.findOne({_id : req.user._id});
      if (!user) {
          return res.status(404).json({ resStatus: false, message: "User not found" });
      }
      
      const userObj = {
          _id: user._id,
          name: user.username,
          email: user.email
      };
      
      const data = await URL.find({createdBy: req.user._id});
      

      return res.json({resStatus: true, message: 'all url fetched successfully', data: data, user: userObj});
  } catch (error) {
      console.error(error);
      
      return res.status(500).json({ resStatus: false, message: "An error occurred while fetching URLs" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  hadleGetAllUrl
};