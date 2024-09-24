import { v4 as uuid4 } from "uuid";
import { writeUserToJsonFile } from "../DAL/jsonUsers.js";
export const register = (req, res) => {
    try {
        const user = req.body;
        user.id = uuid4();
        writeUserToJsonFile(user);
    }
    catch (e) {
        res.status(500).send(e);
    }
};
export const login = (req, res) => {
};
