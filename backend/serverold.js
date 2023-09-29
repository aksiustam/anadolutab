const path = require("path");
const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const db = require("./config/db.js");
const productRouter = require("./routes/product.js");

require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

db();
app.use(compression());
app.use(helmet());
app.use(cors);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser);

app.use("/", productRouter);
app.get("/", (req, res) => {
  return res.send("Hello world");
});

const server = http.createServer(app);

server.listen(port, () => console.log(`Server started on port ${port}`));
