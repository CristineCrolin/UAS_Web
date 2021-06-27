const jwt = require('jsonwebtoken')


exports.verify = (req,res,next) => {
    if(!req.headers){
        res.status(401).send({
            message: "Anda Perlu Memasukkan Buku Baru!"
        })
    }
    console.log(req.body)

    const token = req.headers["token"]

    let user
    if(token == ""){
        res.status(401).send({
            message: "Token Tidak Valid!"
        })
    }else {
        try{
            user = jwt.verify(token,"Secret")
            req.user = user
            next()
        }catch(err){
            res.status(401).send({
                message: "Token Tidak Valid!"
            })
        }     
    }
}