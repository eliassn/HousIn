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
exports.deletePub = exports.handleDisLikes = exports.handleLikes = exports.getLikesByPbId = exports.createPub = exports.uploadS3 = void 0;
const db_1 = __importDefault(require("../db-config/db"));
const multer_1 = __importDefault(require("multer"));
const Publishings_1 = require("../entities/Publishings");
const User_1 = require("../entities/User");
const dotenv_1 = __importDefault(require("dotenv"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_s3_1 = __importDefault(require("multer-s3"));
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
exports.uploadS3 = uploadS3;
const uploadImages = (0, exports.uploadS3)("chelbi-housin").array("photos");
const createPub = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var pubs = new Publishings_1.Pubs();
    var files = req.files;
    if (files.length > 0) {
        pubs.photos = files.map((file) => {
            return file.location;
        });
    }
    // pubs.firstName = findUserFirstName(Number(req.params.user_id))
    // pubs.lastName = findUserLastName(Number(req.params.user_id))
    pubs.price = req.body.price;
    pubs.type = req.body.type;
    pubs.place = req.body.place;
    pubs.state = req.body.state;
    pubs.description = req.body.description;
    pubs.tel = req.body.tel;
    pubs.likes = [];
    pubs.userId = req.params.user_id;
    var userRepo = db_1.default.getRepository(User_1.User);
    var user = yield userRepo.findOneBy({ uid: pubs.userId });
    pubs.user_first_name = user === null || user === void 0 ? void 0 : user.firstName;
    pubs.user_last_name = user === null || user === void 0 ? void 0 : user.lastName;
    // var userRepo = myAppDtataSource.getRepository(User)
    //   var found = await userRepo.findOneById({uid:pubs.userId})
    //   pubs.firstName = found.firstName
    //   pubs.lastName = found.lastName
    try {
        const savedPub = yield db_1.default.manager.save(pubs);
        console.log(savedPub.photoPreview);
        if (savedPub)
            res.status(200).json({ savedPub, files: req.files });
        console.log(req.body, req.files);
    }
    catch (error) {
        res.json(error);
    }
});
exports.createPub = createPub;
// export  function testUploadImgWithMulter(req:Request,res:Response){
// const uploadImages= uploadS3("chelbi-housin").array("photos")
// uploadImages(req,res,err=>{
// if(err) return res.status(400).json(err.message)
// console.log(req.files)
// res.status(200).json({data:req.files})
// })
// }
function getLikesByPbId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var pid = req.body.id;
        var pubrepo = db_1.default.getRepository(Publishings_1.Pubs);
        var pubById = yield pubrepo.findOneBy({ id: pid });
        try {
            res.status(200).json(pubById === null || pubById === void 0 ? void 0 : pubById.likes.length);
        }
        catch (error) {
            res.status(400).json(error);
        }
    });
}
exports.getLikesByPbId = getLikesByPbId;
function handleLikes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var id = Number(req.params.user_id);
        var pubRepository = db_1.default.getRepository(Publishings_1.Pubs);
        var foundPub = yield pubRepository.findOneBy({ id: req.body.id });
        try {
            var likes = foundPub.likes;
            likes.push(id);
            var savedPub = yield db_1.default.manager.save(foundPub);
            res.status(200).json(likes);
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    });
}
exports.handleLikes = handleLikes;
function handleDisLikes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var id = Number(req.params.user_id);
        var pubRepository = db_1.default.getRepository(Publishings_1.Pubs);
        var foundPub = yield pubRepository.findOneBy({ id: req.body.id });
        try {
            var likes = foundPub.likes;
            likes.splice(likes.indexOf(id), 1);
            var savedPub = yield db_1.default.manager.save(foundPub);
            res.status(200).json(likes);
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    });
}
exports.handleDisLikes = handleDisLikes;
function deletePub(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var id = Number(req.params.user_id);
        var pubRepository = db_1.default.getRepository(Publishings_1.Pubs);
        var foundPub = yield pubRepository.findOneBy({ id: req.body.id });
        try {
            var savedPub = yield db_1.default.manager.remove(foundPub);
            res.status(200).json(savedPub);
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    });
}
exports.deletePub = deletePub;
