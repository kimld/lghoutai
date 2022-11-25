const joi=require('joi')
username=joi.string().alphanum().min(3).max(10).required()
password = joi.string().pattern(/^[\S]{6,12}$/).min(6).max(16).required()
againpassword = joi.ref('password')
exports.schema_reguser={
    body:{
        username,
        password,
        againpassword
    }
}
exports.schema_login = {
    body: {
        username,
        password,
    }
}