import express, { json } from "express";
import mongoose from "mongoose";
import cookies from "cookie-parser";
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import orderRoute from "./routes/orderRoute.js"
import stripeRoute from "./routes/stripeRoute.js"

dotenv.config();
const app = express();

// app.use(cors({origin:true}))
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(cors())
app.use(cookies())

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended:true}));

//CONNECT TO DB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("Connect to mongo success !");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("Disconnected to mongoDb");
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongoDb");
});
connect();
app.use('/uploads',express.static('uploads'))
app.use(cookies());
// ROUTE
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/checkout", stripeRoute);
let PORT = process.env.PORT
app.listen(PORT || 5000, () => {
  console.log("Backend server is runing!"+ PORT);
});
