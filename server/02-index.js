import dotenv from 'dotenv'
import express from 'express'
import fs from 'fs'
dotenv.config()

const app = express()

const port = process.env.PORT || 3003

app.listen(port,()=> console.log(`Server listening on port ${port}`))
app.get('/',responseText);
app.get('/json',responseJson)
app.get('/static/*',responseStatic)
app.use("*",responseNotFound)

function responseText(req,res) {
    res.setHeader('Content-Type','text/plain')
    res.end("Hello NodeJS Batch17")
}

function responseJson(req,res) {
    res.json(
        {
            employee :{
                empId : 109,
                firstname : "Naufal",
                lastname : "firdaus"
            }
        }
    )
}

function responseNotFound(req,res) {
    res.writeHead(404,{'Content-Type':'text/plain'})
    res.end('Page not found')
}

function responseStatic(req,res) {
    const filename = `${__dirname}/public/images/${req.params[0]}`
    fs.createReadStream(filename)
        .on('error',()=>responseNotFound)
        .pipe(res)
}