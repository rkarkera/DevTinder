const express = require("express");
const { userAuth } = require("../middlewares/auth");
const router = express.Router();
const Request = require("../models/requests");
const User = require("../models/users");

router.post("/request/send/:status/:userId", userAuth, async (req, res) => {
  try {
    const { userId, status } = req.params;
    const fromUserId = req.user.id;
    const toUserId = userId;

    const allowedStatus = ["ignored", "interested"];

    if (!allowedStatus.includes(status)) {
      res.status(400).json({ message: `Invalid status type ${status}` });
      return;
    }

    const validToUser = await User.findById(toUserId);

    console.log(validToUser);


    if (!validToUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const checkValidConnection = await Request.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (checkValidConnection) {
      res.status(400).json({ message: "Connection request already exists" });
      return;
    }

    const connectionRequest = new Request({ fromUserId, toUserId, status });
    const data = await connectionRequest.save();

    res.status(200).json({ message: status == "interested" ? "Connection sent successfully" : "Connection ignored" , data });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong",err:err.message });
  }
});

router.post("/request/review/:status/:requestId", userAuth, async(req, res) => {
  try {
      const loggedInUser = req.user;
    const {status,requestId} = req.params;

    const allowedStatus = ["accepted","rejected"];

    if(!allowedStatus.includes(status)) {
        return res.status(400).json({message:"Incorrect status entered by user"});
    }

    const connectionRequest = await Request.findOne({
      _id:requestId,
      status:"interested",
      toUserId:loggedInUser._id
    })

    if(!connectionRequest) {
      return res.status(404).json({message:"Request not found"});
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.status(200).json({message:"Connection request " + status,data});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong",err:err.message });
  }

})

module.exports = router;
