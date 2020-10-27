const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')
const db = "mongodb://localhost/smile-db"

exports.connect = ()=>{
    mongoose.set('useCreateIndex', true)
    mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
    let maxConnection = 0
    return new Promise((resolve,reject)=>{
        mongoose.connection.on('disconnection',()=>{
            if(maxConnection <3){
                mongoose.connect(db)
                maxConnection++
            }else{
                reject()
                throw new Error('数据库连接出现问题，请人为解决问题')
            }
        })
        mongoose.connection.on('error',(err)=>{
            if(maxConnection<3){
                mongoose.connect(db)
                maxConnection++
            }else{
                reject()
                throw new Error('数据库出现问题，请人为处理')
            }
        })
        mongoose.connection.on('open',()=>{
            resolve('res')
            console.log('mongoose connect successfully')
        })
    })
}

exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)//将schema文件夹下面schema文件夹全部引进来
}
