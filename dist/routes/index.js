"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const post_1 = require("./post");
const router = (0, express_1.Router)();
exports.router = router;
// Rotas do projeto
router.use('/posts', post_1.postRoutes);
