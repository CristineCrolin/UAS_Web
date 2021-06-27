const express = require('express')
const router = express.Router()
const db = require('../config/db')
const jwt = require('../utils/token')
var crypto = require('crypto');



router.post('/register', (req,res) => {   
    db.serialize(() => { 
        db.get("SELECT username FROM users WHERE username = ?",[req.body.username], (err, row) => {
            if(row) {
                res.status(409).json({
                    "message": "Username Sudah Ada!"
                });
            }else {
                db.run('INSERT INTO users(username,password) VALUES(?,?)', [req.body.username,crypto.createHash('sha256').update(req.body.password).digest('base64')], (err) => {
                    if (err) {
                        
                        res.status(400).json({
                            "error": err.message
                        })
                    }
                    
                    db.get("SELECT last_insert_rowid() as id FROM users", (err, row) => {
                        res.status(200).json({
                            id: row['id'],
                            username: req.body.username,
                            password: crypto.createHash('sha256').update(req.body.password).digest('base64'),
                            access_token: jwt.GenerateToken(req.body.username, row['id'])
                        });
                    });  
                });
            } 
        });        
    })
})

router.post("/login",async (req,res) => { 
    await new Promise(resolve => setTimeout(resolve, 2000))
    db.serialize(() => { 
        db.get("SELECT * FROM users WHERE username = ?",[req.body.username], (err, row) => {
            
            if(row) {
                if(crypto.createHash('sha256').update(req.body.password).digest('base64') == row['password']) {
                    res.status(200).json({
                        id: row['id'],
                        username: req.body.username,
                        password: crypto.createHash('sha256').update(req.body.password).digest('base64'),
                        access_token: jwt.GenerateToken(req.body.username, row['id'])
                    });
                }else {
                    res.status(400).json({
                        message: "Password Salah!"
                    })
                }
            }else {
                res.status(404).json({
                    message: "User Tidak Terdaftar!"
                })
            } 
        });        
    })
})


module.exports = router