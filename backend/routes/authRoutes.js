import { Router } from "express";
import auth from "../controllers/authController.js";
const router=Router();

router.post('/login', auth.login);
router.post('/signup', auth.signup);
router.get('/user/:userid', auth.get);
router.delete('/delete/:userid', auth.delete);

export default router;