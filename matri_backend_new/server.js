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
const {
  checkRoom,
  saveMessage,
  saveNotification,
} = require("./services/chatRoom");
const { sendchatNotification } = require("./firebase/service");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// Define allowed origins
const allowedOrigins = [
  'https://vaishakhimatrimony.com',
  'https://www.vaishakhimatrimony.com',
  'https://api.vaishakhimatrimony.com',
  'https://admin.vaishakhimatrimony.com',
  'http://localhost:3000',
  'http://localhost:3002',
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'content-type', 'contenttype', 'ContentType'],
  exposedHeaders: ['Content-Length', 'Content-Range'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Preflight request handling for all routes
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, content-type, contenttype, ContentType');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.status(204).end();
});

app.use(cookieParser());

const server = http.createServer(app);

const io = new Server(server, {
  cors: corsOptions
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", async (data) => {
    console.log("data....", data);
    try {
      await sendchatNotification(
        data.receiverId,
        {
          message: data.text,
          title: data?.user?.name || "Matrimonial",
        },
        data.user._id
      );

      await checkRoom(data);
      await saveMessage(data);
      await saveNotification(data);

      io.to(data.roomId).emit("receive_message", data);
    } catch (error) {
      console.error("Error processing message:", error);
      socket.emit("message_error", { message: "Failed to send message" });
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.json({ version: "1.0.0:latest" });
});

// Global middleware to set CORS headers for all routes
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, content-type, contenttype, ContentType');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(userRouter);
app.use(adminRouter);
app.use(paymentRouter);

dbConnect();

app.use(ErrorHandler);

server.listen(PORT, () => {
  console.log("SERVER RUNNING", PORT);
});