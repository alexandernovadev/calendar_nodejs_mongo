
const createUser = (req, res) => {
  const { name, email, password } = req.body;

  res.status(201).json({
    email,
    name,
    password,
    msg: "create",
  });
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
