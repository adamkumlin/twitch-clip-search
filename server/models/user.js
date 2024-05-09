"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.default.Schema({
    email: String,
    dateCreated: Date,
});
var UserModel = mongoose_1.default.model("users", UserSchema);
module.exports = UserModel;
exports.default = UserModel;
