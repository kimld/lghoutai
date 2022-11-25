const db=require('../db/index')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config = require('../config')
exports.reguer=(req,res)=>{
    const userinfo=req.body
    if(!userinfo.username||!userinfo.password){
        return res.send({status:1,message:'用户名或者密码不能为空'})
    }else{
        const sql='select * from reguser where username=?'
        db.query(sql,userinfo.username,function(err,results){
            if (err) return res.send({ status: 1, message: err.message })
            if (results.length != 0) return res.send({ status: 1, message: '用户名已存在' })
            else{
                userinfo.password=bcryptjs.hashSync(userinfo.password,10)
                const sql='insert into reguser set ?'
                db.query(sql, { username: userinfo.username, password: userinfo.password,avatar:"/img/avatar.jpg"},function(err,results){
                    if (err) return res.send({ status: 1, message: err.message })
                    if (results.affectedRows != 1) return res.send({ status: 1, message: '注册失败'})
                    else{
                        return res.send({ status: 0, message: '注册成功' })
                    }
                })
            }
        })
    }
    
}


exports.login = (req, res) => {
    const userinfo = req.body
    const sql = 'select * from reguser where username=?'
    db.query(sql, userinfo.username, function (err, results) {
    if (err) return res.send({ status: 1, message: err.message })
    if (results.length != 1) return res.send({ status: 1, message: '用户名不存在' })
    else{
        const compare=bcryptjs.compareSync(userinfo.password,results[0].password)
        if(!compare){
             return res.send({ status: 1, message: '登陆失败' })
        }else{
            const user={...results[0],password:'',user_pic:''}
            const tokenStr=jwt.sign(user,config.secretkey,{
                expiresIn:'10h'
            })
            res.send({
                status:0,
                message:'登录成功',
                token:'Bearer '+tokenStr
            })
        }
    }
})
}
