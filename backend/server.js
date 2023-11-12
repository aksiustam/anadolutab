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

const port = process.env.PORT || 5000;
const app = express();
initializePassport(passport);
db();
app.use(compression());
app.use(helmet());
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.use(passport.initialize()); // Used to initialize passport

const productRouter = require("./routes/product.js");
const authRouter = require("./routes/auth.js");
const userRouter = require("./routes/user.js");
const adminRouter = require("./routes/admin.js");
app.use("/", productRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.get("/", (req, res) => {
  const responseMessage = "Hello world\n"; // "\n" yeni satır ekler
  res.send(responseMessage);
});

const server = http.createServer(app);

server.listen(port, () => console.log(`Server started on port ${port}`));
