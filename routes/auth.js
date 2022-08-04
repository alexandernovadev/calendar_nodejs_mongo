/**
 * User Routes
 * host + /api/auth
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, login, renewToken } = require("../controllers/auth");
const fieldValidator = require("../middlewares/fields_validate");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
  "/new",
  [
    check("name", "El nombre es oblitario").not().isEmpty(),
    check("email", "El email no es valido ").isEmail(),
    check("password", "El password should has 5 letters ").isLength({ min: 5 }),
    fieldValidator
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "El email no es valido ").isEmail(),
    check("password", "El password should has 5 letters ").isLength({ min: 5 }),
    fieldValidator
  ],
  login
);

router.get("/renew", validateJWT,renewToken);

module.exports = router;
