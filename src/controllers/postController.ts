import { Post } from "../interface/post";
import { Request, Response } from "express";

export class PostController{

    post: Post[] = []

    public addPosts = async ( req: Request, res: Response) =>{
        const {text, title} = req.body
        
        let id = this.post.length + 1
        let date = new Date()

        let postAdd: Post = new Post(id,text,title,date)
        this.post.push(postAdd)

        return res.status(201).json('Post criado com sucesso')
    }
    
    public listPosts = async ( req: Request, res: Response) =>{
        return res.status(200).json(this.post)
    }

    public deletePosts = async ( req: Request, res: Response) =>{
        return res.status(201).json('delete')
    }

    public editPosts = async ( req: Request, res: Response) =>{
        return res.status(201).json('edit')
    }

}