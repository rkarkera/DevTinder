const { userAuth } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const Request = require("../models/requests");
const User = require("../models/users");

const populateData = "firstName lastName photoUrl age gender about skills";

router.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const requests = await Request.find({
      toUserId: loggedUser._id,
      status: "interested",
    }).populate("fromUserId", populateData);

    if (requests.length == 0) {
      res.status(404).json({ message: "You have no request" });
      return;
    }

    res.status(200).json({ message: "Your requests", requests });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const user = req.user;

    const data = await Request.find({
      $or: [
        { fromUserId: user._id, status: "accepted" },
        { toUserId: user._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", populateData)
      .populate("toUserId", populateData);

    if (data.length == 0) {
      return res.status(400).json({ message: "No connection found" });
    }

    const modData = data.map((el) =>
      el.fromUserId._id.toString() === user._id.toString()
        ? el.toUserId
        : el.fromUserId,
    );

    res.status(200).json(modData);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    // const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    limit = limit > 50 ? 50 : limit;

    // const skip = (page - 1) * limit;

    const connections = await Request.find({
      $or: [{ fromUserId: loggedUser._id }, { toUserId: loggedUser._id }],
    });

    const hideUsers = new Set();

    connections.forEach((el) => {
      hideUsers.add(el.fromUserId.toString());
      hideUsers.add(el.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsers) } },
        { _id: { $ne: loggedUser._id } },
      ],
    })
      .select(populateData)
      // .skip(skip)
      .limit(limit);

    res.status(200).json({ users, count: users.length });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
module.exports = router;
