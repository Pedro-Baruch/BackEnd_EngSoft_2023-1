"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const postRoutes = (0, express_1.Router)();
exports.postRoutes = postRoutes;
const postController = new postController_1.PostController();
postRoutes.post('/add', postController.addPosts);
postRoutes.get('/list', postController.listPosts);
postRoutes.delete('/delete', postController.deletePosts);
postRoutes.put('/edit', postController.editPosts);
