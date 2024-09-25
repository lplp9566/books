import jsonfile from 'jsonfile';
import { User } from '../models/types';

const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/db.json';


export const writeUserToJsonFile = async (user: User): Promise<void> => {
  const users: User[] = await jsonfile.readFile(DB_FILE_PATH);
  users.push(user);
  await jsonfile.writeFile(DB_FILE_PATH, users);
};

export const readFromJsonFile = async (): Promise<User[]> => {
  const users: User[] = await jsonfile.readFile(DB_FILE_PATH);
  return users;
};

export const editUserToJsonFile = async(user:User,editUser:User):Promise<void>=>{

  const users: User[] = await readFromJsonFile();
  console.log(editUser)
  const oldUser = users.find((u) => u.id === user.id);
  users[users.indexOf(oldUser!)] = editUser
  await jsonfile.writeFile(DB_FILE_PATH,users)
 }