const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()
router.get('/',async(ctx)=>{
    ctx.body= "这是用户操作页面"
})
router.post('/register',async(ctx)=>{
    // ctx.body = ctx.request.body
    console.log(ctx.request.body)
    const User = mongoose.model('User')
    console.log(User)
    let newUser = new User(ctx.request.body)
    await newUser.save().then((res)=>{
        console.log(res)
        ctx.body={
            code:200,
            message:'注册成功'
        }
    }).catch((error)=>{
        ctx.body= {
            cose:500,
            message:error
        }
    })
})
router.post('/login',async (ctx)=>{
    let loginUser = ctx.request.body
    let userName = loginUser.userName
    let password = loginUser.password
    const User = mongoose.model('User')
    await User.findOne({userName:userName}).exec().then(async(result)=>{
        console.log(result)
    if(result){
        let newUser = new User()
        await newUser.comparePassword(password,result.password).then((isMatch)=>{
            ctx.body = {code :200 , message : isMatch}
        }).catch((err)=>{
            console.log(err)
            ctx.body = {code:500,mmessage:err}
        })
    }else{
        ctx.body = {code:200,message:'用户名不存在'}
    }
    }).catch(async(error)=>{
        ctx.body = { code : 500 , message : error } 
    })
})
module.exports = router;