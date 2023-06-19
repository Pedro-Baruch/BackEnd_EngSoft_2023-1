"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validPass = exports.encrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const encrypt = async (pass) => {
    const salt = await bcrypt_1.default.genSalt(12);
    const passwordHash = await bcrypt_1.default.hash(pass, salt);
    return passwordHash;
};
exports.encrypt = encrypt;
const validPass = async (pass) => {
    const num = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const simbols = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "-", "_", "+", "=", "?", ">", "<"];
    let hasNum = 0;
    let hasSimbols = 0;
    if (pass.length < 4) {
        return 0;
    }
    else {
        for (let i = 0; i < pass.length; i++) {
            for (let j = 0; j < num.length; j++) {
                if (pass[i] == num[j]) {
                    hasNum = 1;
                }
            }
            for (let u = 0; u < simbols.length; u++) {
                if (pass[i] == simbols[u]) {
                    hasSimbols = 1;
                }
            }
        }
    }
    if (hasNum == 1 && hasSimbols == 1) {
        return 1;
    }
    else {
        return 0;
    }
};
exports.validPass = validPass;
