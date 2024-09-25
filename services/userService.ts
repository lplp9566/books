import { User,Book } from "../models/types";
import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeUserToJsonFile } from "../DAL/jsonUsers.js"
import bcrypt from "bcrypt"
import { promises } from "dns";
import axios from "axios";

export const registerUser = async (userName: string,password: string): Promise<string> => {
  const users: User[] = await readFromJsonFile();
  const existingUser = users.find((u) => u.userName === userName);

  if (existingUser) {
    throw new Error("Username already exists.");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUserId: string = uuidv4();
  
  const newUser: User = {
    id: newUserId ,
    userName,
    password: hashedPassword,
    books: [],
  };

  await writeUserToJsonFile(newUser);
  return newUserId;
};

export const authenticateUser = async (userName: string, password: string): Promise<string> => {
  const users: User[] = await readFromJsonFile();
  const userFind = users.find((u) => u.userName === userName);

  if (!userFind) {
    throw new Error("Invalid username or password.");
  }

  const passwordMatch = bcrypt.compareSync(password, userFind.password);

  if (!passwordMatch) {
    throw new Error("Invalid username or password.");
  }

  return userFind.id? userFind.id : ''; // just for typescript not to be mad
};

exports const addBookToUser= async(userId:string,bookName:string):Promise<JSON>=>{
  const users: User[] = await readFromJsonFile();
  const userFind = users.find((u) => u.id === userId);
  if (!userFind) {
    throw new Error("Invalid username or password.");
  }
  try{
  const book:any = await axios.get(`https://openlibrary.org/search.json?title=${bookName}`)
  const newBook:Book = {
    title:bookName,
    author:book.docs.author_name

  }

}  catch(e){
  console.log(e)
    
}
}

