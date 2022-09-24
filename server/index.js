import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import postRouter from "./routes/posts.js";
import authRouter from "./routes/auth.js";

const app = express();
app.use(express.json({ limit: "50mb", extended: true }));

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/posts", postRouter);
app.use("/auth", authRouter);

const CONNECTION_URL =
  "mongodb+srv://muhammadAmin:muhammadAmin@cluster0.2fwfoga.mongodb.net/?retryWrites=true&w=majority";

const PORT = 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server ${PORT}dan ishga tushdi`))
  )
  .catch((error) => console.log(error));

// mongoose.set("useFindAndModify", false);
