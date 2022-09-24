import mongoose from "mongoose";

const authSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  id: { type: String },
});

const AuthMessage = mongoose.model("AuthMessage", authSchema);

export default AuthMessage;
