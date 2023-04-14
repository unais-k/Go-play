import express from "express";
import { otpSend, otpVerify, userLogin, userRegister } from "../../Controller/Client/AuthController.js";
import { CityListResApi, GroundListResApi } from "../../Controller/Client/ClientController.js";
const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);
router.post("/otp-send", otpSend);
router.post("/otp-verify", otpVerify);
router.get("/city-list", CityListResApi);
router.get("/ground-list", GroundListResApi);

export default router;
