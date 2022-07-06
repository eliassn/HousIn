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
exports.findUserFirstName = void 0;
const db_1 = __importDefault(require("../db-config/db"));
const User_1 = require("../entities/User");
function findUserFirstName(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var userRepo = db_1.default.getRepository(User_1.User);
        var userByid = yield userRepo.findOneBy({ uid: id });
        try {
            return userByid.firstName;
        }
        catch (error) {
            // return "user not found"
            console.error(error);
        }
    });
}
exports.findUserFirstName = findUserFirstName;
// export async function findUserLastName(id:number){
//     var userRepo = myAppDtataSource.getRepository(User)
//     var userByid : any = await userRepo.findOneBy({uid:id})
//     try {
//         return userByid.lastName
//     } catch (error) {
//         console.error(error)
//     }
//     }
