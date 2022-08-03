const { validationResult } = require("express-validator");

const fieldValidator = (req, res, next) => {
    // Handle Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        ok: false,
        errors: errors.mapped(),
      });
    }

    next()
};
module.exports = fieldValidator
