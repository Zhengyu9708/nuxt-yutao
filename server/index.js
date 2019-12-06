const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

const connection = require("../utils/connect");

app.use(express.json()); //  得到 post请求的提交的 formData 数据 
app.use(express.urlencoded({ extended: false })); // req.body 

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

var session = require("express-session");
app.use(session({//配合中间件
  name:"my-exp",
  saveUninitialized:true,
  secret:"test",
  cookie:{maxAge:1000*60*60},
  resave:false
}))


var apiRouter = require("./api");
app.use("/api",apiRouter);
