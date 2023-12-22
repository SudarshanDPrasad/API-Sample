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


// Users
export async function getAllUsers() {
    const result = await pool.query(`SELECT * FROM users.user`)
    return result
}

export async function queryUserName(username,password) {
    const query = await
        pool.query(`SELECT * FROM users.user WHERE username like '${username}' AND password like '${password}'`)
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

// Articles 
export async function getAllArticles() {
    const result = await pool.query(`SELECT * FROM users.articles`)
    return result
}

export async function createUserArticle(
    username,
    author,
    title,
    urlToImage,
    description,
    url,
    publishedAt,
    content,
    sourceName
) {
    const insert = await
        pool.query(`INSERT INTO users.articles(
            username , 
            author,
            title,
            urlToImage,
            description,
            url,
            publishedAt,
            content,
            sourceName
            ) VALUES( ?,?,?,?,?,?,?,?,?)`, [username, author, title, urlToImage, description, url, publishedAt, content, sourceName])
    return {
        id: insert[0].insertId,
        username,
        author,
        title,
        urlToImage,
        description,
        url,
        publishedAt,
        content,
        sourceName
    }
}

export async function deleteArticle(title,username) {
    const deleteQuery = await
        pool.query(`DELETE FROM users.articles WHERE title = '${title}' AND username = '${username}'`)
    return deleteQuery
}