import { Router } from "express";
import {  buySubscription, cancelSubscription, getRazorPayApiKey } from "../controllers/payment.controller.js";
import {  isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router();

router.route('/razorpay-key')
    .get(isLoggedIn, getRazorPayApiKey)

router.route('/subscribe')
    .post(isLoggedIn, buySubscription)


router.route('/unsubscribe')
    .post(isLoggedIn, cancelSubscription)



export default router;