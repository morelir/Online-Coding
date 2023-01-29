const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());
app.use("/code-block", require("./routes/codeBlock"));

let activePlayers = 0;
let roleCounter = true;

io.on("connection", (socket) => {
  roleCounter = !roleCounter;
  socket.emit("role", { role: roleCounter ? "draw" : "guess" });
  console.log(socket.id);
  console.log(roleCounter ? "draw" : "guess");

  socket.on("signed", () => {
    activePlayers++;
    console.log("active players:", activePlayers);
    if (activePlayers === 2) {
      io.sockets.emit("game full");
    }
  });

  socket.on("mode picked", () => {
    socket.broadcast.emit("mode picked");
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log("Server Running on port ", PORT));
