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
exports.refreshToken = exports.verifyToken = exports.logout = exports.login = exports.register = void 0;
const db_1 = __importDefault(require("../db-config/db"));
const User_1 = require("../entities/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(8);
        var hashedPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
        const user = new User_1.User();
        var files = req.files;
        if (files.length > 0) {
            user.picture = files.map((file) => {
                return file.location;
            });
        }
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.phone = req.body.phone;
        user.email = req.body.email;
        user.password = hashedPassword;
        user.job = req.body.job;
        user.nationality = req.body.nationality;
        user.isCompany = req.body.isCompany;
        const token = jsonwebtoken_1.default.sign({ user_id: user.uid, email: user.email }, process.env.TOKEN_KEY, {
            expiresIn: "2h",
        });
        user.token = token;
        const emailExist = yield db_1.default.getRepository(User_1.User).findOneBy({ email: req.body.email });
        if (emailExist) {
            res.json('un compte existe deja avec cet email  voir login');
            return;
        }
        try {
            const savedUser = yield db_1.default.manager.save(user);
            res.status(200).json({ id: savedUser.uid, token: savedUser.token });
        }
        catch (error) {
            res.status(400).json(error);
        }
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundUser = yield db_1.default.getRepository(User_1.User).findOneBy({ email: req.body.email });
        if (!foundUser)
            return res.status(404).json("email ou mot de passe non valide essayer de cree un compte");
        var validPass = yield bcryptjs_1.default.compare(req.body.password, foundUser.password);
        console.log(validPass);
        if (!validPass)
            return res.status(404).json("email ou mot de passe non valide essayer de cree un compte");
        const token = generateAccessToken(foundUser);
        foundUser.token = token;
        const refreshToken = generateRefreshToken(foundUser);
        foundUser.refreshToken = refreshToken;
        refreshTokens.push(refreshToken);
        res.status(200).json(foundUser);
    });
}
exports.login = login;
/////////////////////
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = req.body.token;
        refreshTokens = refreshTokens.filter(token => token !== refreshToken);
        res.status(200).json('you are logged out');
    });
}
exports.logout = logout;
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign({ user_id: user.uid, email: user.email }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
    });
}
function generateRefreshToken(user) {
    return jsonwebtoken_1.default.sign({ user_id: user.uid, email: user.email }, process.env.REFRESH_KEY, {
        expiresIn: "2h",
    });
}
function verifyToken(req, res, next) {
    var config = process.env;
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config.TOKEN_KEY);
        req = decoded;
    }
    catch (error) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}
exports.verifyToken = verifyToken;
////////////////////////////
var refreshTokens = [];
function refreshToken(req, res) {
    const refreshToken = req.body.token;
    if (!refreshToken)
        return res.status(401).json('you are not authenticated');
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json('refreshToken not valid');
    }
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        res.status(200).json({
            token: newAccessToken,
            refreshToken: newRefreshToken
        });
    });
}
exports.refreshToken = refreshToken;
