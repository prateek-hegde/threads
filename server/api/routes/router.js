const express = require("express");
const router = express();

const auth = require("../auth/user_auth");
const thread_controller = require("../controllers/thread_controller");
const token_validator = require("../middleware/token_validator");
const body_validator = require("../middleware/body_validator");

const user_schema = require("../schemas/user_schema");
const thread_schema = require("../schemas/thread_schema");

//user auth
router.post("/register", body_validator(user_schema), auth.register);
router.post("/login", body_validator(user_schema), auth.login);

//notes
router.post(
  "/thread/create",
  body_validator(thread_schema),
  token_validator,
  thread_controller.createThread
);

router.get("/thread/all", token_validator, thread_controller.listThreads);

router.put(
  "/thread/update",
  body_validator(thread_schema),
  token_validator,
  thread_controller.editThread
);

router.delete(
  "/thread/delete",
  token_validator,
  thread_controller.deleteThread
);
module.exports = router;
