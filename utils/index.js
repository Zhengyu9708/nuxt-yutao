const crypto = require("crypto");   // Node 自带API 

// 加密函数  data 需要加密的字段 
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

// 解密 
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
const keys = "wuhan1909";   // 123456789  1w2u3h4a5n61798099

exports.aesEncrypt = aesEncrypt;   // 加密
exports.aesDecrypt = aesDecrypt;   // 解密
exports.keys = keys;        // 密钥 

exports.checkToken = function (req,res,next){//反向代理
    console.log(req.path);
    if(req.path!=="/api/login"&&req.path!=="/api/register"){
        const client_token = req.headers.token;
        const server_token = req.session.token;
        console.log(client_token);
        console.log(server_token);
        if(client_token){//判断前端请求头有没有token
            if(server_token){//
                if(client_token==server_token){
                    next();
                }else{
                    res.json({
                        code:"10000",
                        msg:"token不匹配"
                    })
                }
            }else{
                res.json({
                    code:"10000",
                    msg:"token已过期"
                })
            }
        }else{
            res.json({
                code:"10000",
                msg:"token不存在"
            })
        }
       
    }else{
        next();
    }
   }