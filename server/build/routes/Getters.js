"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getters = void 0;
const Getters_1 = require("../controllers/Getters");
const express_1 = require("express");
const Auth_1 = require("../controllers/Auth");
exports.getters = (0, express_1.Router)();
exports.getters.get('/allUsers', Auth_1.verifyToken, Getters_1.all);
exports.getters.get('/allPubs', Auth_1.verifyToken, Getters_1.getAllPubs);
exports.getters.get('/:user_id', Auth_1.verifyToken, Getters_1.getUserById);
exports.getters.get('/', Auth_1.verifyToken, Getters_1.getPubsByLocation);
exports.getters.get('/:user_id/user', Auth_1.verifyToken, Getters_1.getPubsByUserId);
