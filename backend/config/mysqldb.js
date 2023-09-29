var mysql = require("mysql2");

const pool = mysql.createPool({
  host: "213.238.183.214",
  user: "httpdlyd_anadolutabuser",
  password: "*9r6_[_6syDn",
  database: "httpdlyd_anadolutabdb",
});

const result = pool.query("SELECT * from user");
console.log(result);
