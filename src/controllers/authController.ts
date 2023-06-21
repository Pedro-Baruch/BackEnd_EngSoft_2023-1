import { Request, Response } from "express"
import { db } from "../database/mongodb"
import { encrypt, validPass } from "../helpers/passHelper"
import { User } from "../models/userModel"

import bcrypt from "bcrypt"
import { createRandomNumber } from "../helpers/forgotPassHelper"
import { ObjectId } from "mongodb"

export class AuthController{
    
    private users

    constructor(){
        this.users = db.collection<User>('users')
    }

    public singup = async (req: Request, res: Response) => {
        
        const {email, name, password, longitude, latitude} = req.body

        const foundUser = await this.users.findOne<User>({email})

        const passwordHash = await encrypt(password)
        const ver: number = await validPass(password)

        const id = await this.users.countDocuments()

        if(foundUser){
            return res.status(409).json({error: "já existe um usuário utilizando este email"})
        }

        if(ver == 0){
            return res.status(409).json({error:"Senha incompativel com nosso critérios"})
        }

        const user = {
            id: id+1,
            email,
            name,
            password: passwordHash,
            latitude,
            longitude,
            numValidator: 10000
        }

        const result = await this.users.insertOne(user)

        return res.status(200).json(result.insertedId)
    }

    public singin = async (req: Request, res: Response) => {

        const {email, password} = req.body

        const foundUser = await this.users.findOne<User>({email})

        if(!foundUser){
            return res.status(422).json({error: "E-mail incorreto ou não registrado, tente novamente!"})
        }

        const checkPassword = await bcrypt.compare(password, foundUser.password)

        if(!checkPassword){
            return res.status(422).json({error: "Senha inválida"})
        }

        return res.status(200).json({User: foundUser})
    }

    public forgotpass = async (req: Request, res: Response) => {
        
        const {email} = req.body

        const foundUser = await this.users.findOne<User>({email})

        if(!foundUser){
            return res.status(422).json({error: "E-mail incorreto ou não registrado, tente novamente!"})
        }

        const number = await createRandomNumber()

        const filter = {email: email}
        const updateDocument = {
            $set: {
                numValidator: number
            }
        }
    
        await this.users.updateOne(filter,updateDocument)

        return res.status(200).json({codigo: number})
    }

    public changepass = async (req: Request, res: Response) => {
        
        const {numValidator, password} = req.body

        const foundUser = await this.users.findOne<User>({numValidator: numValidator})
        const passwordHash = await encrypt(password)

        if(!foundUser){
            return res.status(422).json({error: "Código inválido ou inexistente!"})
        }

        const filter = {numValidator: numValidator}
        const updateDocument = {
            $set: {
                password: passwordHash
            }
        }

        await this.users.updateOne(filter,updateDocument)

        const filter2 = {numValidator}
        const updateDocument2 = {
            $set: {
                numValidator: 10000
            }
        }

        await this.users.updateOne(filter2,updateDocument2)

        return res.status(200).json({success: "Senha alterada com sucesso"})
    }

    public me = async (req: Request, res: Response) => {
        
        const {id} = req.params
        
        const userId = new ObjectId(id)

        const user = await this.users.findOne(userId)

        return res.status(200).json({User: user})
    }

    public getUser = async (req: Request, res: Response) => {
        
        const users = await this.users.find().toArray()

        return res.status(200).json({users})
    }
}