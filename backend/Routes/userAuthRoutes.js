import express from "express"
import { loginUser,registerUser } from "../Controllers/AuthController/userAuthController.js"

const router = express.Router()

router.post("/user/login", loginUser)
router.post("/user/register", registerUser)

export default router;