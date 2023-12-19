import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config

const pool = mysql.createPool({
    host: 'mysql-21567144-userlogin.a.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_K6tzO3fGJFSSz0iKJsw',
    database: 'defaultdb',
    port: 13073,
}).promise()

export async function getAllUsers() {
    const result = await pool.query(`SELECT * FROM users.user`)
    return result
}

export async function queryUserName(username){
    const query = await
    pool.query(`SELECT * FROM users.user WHERE username like '${username}'`)
    return query[0];
}

export async function createUser(username, password) {
    const insert = await
    pool.query(`INSERT INTO users.user(username , password) VALUES( ?,?)`, [username, password])
    return {
        id: insert[0].insertId,
        username,
        password
    }
}

export async function deleteUser(username) {
    const deleteQuery = await
    pool.query(`DELETE FROM users.user WHERE username = '${username}'`)
    return deleteQuery
}
