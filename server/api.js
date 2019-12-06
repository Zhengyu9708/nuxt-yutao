var express = require("express");
var router = express.Router();
var {
  User,
  Goodslist,
  Banner,
  Indextype,
  Shoppingcar
} = require("../utils/schema");
router.get("/index", (req, res) => {
  res.json({
    code: 200,
    msg: "index 数据请求成功"
  })
})

router.get("/delSession", (req, res) => { //删除session接口
  req.session = ""
})

router.post("/register", (req, res) => {
  var body = req.body;
  var phone = req.body.phone;
  console.log(body);
  User.findOne({
    phone
  }).then(result => {
    if (result) {
      res.json({
        code: 200,
        flag: 0,
        msg: "账号已存在"
      })
    } else {
      User.insertMany(body).then(result => {
        res.json({
          code: 200,
          flag: 1,
          msg: "注册成功",
          result
        })
      })
    }
  })
})

router.post("/login", (req, res) => {
  var phone = req.body.phone;
  var password = req.body.password;
  console.log(phone);
  User.findOne({
    phone
  }).then(result => {
    if (result) {
      if (password == result.password) {
        req.session._id = result._id;
        req.session.phone = phone;
        req.session.username = result.username;
        req.session.password = password;
        res.json({
          code: 200,
          flag: 1,
          msg: "登录成功",
          result
        })
      } else {
        res.json({
          code: 200,
          flag: 0,
          msg: "账号或密码错误"
        })
      }
    } else {
      res.json({
        code: 200,
        flag: 2,
        msg: "账号不存在"
      })
    }
  })
})

router.post("/information", (req, res) => { //个人信息接口--修改密码
  var body = req.body;
  User.findOne({
    phone: body.phone
  }).then(result => {
    if (result) {
      User.updateOne({
        phone: body.phone
      }, {
        $set: {
          password: body.password
        }
      }).then(result => {
        res.json({
          code: 200,
          msg: '修改成功',
          flag: 1
        })
      })
    } else {
      res.json({
        code: 200,
        msg: '用户名不存在',
        flag: 0
      })
    }
  })
})

router.get("/goodslist", (req, res) => { //商品库接口
  Goodslist.find({}, {}).then(result => {
    res.json({
      msg: '商品获取成功',
      flag: 1,
      result
    })
  })
})


router.get("/banner", (req, res) => { //banner图的接口
  Banner.find({}, {}).then(result => {
    res.json({
      msg: 'banner获取成功',
      flag: 1,
      result
    })
  })
})

router.get("/indextype", (req, res) => { //首页的分类名称
  Indextype.find({}, {}).then(result => {
    res.json({
      msg: "indextype获取成功",
      flag: 1,
      result
    })
  })
})

router.get("/details", (req, res) => { //商品详情
  var search = req.query;
  var content = search.search;
  var goodsId = req.query.goodsId;
  // console.log(content);
  var reg = "/" + content + "/";
  if (search.flag == 1) {
    Goodslist.find({
      goodsName: eval(reg)
    }).then(result => {
      console.log(result);
      if (result != "") {
        res.json({
          code: 200,
          msg: "商品查询成功",
          result
        })
      } else {
        res.json({
          code: 200,
          msg: "暂无此商品",
          flag: 0
        })
      }
    })
  } else {
    Goodslist.findOne({
      goodsId: goodsId
    }).then(result => {
      res.json({
        msg: "商品详情获取成功",
        flag: 1,
        result
      })
    })
  }
})


router.get("/shoppingcar", (req, res) => {
  var goods = req.query;
  var user = req.session._id;
  if (goods.bool == 1) { //添加商品至购物车
    var num = req.query.num * 1;
    // console.log(goods);
    // console.log(num);
    if (user) {
      Shoppingcar.findOne({
        user_id: user,
        goods_id: goods.goods_id
      }).then(result => {
        if (result) {
          Shoppingcar.updateOne({
            user_id: user,
            goods_id: goods.goods_id
          }, {
            $inc: {
              num: num,
            }
          }).then(result => {
            res.json({
              code: 200,
              msg: "商品添加成功！",
              flag: 1
            })
          })
        } else {
          Shoppingcar.insertMany({
            user_id: user,
            goods_id: goods.goods_id,
            goodsName: goods.goodsName,
            goodsImg: goods.goodsImg,
            goodsPrice: goods.goodsPrice,
            num: goods.num
          }).then(result => {
            res.json({
              code: 200,
              msg: "商品添加新建成功！",
              flag: 1
            })
          })
        }
      })
    } else {
      res.json({
        code: 400,
        msg: "用户已过期"
      })
    }
  } else if (goods.bool == 2) { //购物车页面加载
    Shoppingcar.find({
      user_id: user
    }).then(result => {
      if (result) {
        res.json({
          msg: "成功获取购物车所有商品",
          code: 200,
          flag: 1,
          result
        })
      } else {
        res.json({
          msg: "还没有添加任何商品进入购物车",
          flag: 2
        })
      }
    })
  } else if (goods.bool == 3) { // 购物车商品数量减一
    var goods_id = goods.goods_id;
    Shoppingcar.find({
      user_id: user,
      goods_id: goods_id
    }).then(result => {
      if (result) {
        Shoppingcar.updateOne({
          user_id: user,
          goods_id: goods_id
        }, {
          $inc: {
            num: -1
          }
        }).then(result => {
          res.json({
            msg: "商品减一"
          })
        })
      } else {
        res.json({
          msg: "商品获取失败",
          flag: 0
        })
      }
    })
  } else if (goods.bool == 4) { //购物车商品数量加一
    var goods_id = goods.goods_id;
    // console.log(user, goods_id);
    Shoppingcar.find({
      user_id: user,
      goods_id: goods_id
    }).then(result => {
      if (result) {
        Shoppingcar.updateOne({
          user_id: user,
          goods_id: goods_id
        }, {
          $inc: {
            num: 1
          }
        }).then(result => {
          res.json({
            msg: "商品加一"
          })
        })
      } else {
        res.json({
          msg: "商品获取失败",
          flag: 0
        })
      }
    })
  }
})

router.get("/shoppingcarDel", (req, res) => {//购物车商品删除
  var goods = req.query;
  var user = req.session._id;
  var goods_id = goods.goods_id;
  console.log(goods);
  Shoppingcar.find({
    user_id: user,
    goods_id: goods_id
  }).then(result => {
    if (result) {
      Shoppingcar.deleteOne({
        user_id: user,
        goods_id: goods_id
      }).then(result => {
        res.json({
          codo:200,
          msg: "商品删除成功"
        })
      })
    }
  })
})
module.exports = router;
