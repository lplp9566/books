import jsonfile from "jsonfile"
import { User } from "../models/types"

export const writeUserToJsonFile = (user:User)=>{
    jsonfile.writeFile('./data/db.json',user,function(err){
        
    })
}