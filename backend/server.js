const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const port = process.env.PORT || 5000;
const pool = require("./db.config.js");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// app.use("/static", express.static("./static/"));

// const io = require("socket.io")(3000, {
//   cors: {
//     origin: "*",
//   },
// });

// const users = {};

// io.on("connection", (socket) => {
//   socket.on("new-user", (name) => {
//     users[socket.id] = name;
//     socket.broadcast.emit("user-connected", name);
//   });
//   socket.on("send-chat-message", (message) => {
//     socket.broadcast.emit("chat-message", {
//       message: message,
//       name: users[socket.id],
//     });
//   });
//   socket.on("disconnect", () => {
//     socket.broadcast.emit("user-disconnected", users[socket.id]);
//     delete users[socket.id];
//   });
// });

// const users = [];
// let pass_word = "";

// app.get("/users", (req, res) => {
//   res.json(users);
// });

// app.post("/userstest", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const user = { name: req.body.name, password: hashedPassword };
//     users.push(user);
//     res.status(201).send();
//   } catch {
//     res.status(500).send();
//   }
// });

// app.post("/users/logintest", async (req, res) => {
//   const user = users.find((user) => user.name === req.body.name);
//   console.log(user);
//   console.log(req.body.password);
//   if (user == null) {
//     return res.status(400).send("Cannot find user");
//   }
//   try {
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       res.send("Success");
//     } else {
//       res.send("Not Allowed");
//     }
//   } catch {
//     res.status(500).send();
//   }
// });

// app.get("/getUsers", (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query("SELECT * from user_login", (err, rows) => {
//       connection.release(); // return the connection to pool
//       if (!err) {
//         res.send(rows);
//         console.log("The data from beer table are: \n", rows);
//       } else {
//         console.log(err);
//       }
//     });
//   });
// });

// app.post("/users", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     console.log(hashedPassword);
//     const user = { user_name: req.body.name, password: hashedPassword };
//     console.log(user);
//     pool.getConnection((err, connection) => {
//       if (err) throw err;
//       connection.query("INSERT INTO user_login SET ?", user, (err, rows) => {
//         connection.release(); // return the connection to pool
//         if (!err) {
//           res.send(`added.`);
//         } else {
//           console.log(err);
//         }
//       });
//     });
//     res.status(201).send();
//   } catch {
//     res.status(500).send();
//   }
// });

// app.post("/users/login", (req, res) => {
//   userName = req.body.name;
//   pass_word = "";
//   pool.getConnection((err, connection) => {
//     passWord = req.body.password;
//     query =
//       "SELECT password from user_login WHERE user_name ='" + userName + "'";
//     console.log(query);

//     connection.query(query, function (err, rows) {
//       connection.release(); // return the connection to pool
//       if (rows) {
//         pass_word = rows[0].password;
//         console.log(pass_word);
//         console.log(passWord);

//         if (bcrypt.compare(passWord, pass_word)) {
//           res.send("Success");
//         } else {
//           res.send("Not Allowed");
//         }
//       } else {
//         console.log(err);
//       }
//     });
//   });
//   passWord = req.body.password;

//   // pass = await bcrypt.hash(passWord, 10);
//   // console.log("pass");
//   // console.log(pass);
//   // console.log("passWord");
//   // console.log(passWord);

//   // console.log("pass_word");
//   // console.log(pass_word);
// });

require("./routes.js")(app);

// Listen on enviroment port or 5000
// app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;
