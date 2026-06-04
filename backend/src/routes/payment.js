const express = require("express");
const { userAuth } = require("../middlewares/auth");
const router = express.Router();
const razorPayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const purchaseType = require("../utils/constants");
const User = require("../models/users");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

router.post("/payment/create", userAuth, async (req, res) => {
  const { type } = req.body;
  const { firstName, lastName, _id } = req.user;
  try {
    const order = await razorPayInstance.orders.create({
      amount: purchaseType[type] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName: "firstName",
        lastName: "lastName",
        packageType: type,
      },
    });

    const payment = new Payment({
      userId: _id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const paymentCreated = await payment.save();
    res
      .status(200)
      .json({ paymentCreated, keyId: process.env.RAZORPAY_API_KEY });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET,
    );

    if(!isWebhookValid) {
      return res.status(400).json({msg:"Webhook signature is invalid"})
    }
    
    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({orderId : paymentDetails.order_id});
    payment.status = paymentDetails.status;
    await payment.save();

    const user = await User.findOne({_id:payment.userId});
    user.isPremium = true;
    user.package = payment.notes.packageType;
    await user.save();
    
    console.log(user);

    res.status(200).json({msg:"Webhook received successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/payment/verify",userAuth,async(req,res) => {
  try {
    const user = req.user;
    const userObj = user.toObject();
         delete userObj.password;
    delete userObj.emailId;

    if(user.isPremium) {
      return res.status(200).json({isPremium:true,userObj});
    }
    return res.status(400).json({isPremium:false});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports = router;
