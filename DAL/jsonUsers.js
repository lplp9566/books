var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jsonfile from 'jsonfile';
const DB_FILE_PATH = process.env.DB_FILE_PATH || './db.json';
export const writeUserToJsonFile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield jsonfile.readFile(DB_FILE_PATH);
    users.push(user);
    yield jsonfile.writeFile(DB_FILE_PATH, users);
});
export const readFromJsonFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield jsonfile.readFile(DB_FILE_PATH);
    return users;
});
export const editUserToJsonFile = (user, editUser) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readFromJsonFile();
    console.log(editUser);
    const oldUser = users.find((u) => u.id === user.id);
    users[users.indexOf(oldUser)] = editUser;
    yield jsonfile.writeFile(DB_FILE_PATH, users);
});
