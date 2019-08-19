import {
    pool
} from "../server";
import {
    dropToken
} from "../db"


export const logOut = (req,res) => {
    pool.getConnection().then(async conn =>{
        try {
            res.clearCookie('token')
            await dropToken(req.cookies.token,conn)
            return res.status(200).json({
                message:"User successfully loged out"
            })
            
        } catch (err) {
            return res.status(401).json({
                message:"Wrong session credentials",
                error:err
            })
        }
    }).catch(err => {
        console.log(err)
        return res.status(400).json({
            message:"Log out Error"
        })
    }

    )
}