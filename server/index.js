"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var mongoose_1 = require("mongoose");
var user_1 = require("./models/user");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(3001, function () {
    console.log("server running.");
});
var dbUri = "mongodb+srv://skolaadamkumlin99:c7WjstJBVT607Akm@cluster.g80btjr.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster";
mongoose_1.default.connect(dbUri);
app.get("/getUsers", function (request, response) {
    user_1.default.find()
        .then(function (users) { return response.json(); })
        .catch(function (err) { return response.json(err); });
});
