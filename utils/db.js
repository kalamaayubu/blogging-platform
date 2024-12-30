import mysql from 'mysql2/promise'

export const db = mysql.createPool({
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST
})
