import express from 'express';
import {
    router
} from './router';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cookieParser from 'cookie-parser'
const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', router);

  
export const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "admin",
    database: "artem"
}).promise();

pool.getConnection()
    .then(async conn => {
        await conn.release();
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
    }).catch(err => {
        console.log(err);
        console.log("Can't connect to db");
    });