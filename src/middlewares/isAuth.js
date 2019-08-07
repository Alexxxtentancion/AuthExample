import {getToken,setTokenExpired} from '../db';
import {checkTokenDate} from "../utils"
import {
    pool
} from "../server";
 export const isAuth = (req,res,next) => {
     pool.getConnection().then(async conn =>{
        if (Object.keys(req.cookies).length !== 0){
            const tokData = await getToken(req.cookies.token,conn)
            const hoursLeft = await checkTokenDate(tokData.created_date)
            if (Math.abs(hoursLeft)>=24){
                await setTokenExpired(tokData.token,conn)
                conn.release()
                return res.status(401).json({messsage:"expired session"})
            }
            conn.release()
            next()
            return res.sendStatus(200)
        }
        else{
            res.status(401).json({
                messsage:"no session data"
            })
        }
     }
     ).catch(err => {
        console.log(err);
        return res.status(400).json({
            message: "Authorization Error"
        });
     }

     )
 }
