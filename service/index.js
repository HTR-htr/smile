const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const { connect , initSchemas} = require('./database/init')
const Router = require('koa-router')
let user = require('./appApi/user.js')
const bodyParser = require('koa-bodyparser')//为什么在这里引入之后就不用再引入了
const cors = require('koa2-cors')

let router = new Router()
router.use('/user',user.routes())


;(async ()=>{
    await connect()
    initSchemas()
})()

app.use(cors())
app.use(bodyParser())
app.use(router.routes())
    .use(router.allowedMethods())
  

app.listen(3000,()=>{
    console.log("服务器启动成功")
})