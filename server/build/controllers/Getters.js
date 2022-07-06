"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPubs = exports.getPubsByLocation = exports.getPubsByUserId = exports.getUserById = exports.all = void 0;
const db_1 = __importDefault(require("../db-config/db"));
const User_1 = require("../entities/User");
const Publishings_1 = require("../entities/Publishings");
function all(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUsers = yield db_1.default.manager.findAndCount(User_1.User);
            const usersCount = allUsers[1];
            res.status(200).json(allUsers);
        }
        catch (error) {
            res.json(error);
        }
    });
}
exports.all = all;
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepo = db_1.default.getRepository(User_1.User);
        try {
            const userById = yield userRepo.findOneBy({
                email: req.body.email,
                uid: Number(req.params.user_id)
            });
            res.status(200).json(userById);
        }
        catch (error) {
            res.json(error);
        }
    });
}
exports.getUserById = getUserById;
function getPubsByUserId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var pubsRepo = db_1.default.getRepository(Publishings_1.Pubs);
        var user_id = req.params.user_id;
        console.log(user_id);
        try {
            const pubsByUserId = yield pubsRepo.findBy({ userId: user_id });
            console.log("pbu", pubsByUserId);
            if (pubsByUserId)
                res.status(200).json(pubsByUserId);
        }
        catch (error) {
            res.json(error);
        }
    });
}
exports.getPubsByUserId = getPubsByUserId;
function getPubsByLocation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const pubsRepo = db_1.default.getRepository(Publishings_1.Pubs);
        var place = req.query.place;
        try {
            const pubByLocation = yield pubsRepo.findBy({ place: place, price: req.query.price });
            if (pubByLocation)
                res.status(200).json(pubByLocation);
        }
        catch (error) {
            res.json(error);
        }
    });
}
exports.getPubsByLocation = getPubsByLocation;
function getAllPubs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allPubs = yield db_1.default.manager.findAndCount(Publishings_1.Pubs);
            if (allPubs)
                res.status(200).json(allPubs);
        }
        catch (error) {
            res.json(error);
        }
    });
}
exports.getAllPubs = getAllPubs;
