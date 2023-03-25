import { Router } from "express";
import { PostController } from "../controllers/postController";

const postRoutes = Router()
const postController = new PostController()

postRoutes.post('/add',postController.addPosts)
postRoutes.get('/list',postController.listPosts)
postRoutes.delete('/delete',postController.deletePosts)
postRoutes.put('/edit',postController.editPosts)

export { postRoutes }