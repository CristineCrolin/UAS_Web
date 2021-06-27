const express = require('express')
const router = express.Router()
const db = require('../config/db')
const {verify} = require('../middleware/auth.js')

router.get('/', verify ,(req,res) => {
    db.serialize(() => {
        db.all('SELECT * FROM tokobuku', [], (err,data) => {     
            if(err){
                res.status(400).json({
                    "error": err.message
                })
            }
            res.status(200).json({
                data
            })
        });
    });
})

router.post('/', verify,(req,res) => {
    
    db.serialize(() => { 
        db.run('INSERT INTO tokobuku(nama,penulis,harga) VALUES(?,?,?)', [req.body.nama, req.body.penulis, req.body.harga], (err) => {
            if (err) {
                
                res.status(400).json({
                    "error": err.message
                })
            }
            
            db.get("SELECT last_insert_rowid() as id", (err, row) => {
                res.status(200).json({
                    id: row['id'],
                    nama: req.body.nama,
                    penulis: req.body.penulis,
                    harga: req.body.harga
                });
            });  
        });
    })
})

router.put('/:id', verify, (req,res) => {
    db.run('UPDATE tokobuku SET nama = ?,penulis = ?,harga = ? WHERE id = ?', [req.body.nama, req.body.penulis, req.body.harga, req.params.id], (err) => {
        if (err) {          
            res.status(400).json({
                "error": err.message
            })
        }
        
        db.get("SELECT * FROM tokobuku WHERE id = ?",[req.params.id], (err, data) => {
            res.status(200).json({
                data
            });
        });  
    });
})

router.delete('/:id', verify,(req,res) => {
    db.serialize(()=>{
        db.run('DELETE FROM tokobuku WHERE id = ?', req.params.id, (err) => {
            if (err) {
                res.status(400).json({
                    "error": err.message
                });
                return
            }
            res.status(200).json({
                id: req.params.id
            });
        });
    });
})

module.exports = router