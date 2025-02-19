const express = require("express");
const moment = require("moment");
const morgan = require("morgan");
const errorhandler = require("errorhandler");
const users = require("./users");

const app = express();

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
//app.use(errorhandler);

// untuk mendapatkan list data users
app.get("/users", (req, res) => {
  res.status(200).json({
    status: "success",
    data: users,
  });
});

// 1. Menggunakan params
app.get("users/:name", (req, res) => res.send(`Name : ${req.params.name}`));

// Routing 404
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

// Error
app.use((err, req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
});

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
