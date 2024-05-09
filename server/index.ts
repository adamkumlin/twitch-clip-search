import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserModel from "./models/user";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("server running.")
})

const dbUri = "mongodb+srv://skolaadamkumlin99:c7WjstJBVT607Akm@cluster.g80btjr.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster";
mongoose.connect(dbUri);

app.get("/getUsers", (request, response) => {
  UserModel.find()
  .then(users => response.json())
  .catch(err => response.json(err));
})