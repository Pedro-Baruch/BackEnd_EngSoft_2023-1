import { Request, Response } from "express"
import { db } from "../database/mongodb"
import { User } from "../models/userModel"

export class AuthController{
    
    private users

    constructor(){
        this.users = db.collection<User>('users')
    }

    public singup = async (req: Request, res: Response) => {
        
    }

    public singin = async (req: Request, res: Response) => {

    }

    public forgotpass =async (req: Request, res: Response) => {
        
    }
}