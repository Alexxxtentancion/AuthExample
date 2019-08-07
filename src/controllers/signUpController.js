import {
    createUser
} from '../db';
import {
    pool
} from '../server';
export const signUp = (req, res) => {
    const user = req.body;
    if (!user || user.login.trim().length === 0 || user.password.trim().length === 0) {
        return rres.status(400).json({
            message: "Signup error"
        });
    }
    pool.getConnection().then(async conn => {
        try {
            await createUser(user, conn);
            conn.release();
            return res.status(200).json({
                message: "User registered successfully"
            });
        } catch (err) {
            console.log(err);
            conn.release();
            return res.status(400).json({
                message: "Signup error"
            });
        }
    }).catch(err => {
        console.log(err);
        return rres.status(400).json({
            message: "Signup error"
        });
    });
}