import { Request, Response } from "express";
import { registerUser, authenticateUser,addBookToUser, getBooks } from "../services/userService.js";
import { User, userNamePassword ,THEBOOK, Book} from "../models/types.js";


export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, password }: userNamePassword = req.body;

    if (!userName || !password) {
      res.status(400).json({ error: "Username and password are required." });
      return;
    }

    const userId = await registerUser(userName, password);
    res.status(201).json({ userid: userId });
  } catch (error: any) {
    if (error.message === "Username already exists.") {
      res.status(409).json({ error: error.message });
    } else {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      res.status(400).json({ error: "Username and password are required." });
      return;
    }

    const userId = await authenticateUser(userName, password);
    res.status(200).json({ userid: userId });
  } catch (error: any) {
    // you can also check for unkown if it instance of Error.
    if (error.message === "Invalid username or password.") {
      res.status(401).json({ error: error.message });
    } else {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const addBook = async (req:Request,res:Response):Promise<void>=>{
  try{
      const userId = req.body.userid
      const book = req.body.book
      const bookRes:THEBOOK =await addBookToUser(userId,book);
      if(!bookRes)
        res.status(400).json("there is a  problem")
      else{
        res.status(201).json(`book:${book} was add to :${userId}`)
      }

  }
   catch(error){
    console.error(error)
    res.status(500).json("wey have a problem")
   }

}
export const getbooksfromuser = async (req:Request,res:Response):Promise<void>=>{
  try{
  
    const userId = req.params.id;
    const bookromUser = await getBooks(userId)
    if(!bookromUser!){
      res.status(500).json("the user dos not have books")
    }
    res.status(200).json(bookromUser)
    
  }
  catch(error){
    console.error(error)
    res.status(500).json("wey have a problem")
   }

}