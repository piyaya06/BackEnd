const express = require("express");
const routers = express.Router(); //tujuannya agar jika kita akan tambah router nanti akan masuk ke file router
const path = require("path");

//ROUTING
// //routing download (cara pendek)
// routers.get("/download", (req, res) => {
//   const filename = "logo.png";
//   res.sendFile(__dirname + "/download/" + filename); //kalau lebih dari 1 foto tidak perlu /download/ langsung filename saja
// });

// //cara pendek method download
routers.get("/download", (req, res) => {
  const filename = "logo.png";
  res.sendFile(path.join(__dirname, "/download", filename), {
    headers: {
      "Content-Disposition": 'attachment; filename="logo.png"',
    },
  }); //kalau lebih dari 1 foto tidak perlu /download/ langsung filename saja
});

routers.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.status(200).json({
    status: "success",
    message: "Login page",
    data: {
      username: username,
      password: password,
    },
  });
});

routers.get("/", (req, res) => res.send("Hello World"));
routers.get("/about", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "About page",
    data: [],
  })
);
routers.post("/contoh", (req, res) => res.send("request method POST"));
routers.put("/contoh", (req, res) => res.send("Request method PUT"));
routers.delete("/contoh", (req, res) => res.send("Request method DELETE"));
routers.patch("/contoh", (req, res) => res.send("Request method PATCH"));

routers.all("/universal", (req, res) =>
  res.send(`Request method ${req.method}`)
);
// Routing dinamis
// 1. Menggunakan params
routers.get("/post/:id", (req, res) =>
  res.send(`Artikel ke - ${req.params.id}`)
);
// 2. Menggunakan Query String
routers.get("/post", (req, res) => {
  const { page, sort } = req.query;
  res.send(`Query yang didapatkan adalah, page : ${page}, sort : ${sort}`);
});
//Routing sampai di atas sini

module.exports = routers;
