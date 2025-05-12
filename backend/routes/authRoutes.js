import { Router } from "express";
import auth from "../controllers/authController.js";
import {createUser,getUser} from "../controllers/usersContoller.js";
const router=Router();

router.post('/login', auth.login);
router.post('/signup', createUser);
router.get('/user/:_id', getUser);
router.delete('/delete/:userid', auth.delete);

export default router;