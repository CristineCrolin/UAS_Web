const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const dbPath = path.resolve(__dirname, '../DB/tokobuku.db')

const db = new sqlite3.Database(dbPath,(err) => {
    if(err){
        console.log("err opening connection to database",err)
    }else {
        console.log("Connected to Database")
        db.run('CREATE TABLE IF NOT EXISTS tokobuku(id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT, penulis TEXT, harga int)')
        db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)')
    }
})

module.exports = db