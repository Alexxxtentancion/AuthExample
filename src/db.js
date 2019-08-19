import {
    hashPassword
} from './utils';
import {
    createJWT
} from './utils'

Array.prototype.first = function () {
    return this[0];
}

export const createUser = async (user, conn) => {
    const hashedPassword = await hashPassword(user.password);
    await conn.query("insert into user (login,password) values (?,?)", [user.login, hashedPassword]);
}

export const checkUser = async (user, conn) => {
    const [rows] = await conn.query("select * from user where login = ?", [user.login]);
    if (rows.length !== 1) return null;
    return rows.first();
}

export const createToken = async (user, conn) => {
    const jwt = await createJWT(user)
    await conn.query("insert into session (user_id,token,created_date,expired) values (?,?,?,?)", [user.id, jwt, new Date(), false]);
    return jwt;
}

export const getToken = async (token, conn) => {
    const [rows] = await conn.query("select * from session where token = ?", [token]);
    return rows.first();
}
 export const setTokenExpired = async(token,conn) => {
     const [rows] = await conn.query("update session set expired = (?) where token = (?)",[1,token])
 }

 export const dropToken = async(token,conn) => {
     await conn.query("delete from session where token = ?",[token])
 }