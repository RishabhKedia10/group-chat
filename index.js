const express = require("express");
const app = express();

const http = require("http").createServer(app);

const PORT = 8000;

http.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("connected..");
  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });
});
