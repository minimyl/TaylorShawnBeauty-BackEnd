require("dotenv").config();

const { PORT = 2020 } = process.env;
const express = require("express");
const server = express();
const morgan = require("morgan");
server.use(morgan("dev"));
const cors = require("cors");
server.use(cors());

server.use(express.json());
const client = require("./db/client");
client.connect()

const apiRouter = require("./api");
server.use("/api", apiRouter);

server.listen(PORT, () => {
    console.log("The server is up on", PORT);
});