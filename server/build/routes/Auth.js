"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const Auth_1 = require("../controllers/Auth");
const dotenv_1 = __importDefault(require("dotenv"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
var s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.S3KEY,
    secretAccessKey: process.env.SECRET_S3_KEY,
    region: process.env.S3REGION,
});
const uploadS3 = (bucketName) => (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3,
        bucket: bucketName,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, `${Date.now()}--${file.originalname}`);
        },
        acl: "public-read"
    })
});
exports.router = (0, express_1.Router)();
exports.router.post('/register', uploadS3("chelbi-housin").array('picture'), Auth_1.register);
exports.router.post('/login', Auth_1.login);
exports.router.post('/logout', Auth_1.logout);
exports.router.post('/refresh', Auth_1.refreshToken);
