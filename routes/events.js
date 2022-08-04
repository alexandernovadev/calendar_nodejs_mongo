/**
 * Events Routes
 * host + /api/events
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const {
  getEvents,
  saveEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

const fieldValidator = require("../middlewares/fields_validate");
const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

// De aqui pa bajo use valuteJWT WOWW no me la sabia
router.use(validateJWT);

router.get("/", getEvents);
router.post(
  "/",
  [
    check("title", "This field is required").not().isEmpty(),
    check("start", "Invalid start date").custom(isDate),
    check("end", "Invalid end date").custom(isDate),
    fieldValidator,
  ],
  saveEvent
);

router.put(
  "/:id",
  [
    check("title", "This field is required").not().isEmpty(),
    check("start", "Invalid start date").custom(isDate),
    check("end", "Invalid end date").custom(isDate),
    fieldValidator,
  ],
  updateEvent
);

router.delete("/:id", deleteEvent);

module.exports = router;
