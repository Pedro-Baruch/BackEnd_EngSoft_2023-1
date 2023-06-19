"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomNumber = void 0;
const createRandomNumber = async () => {
    const num = Math.floor(Math.random() * 99999999999 + 111111111111);
    return num;
};
exports.createRandomNumber = createRandomNumber;
