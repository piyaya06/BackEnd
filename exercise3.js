// //EXERCISE 3

// const express = require("express");
// const moment = require("moment");
// const { users } = require("./users");

// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.status(200).send("This is the home page");
// });

// app.get("/about", (req, res) => {
//   res.status(200).json({
//     status: "success",
//     message: "Response Success",
//     description: "Exercise #03",
//     date: moment().format(),
//   });
// });

// app.get("/users", (req, res) => {
//   res.status(200).json(users);
// });

// // app.get((req, res) => {
// //   res.status(404).json({
// //     status: "not found",
// //     message: "Route tidak ditemukan",
// //     date: moment().format(),
// //   });
// // });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
