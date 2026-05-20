const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  },
);

requestSchema.index({fromUserId:1, toUserId:1});

requestSchema.pre("save", function(next) {

  const currentRequest = this;
   if(currentRequest.fromUserId.equals(currentRequest.toUserId)) {
    throw new Error("Cant send request to yourself");
   }

   next();
})

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
