const User = require("../Models/user.js");
const { setUser } = require("../service/auth.js");

async function handleUserSignUp(req, res) {
  const { username, email, password } = req.body;
  try {
    await User.create({
      username,
      email,
      password,
    });
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).json({ message: "error  creating user", error });
  }
}



async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({resStatus:false, myError: "Invalid username or password" });
    } else {
      const token = setUser(user);
      res.cookie('uid', token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
       });
      return res.json({ resStatus: true, myToken: token , user: {id: user._id, name: user.username, email: user.email}});
    }
  } catch (error) {
    return res.status(500).json({ resStatus: false, myError: error });
  }
}


module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
