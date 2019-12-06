var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user_schema = new Schema({//用户表
    username:String,
    password:String,
    phone:Number
})
exports.User = mongoose.model("user",user_schema);

var goodslist_schema = new Schema({//商品表
    goodsId:String,
    goodsName:String,
    pic_url:String,
    goodsPrice:Number
})
exports.Goodslist = mongoose.model("goodslist",goodslist_schema);

var banner_schema = new Schema({//轮播图的表
    goodsId:String,
    goodsName:String,
    pic_url:String
})
exports.Banner = mongoose.model("banner",banner_schema);

var indextype_schema = new Schema({//首页的分类表
    icon:String,
    text:String,
    url:String
})
exports.Indextype = mongoose.model("indextype",indextype_schema);

var shoppingcar_schema = new Schema({
    user_id:String,
    goods_id:String,
    goodsName:String,
    goodsImg:String,
    check:Boolean,
    goodsPrice:Number,
    num:Number
})
exports.Shoppingcar = mongoose.model("shoppingcar",shoppingcar_schema);