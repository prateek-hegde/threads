const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//password hash
const encryptPass = async pass => {
  try {
    let salt = await bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(pass, salt);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

//generate access token
const generateToken = async user => {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);

  let token = await jwt.sign(
    {
      _id: user._id,
      username: user.username,
      exp: parseInt(expiry.getTime() / 1000)
    },
    process.env.SECRETE_KEY
  );
  return token;
};

//register a user
module.exports.register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const hash = await encryptPass(password);

  const userObj = {
    username: username,
    password: hash
  };

  try {
    let user = await User.create(userObj);
    if (user) {
      return res.status(201).send({
        success: true,
        message: "User registered"
      });
    }
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.send({
        success: false,
        message: "Username is already in use!"
      });
    }

    return res.send({
      success: false,
      message: "something went wrong"
    });
  }
};

//login a user
module.exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    var user = await User.findOne({ username: username });
    if (!user) {
      return res.send({
        success: false,
        message: "user not found"
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "something went wrong"
    });
  }

  let hash = user.password;
  let result = await bcrypt.compare(password, hash);

  if (result === false) {
    return res.send({
      success: false,
      message: "user not found"
    });
  }

  let token = await generateToken(user);
  return res.status(200).send({
    success: true,
    token: token,
    username: user.username
  });
};
