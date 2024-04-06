const { getUser } = require('../service/auth.js');

async function restrictToLoogedInUserOnly(req, res, next){
    const userUid = req.body.cookie;
    
    if(!userUid){
        return res.json({resStatus: false, message: 'Cookie is not available'})
    }


    const user = getUser(userUid);

    if(!user || !user.resStatus) {
        return res.json({resStatus: false, message: 'No Such User Found!'});
    }

    req.user = user.user;

    next();
}


async function checkAuth(req, res, next){

    const userUid = req.body.cookie;


    const user = getUser(userUid);

    req.user = user.user;

    next();
}

module.exports = {
    restrictToLoogedInUserOnly, 
    checkAuth
}