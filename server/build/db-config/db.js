"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
var myAppDtataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "house",
    password: "1#k!ngl0S",
    database: "housein",
    logging: true,
    synchronize: true,
    entities: [
        "src/entities/*.ts"
    ],
});
exports.default = myAppDtataSource;
