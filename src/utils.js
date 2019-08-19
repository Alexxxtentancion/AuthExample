import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import moment from 'moment';
const saltRounds = 10;
export const hashPassword = password => bcrypt.hash(password, saltRounds);
export const comparePassword = (password, hash) => bcrypt.compare(password, hash);
export const secretToken = '$2b$13$yv.Kxo7bDbIrWZ7GwBFIpuCc06UgkAmTB/E.mKRUE0UeBgdUvbnFK';
export const createJWT = async (user) => {
    const data = {
        login : user.login
    };
    const expiration = '1h';
    return jwt.sign({ data, }, secretToken, { expiresIn: expiration });
}
export const getTimeNow = () => {
    return moment(new Date(), 'YYYY-MM-DDTHH:mm:ss')
};
export const checkTokenDate = async (sessionCreated) => {
    const now = getTimeNow()
    const day = moment(sessionCreated, 'YYYY-MM-DDTHH:mm:ss');
    const hours = day.diff(now, 'h');
    return hours;
}