"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const post_1 = require("../interface/post");
class PostController {
    constructor() {
        this.post = [];
        this.addPosts = async (req, res) => {
            const { text, title } = req.body;
            let id = this.post.length + 1;
            let date = new Date();
            let postAdd = new post_1.Post(id, text, title, date);
            this.post.push(postAdd);
            return res.status(201).json('Post criado com sucesso');
        };
        this.listPosts = async (req, res) => {
            return res.status(200).json(this.post);
        };
        this.deletePosts = async (req, res) => {
            return res.status(201).json('delete');
        };
        this.editPosts = async (req, res) => {
            return res.status(201).json('edit');
        };
    }
}
exports.PostController = PostController;
