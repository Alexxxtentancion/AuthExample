import { signUp} from './controllers/signUpController';
import { signIn} from './controllers/signInController';
import {isAuth} from './middlewares/isAuth'
const express = require('express');

export const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/test',isAuth,(req,res) => {
    console.log(req.body)
})
