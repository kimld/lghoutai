const express=require('express')
const router=express.Router()
const Upload=require('../router_handle/avator')
// 头像的中间件
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
// 上传头像
router.post('/upload',upload.single('avatar'),Upload.avator)
// 更换头像
router.post('/changeload',Upload.changeAvatar)
// 初始化头像
router.get('/initload', Upload.getInit)
module.exports=router