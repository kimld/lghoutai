const db=require('../db/index')
//处理图片文件的中间件
const path=require('path')
const fs=require('fs')

exports.avator=(req,res)=>{
    // 传入过来的信息
    const file = req.file
    console.log(req.file);
    // 保存的路径
    const fpath = path.join(__dirname, '../public/img', file.originalname)
    fs.readFile(file.path,(err,data)=>{
        fs.writeFile(fpath,data,(err)=>{
            if(err) return res.send({status:1,message:'上传失败'})
            else{
                res.send({status:0,message:'上传成功',src:'/img/'+file.originalname})
                //删除upload上传的文件图片
                fs.unlinkSync(file.path)
            }
        })
    })
}
// 渲染部分
exports.changeAvatar=(req,res)=>{
    const info=req.body
    console.log(req.body);
    console.log(req.user);
    const sql = `update reguser set avatar = ? where id=?`
    db.query(sql,[info.src,req.user.id],(err,results)=>{
        if(err){
            res.send({
                status:1,
                msg:err.message
            })
        }else{
            res.send({
                status:0,
                msg:'修改成功'
            })
        }
    })

}

exports.getInit=(req,res)=>{
    const info=req.user
    const sql='select avatar from  reguser where  id=?'
    db.query(sql,info.id,(err,results)=>{
        if(err) res.send('错误')
        else{
            res.send({status:0,message:results[0]})
        }
    })
}