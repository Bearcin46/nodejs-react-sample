import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import * as dotenv from "dotenv";
dotenv.config();
const server = express();

const SERVERPORT = 1218;
server.use(cors());
server.use(express.json());
server.get("/", (req, res) => {
  res.send("connected successfully");
});
const connection: string = process.env.MONGODB_URL || "";
mongoose.connect(connection).then(() => console.log("conected to db"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

server.post("/upload", upload.single("image"), (req, res) => {
  const { fullName, dob, age } = req.body;
  const imageFile = req.file;
  console.log(req.body);
  console.log(imageFile);
  res.send("completed");
});
server.listen(SERVERPORT, () => {
  console.log("server is running i http://localhost:1212");
});
