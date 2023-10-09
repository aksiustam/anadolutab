//#region imports
const path = require("path");
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
const session = require("express-session");
const initializePassport = require("./config/passportSetup.js");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions", // Oturumların saklanacağı koleksiyon adı
  expires: 1000 * 60 * 60 * 24 * 7, // Oturumların ne kadar süreyle saklanacağını ayarlayın (örneğin, 1 hafta)
});

//#endregion

//#region config

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

//cookieSession config
app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // Oturum çerezinin ne kadar süreyle geçerli olacağını ayarlayın (örneğin, 1 hafta)
    },
  })
);

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

//#endregion

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
