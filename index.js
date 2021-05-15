const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname+`index.html`));

const server = app.listen(PORT, () => {
  console.log("Server Running on Port"+ PORT);
});

io = socket(server);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("new user", (data) => {
    console.log(data);
    socket.userName = data;

  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
    
  });
});
