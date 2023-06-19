"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const mongodb_1 = require("../database/mongodb");
const passHelper_1 = require("../helpers/passHelper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const forgotPassHelper_1 = require("../helpers/forgotPassHelper");
class AuthController {
    constructor() {
        this.singup = async (req, res) => {
            const { email, name, password, longitude, latitude } = req.body;
            const foundUser = await this.users.findOne({ email });
            const passwordHash = await (0, passHelper_1.encrypt)(password);
            const ver = await (0, passHelper_1.validPass)(password);
            if (foundUser) {
                return res.status(409).json({ error: "já existe um usuário utilizando este email" });
            }
            if (ver == 0) {
                return res.status(409).json({ error: "Senha incompativel com nosso critérios" });
            }
            const user = {
                email,
                name,
                password: passwordHash,
                latitude,
                longitude,
                numValidator: 10000
            };
            const result = await this.users.insertOne(user);
            return res.status(200).json(result.insertedId);
        };
        this.singin = async (req, res) => {
            const { email, password } = req.body;
            const foundUser = await this.users.findOne({ email });
            if (!foundUser) {
                return res.status(422).json({ error: "E-mail incorreto ou não registrado, tente novamente!" });
            }
            const checkPassword = await bcrypt_1.default.compare(password, foundUser.password);
            if (!checkPassword) {
                return res.status(422).json({ error: "Senha inválida" });
            }
            return res.status(200).json({ User: foundUser });
        };
        this.forgotpass = async (req, res) => {
            const { email } = req.body;
            const foundUser = await this.users.findOne({ email });
            if (!foundUser) {
                return res.status(422).json({ error: "E-mail incorreto ou não registrado, tente novamente!" });
            }
            const number = await (0, forgotPassHelper_1.createRandomNumber)();
            const filter = { email: email };
            const updateDocument = {
                $set: {
                    numValidator: number
                }
            };
            await this.users.updateOne(filter, updateDocument);
            return res.status(200).json({ codigo: number });
        };
        this.changepass = async (req, res) => {
            const { numValidator, password } = req.body;
            const foundUser = await this.users.findOne({ numValidator: numValidator });
            const passwordHash = await (0, passHelper_1.encrypt)(password);
            if (!foundUser) {
                return res.status(422).json({ error: "Código inválido ou inexistente!" });
            }
            const filter = { numValidator: numValidator };
            const updateDocument = {
                $set: {
                    password: passwordHash
                }
            };
            await this.users.updateOne(filter, updateDocument);
            const filter2 = { numValidator };
            const updateDocument2 = {
                $set: {
                    numValidator: 10000
                }
            };
            await this.users.updateOne(filter2, updateDocument2);
            return res.status(200).json({ success: "Senha alterada com sucesso" });
        };
        this.me = async (req, res) => {
            const id = req.params;
            const user = await this.users.findOne({ _id: id });
            console.log(user, id);
            return res.status(200).json({ User: user });
        };
        this.users = mongodb_1.db.collection('users');
    }
}
exports.AuthController = AuthController;
