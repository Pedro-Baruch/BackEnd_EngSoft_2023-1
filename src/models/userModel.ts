import { ObjectId } from "mongodb"

export interface User{
    id?: ObjectId
    name: string
    email: string
    password: string
}