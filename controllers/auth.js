const User = require("../models/User");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate if exist
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        message: "User already exist",
      });
    }

    user = new User(req.body);
    await user.save();

    res.status(201).json({
      ok: true,
      message: "User created",
      name: user.name,
      uid: user.id,
    });
  } catch (error) {
    console.log("Error Created user: ", error);
    res.status(500).json({
      ok: false,
      message: "User error, contact the fucks devs",
    });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  res.status(200).json({
    email,
    password,
    msg: "Login Succesuful ",
  });
};

const renewToken = (req, res) => {
  res.json({
    msg: "renewtoken",
  });
};

module.exports = {
  createUser,
  login,
  renewToken,
};
