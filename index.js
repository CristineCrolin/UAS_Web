const express = require('express')
const app = express()
const port = 5000

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const userRouter = require('./routers/users')
const tokobukuRouter = require('./routers/tokobuku')

app.use('/tokobuku', tokobukuRouter)
app.use('/user',userRouter)


app.listen(port, () => {
    console.log("Server Starting on Port 5000")
})