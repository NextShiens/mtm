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
const Message = require("./models/message");

app.use(bodyParser.json({ limit: "50mb" }));
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
    origin: ["http://localhost:3000", "*"],
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('send_message', async (data) => {
    const newMessage = new Message({
      roomId: data.roomId,
      user: data.user,
      text: data.text,
      createdAt: data.createdAt,
    });
    await newMessage.save();


    io.to(data.roomId).emit('receive_message', data);

    io.to(data.receiverId).emit('notification', {
      type: 'chat',
      senderId: data.user._id,
      roomId: data.roomId,
      message: data.text,
      createdAt: data.createdAt
    });
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
