import { User, Book, THEBOOK } from "../models/types";
import { v4 as uuidv4 } from "uuid";
import {
  readFromJsonFile,
  writeUserToJsonFile,
  editUserToJsonFile,
} from "../DAL/jsonUsers.js";
import bcrypt from "bcrypt";
import { promises } from "dns";
import axios from "axios";
import jsonfile from "jsonfile";
import { json } from "stream/consumers";
import { error, log } from "console";

export const registerUser = async (
  userName: string,
  password: string
): Promise<string> => {
  const users: User[] = await readFromJsonFile();
  const existingUser = users.find((u) => u.userName === userName);

  if (existingUser) {
    throw new Error("Username already exists.");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUserId: string = uuidv4();

  const newUser: User = {
    id: newUserId,
    userName,
    password: hashedPassword,
    books: [],
  };

  await writeUserToJsonFile(newUser);
  return newUserId;
};

export const authenticateUser = async (
  userName: string,
  password: string
): Promise<string> => {
  const users: User[] = await readFromJsonFile();
  const userFind = users.find((u) => u.userName === userName);

  if (!userFind) {
    throw new Error("Invalid username or password.");
  }

  const passwordMatch = bcrypt.compareSync(password, userFind.password);

  if (!passwordMatch) {
    throw new Error("Invalid username or password.");
  }

  return userFind.id ? userFind.id : ""; // just for typescript not to be mad
};

export const addBookToUser = async (
  userId: string,
  bookName: string
): Promise<THEBOOK> => {
  const users: User[] = await readFromJsonFile();
  const userFind = users.find((u) => u.id === userId);
  if (!userFind) {
    throw new Error("Invalid username or password.");
  }
  const existingBook = userFind.books?.find(book => book.title === bookName);
  if (existingBook) {
    throw new Error("Book already exists in user's library.");
  }
  try {
    let book: any = await axios.get(
      `https://freetestapi.com/api/v1/books?search=${bookName}`
    );

    const newUser = { ...userFind };
    book = book.data[0];
    const updatedBook = {
      id: book.id,
      title: bookName,
      author: book.author,
    };
    
    
    newUser.books?.push(updatedBook)
    await editUserToJsonFile(userFind, newUser);
    const addBook: THEBOOK = {
      id: book.id,
      book: book,
    };

    return addBook;
  } catch (e) {
    console.error("Error adding book:", error);
    throw error;
  }
};
