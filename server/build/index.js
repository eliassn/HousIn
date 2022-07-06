"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db-config/db"));
const Auth_1 = require("./routes/Auth");
const Getters_1 = require("./routes/Getters");
const pubs_1 = __importDefault(require("./routes/pubs"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const os_1 = __importDefault(require("os"));
//starting http server
const app = (0, express_1.default)();
const port = process.env.PORT || 9000;
const server = http_1.default.createServer(app);
//socket
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
server.listen(port);
exports.io.on('connection', (socket) => {
    console.log("successfully connected");
    socket.emit("chat-message", "hello world");
    socket.on("send-chat-message", (message, room, id, userId, receiverId) => {
        console.log("client-message", message, room, id, userId, receiverId);
        socket.broadcast.to(receiverId).emit('receive-message', message);
    });
});
//wrapper function
function main() {
    dotenv_1.default.config();
    db_1.default.initialize()
        .then(() => {
        console.log("Data Source has been initialized!", "logicalCount: ", os_1.default.cpus().length);
    })
        .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
    app.use((0, cors_1.default)());
    app.use(express_1.default.json({
        limit: '50mb'
    }));
    app.use(express_1.default.urlencoded({
        limit: '50mb',
        parameterLimit: 10000,
        extended: true
    }));
    app.use(Auth_1.router);
    app.use(Getters_1.getters);
    app.use(pubs_1.default);
}
main();
