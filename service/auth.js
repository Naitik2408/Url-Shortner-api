const jwt = require('jsonwebtoken')
const secret = 'naitik$125@'

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, secret);
}


function getUser(token) {
    if (!token) {
      return { resStatus: false, message: 'Token is missing' };
    }
  
    try {
      const user = jwt.verify(token, secret)
      return {resStatus:true , message: 'user is available', user: user};
      // return jwt.verify(token, secret);
    } catch (error) {
      return { resStatus: false, message: 'Invalid or unexpected token' };
    }
  }
  


module.exports = {
    setUser, 
    getUser
}