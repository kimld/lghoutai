// 验证token
exports.verToken = (token) => {
    jwt.verify(token, config.secretkey, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
}