"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pubs_1 = require("../controllers/pubs");
const Auth_1 = require("../controllers/Auth");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const pubs_2 = require("../controllers/pubs");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(path_1.default.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '--' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage });
var pubRouter = (0, express_1.Router)();
pubRouter.post('/:user_id/user', (0, pubs_2.uploadS3)("chelbi-housin").array('photos'), Auth_1.verifyToken, pubs_1.createPub);
pubRouter.put('/:user_id/likes', pubs_1.handleLikes);
pubRouter.put('/:user_id/dislikes', pubs_1.handleDisLikes);
// pubRouter.get('/likes',getLikesByPbId)
pubRouter.delete('/:user_id/delete', Auth_1.verifyToken, pubs_1.deletePub);
exports.default = pubRouter;
