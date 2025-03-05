const http = require("http");
const { hello, greetings } = require("./helloWorld");
const moment = require("moment");
const express = require("express");
const morgan = require("morgan");
// const errorhandler = require("errorhandler");
const app = express();
const routers = require("./routers");
const path = require("path");
const cors = require("cors"); //Menangani CORS Middleware

//Middleware
const log = (req, res, next) => {
  console.log(
    moment().format("h:mm:ss a") + " " + req.originalUrl + " " + req.ip
  );
  next();
};

app.use(morgan("tiny"));
// app.use(errorhandler);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); //menangani statis file middleware//akses foto tidak perlu router
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "PUT"], //izinkan hanya method GET//Spesifikan//kalau dizinkan dari server baru di browser bisa di akses
  })
); //CORS middleware
//Preflight Request ; PUT, DELETE, REQUEST client request ke browser - dan browser akan kirim OPTION ke server
//Simple Request ; GET, POST

//Routing
app.use(routers);

//Middleware untuk 404
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
