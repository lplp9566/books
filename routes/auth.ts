import express, { Router } from 'express';
import {addBook, getbooksfromuser, login,register} from '../controllers/authController.js' 


const router: Router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route("/addbook").post(addBook);
router.route("/getbooksfromuser/:id").get(getbooksfromuser)

export default router;