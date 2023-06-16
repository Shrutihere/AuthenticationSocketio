const express = require("express");
const port = process.env.port || 8000;
const cors = require("cors");
const createError = require("http-errors");
const morgan = require("morgan");
const socketHandler = require("./src/SocketEvents");
const http = require("http");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.use((req, res, next) => {
  next(createError.NotFound("This route doesnot exist"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log(err);
  res.json({
    status: err.status || 500,
    error: err.message,
  });
});

const createServer = http.createServer(app);

const socketIO = require("socket.io")(createServer, {
  cors: {
    origin: "http://localhost:5000",
  },
});

socketIO.on("connection", socketHandler);

createServer.listen(8000);
