const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const dbConnect = require("./database/index");
const ErrorHandler = require("./middlewares/errorHandler");
const { PORT } = require("./config/index");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const paymentRouter = require("./routes/payment");
const { checkRoom, saveMessage } = require("./services/chatRoom");
const { sendchatNotification } = require("./firebase/service");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "50mb" }));
//
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    // origin: "https://metrimonial-backend-2c3a23b121fc.herokuapp.com/",
    methods: ["GET", "POST"],
  },
});

// const cors = require("cors");

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", async (data) => {
    console.log("data....", data);
    try {
      await sendchatNotification(data.receiverId, {
        message: data.text,
        title: data?.user?.name || 'Metrimonial',
      }, data.user._id);
  
      await checkRoom(data);
      await saveMessage(data);
  
      // Emit to all clients in the room, including sender
      io.to(data.roomId).emit("receive_message", data);
    } catch (error) {
      console.error("Error processing message:", error);
      // Optionally, emit an error event back to the sender
      socket.emit("message_error", { message: "Failed to send message" });
    }
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.use(userRouter);
app.use(adminRouter);
app.use(paymentRouter);
dbConnect();

app.use(ErrorHandler);

server.listen(PORT, () => {
  console.log("SERVER RUNNING", PORT);
});