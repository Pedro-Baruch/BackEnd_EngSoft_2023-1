"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Permitir arquivos json
app.use(routes_1.router); // Utilizar as rotas da pasta routes
// Conferindo express
app.get('/', (req, res) => {
    res.status(200).json({ success: 'connected...' });
});
// Config portas
const port = 4000;
app.listen(port, () => {
    console.log(`Application running on: http://localhost:${port}`);
});
