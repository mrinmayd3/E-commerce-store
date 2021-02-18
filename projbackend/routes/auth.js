const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is not valid").isEmail(),
    check("password", "password should be at least 5 char").isLength({
      min: 5,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email or password is not valid").isEmail(),
    check("password", "email or password is not valid").isLength({ min: 5 }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
