const express = require("express");
const moment = require("moment");
const morgan = require("morgan");
// const errorhandler = require("errorhandler");
const { users } = require("./users");

const app = express();

//Middleware Log
const log = (req, res, next) => {
  console.log(
    moment().format("MMMM Do YYYY, h:mm:ss a") +
      " " +
      req.ip +
      " " +
      req.originalUrl
  );
  next(); //fungsi
};

// Middleware
app.use(morgan("tiny"));
// app.use(errorhandler);

// untuk list data users
app.get("/users", (req, res) => {
  res.status(200).json({
    status: "success",
    data: users,
  });
});

// Route untuk mendapatkan data user berdasarkan nama (case-insensitive)
app.get("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const user = users.find((user) => user.name.toLowerCase() === name);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "Data users tidak ditemukan" });
  }
});

//Penangan Routing 404
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

// Untuk menangani Error
app.use((err, req, res, next) => {
  console.error(err); // Log error ke console
  res.status(500).json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
});

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
