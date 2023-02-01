const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());
app.use("/code-block", require("./routes/codeBlock"));

let roleCounter = 0;
let blockPicked = "";
let registeredCode = null;

io.on("connection", (socket) => {
  roleCounter++;
  socket.emit("role", { role: roleCounter === 1 ? "mentor" : "student" });
  if (blockPicked) io.to(socket.id).emit("block-picked", blockPicked); //if block already picked, send it to client.
  if (registeredCode) io.to(socket.id).emit("coding", registeredCode); //if code already registered, send it to client.

  socket.on("block-picked", (block) => {
    blockPicked = block;
    socket.broadcast.emit("block-picked", block);
  });

  socket.on("disconnect", () => {
    roleCounter--;
  });

  // -------------- Coding Events ----------------
  socket.on("coding", (code) => {
    registeredCode = code;
    socket.broadcast.emit("coding", code);
  });

  socket.on("clear", () => {
    registeredCode = null;
    socket.emit("coding", null);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log("Server Running on port ", PORT));
