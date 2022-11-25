const express=require('express')
const router=express.Router()
const User=require('../router_handle/user')
const {schema_login, schema_reguser}  =require('../schema/user')
const  expressJoi=require('@escook/express-joi')


router.post('/reguser',expressJoi(schema_reguser),User.reguer)
router.post('/login', expressJoi(schema_login), User.login)




module.exports=router