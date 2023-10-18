//#region imports

const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const db = require("./config/db.js");

require("dotenv").config();
const passport = require("passport");

const initializePassport = require("./config/passportSetup.js");

//#endregion

//#region config

//#endregion
const port = process.env.PORT || 5000;
const app = express();
initializePassport(passport);
db();
app.use(compression());
app.use(helmet());

const corsOptions = {
  origin: ["http://localhost:3000", "https://localhost:3000", "localhost:3000"],
  methods: "GET,POST,DELETE,PUT",
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.use(passport.initialize()); // Used to initialize passport

//delete connect-mongodb-session express-session mysql2

const productRouter = require("./routes/product.js");
const authRouter = require("./routes/auth.js");
const userRouter = require("./routes/user.js");
app.use("/", productRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  return res.send("Hello world");
});

const server = http.createServer(app);

server.listen(port, () => console.log(`Server started on port ${port}`));
