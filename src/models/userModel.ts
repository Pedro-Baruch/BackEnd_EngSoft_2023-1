import { ObjectId } from "mongodb"

export interface User{
    id?: ObjectId
    name: string
    email: string
    password: string
    latitude: number
    longitude: number
    numValidator: number
}