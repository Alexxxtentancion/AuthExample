import {
    checkUser,createToken,getToken
} from "../db";
import {
    pool
} from "../server";
import {
    comparePassword
} from "../utils";
export const signIn = (req, res) => {
    const userBody = req.body;
    if (!userBody || userBody.login.trim().length === 0 || userBody.password .trim().length === 0 ) {
        return res.status(400).json({
            message: "Authorization error"
        });
    }
    pool.getConnection()
        .then(async conn => {
            const dbUser = await checkUser(userBody, conn);
            if (dbUser) {
                const isPasswordValid = await comparePassword(userBody.password, dbUser.password);
                if (isPasswordValid) {
                    conn.release()
                    const token = await createToken(dbUser,conn);
                    res.cookie('token',token,
                    {
                        httpOnly: true,
                        maxAge: 1440 * 60000
                    })
                    return res.status(200).json({
                        message: "User authorized successfully"
                    });
                } else {
                    return res.status(401).json({
                        message: "Wrong user credentials"
                    });
                }
            } else {
                return res.status(401).json({
                    message: "Wrong user credentials"
                });
            }
        }).catch(err => {
            console.log(err);
            return res.status(400).json({
                message: "Authorization error"
            });
        });
}