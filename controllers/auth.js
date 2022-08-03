const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate if exist
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        message: "User already in use",
      });
    }

    user = new User(req.body);

    // Encrypt
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      message: "User created",
      name: user.name,
      uid: user.id,
      token,
    });
  } catch (error) {
    console.log("Error Created user: ", error);
    res.status(500).json({
      ok: false,
      message: "User error, contact the fucks devs",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "The user no exist",
      });
    }

    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Incorrect password ",
      });
    }

    // Generar JWT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error Login tell to devs",
    });
  }
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
