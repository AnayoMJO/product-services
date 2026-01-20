import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender is required"],
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Receiver is required"],
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Property is required"],
    },
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"] },
    phone: { type: String },
    body: { type: String },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
