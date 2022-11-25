const express=require('express')
const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.urlencoded({extended:false}))
const  expressJwt=require('express-jwt')
// 验证token
const token=require('./router/token')
app.use((req,res,next)=>{
    const URL=req.url
    if(URL=='/api'){
        return next()
    }
    const authorization=req.headers['authorization']
    if(authorization=='undefined'){
        return res.send({status:1,message:'authorization'})
    }else{
        // 验证token
        token.verToken(authorization)
    }
})
const config=require('./config')
// 挂载静态资源
app.use(express.static('public'))
//还原成json对象
app.use(expressJwt({ secret: config.secretkey}).unless({ path: [/^\/api\//] }))
const joi=require('joi')
//登录注册路由
const router=require('./router/user')
app.use('/api',router)
//头像路由
const avator=require('./router/avator')
app.use('/code',avator)



app.use((err,req,res,next)=>{
    if(err instanceof joi.ValidationError) return res.send({status:1,message:err.message})
    return res.send({ status: 1, message:err.message})
})

app.listen(8080,()=>{
    console.log('run ok');
})