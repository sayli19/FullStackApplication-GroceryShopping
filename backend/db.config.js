const mysql = require("mysql");
module.exports = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "sayli",
  password: "123456",
  database: "grocery",
});
