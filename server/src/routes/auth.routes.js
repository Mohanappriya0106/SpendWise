// import express from "express";
// import { register, login } from "../controllers/auth.controller.js";
// import validate from "../middleware/validate.middleware.js";
// import {
//   registerSchema,
//   loginSchema
// } from "../validations/auth.validation.js";

// const router = express.Router();

// router.post("/register", validate(registerSchema), register);
// router.post("/login", validate(loginSchema), login);

// export default router;
import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { googleAuth } from "../controllers/googleAuth.controller.js";
import validate from "../middleware/validate.middleware.js";
import {
  registerSchema,
  loginSchema
} from "../validations/auth.validation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

// ✅ NEW: Google OAuth
router.post("/google", googleAuth);

export default router;

