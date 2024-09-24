import { Request,Response } from "express"
import {User} from '../models/types.js'
import {v4 as uuid4} from "uuid"
import { writeUserToJsonFile } from "../DAL/jsonUsers.js";



export const register = (req:Request,res:Response)=>{
    try{
        const user:User = req.body;
        user.id =uuid4()
        writeUserToJsonFile(user)
    }
    catch(e){
        res.status(500).send(e)
    }
 
}


export const login = (req:Request,res:Response)=>{

}