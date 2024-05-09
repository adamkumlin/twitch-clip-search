import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: String,
    dateCreated: Date,
})

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;

export default UserModel;