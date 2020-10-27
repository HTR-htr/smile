const { data } = require('autoprefixer')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
    UserId : ObjectId,
    userName : {unique:true,type:String,dropDups: true},
    password:String,
    creatAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
 },{
    collection:'user'
 })
 userSchema.pre('save',function(next){//加盐加密
     bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err){return next(err)}
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        })
     })
 })
 userSchema.methods = {
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMacth)=>{
                if(!err){//返回比较结果
                    resolve(isMacth)
                }else{//出现异常时候的回调
                    reject(err)
                }
            })
        })
    }
 }
 mongoose.model('User',userSchema)//表示User文件集合下面的内容格式