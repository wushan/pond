
const axios = require('axios')
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const Resolver = require('./resolver')
var bodyParser = require('body-parser')

app.set('port', port)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.post('/api/fetchContent', (req, res) => {
    let url = req.body.url
    if (!url) {
      return
    }
    let resolver = new Resolver(url)
    resolver.resolve().then((result) => {
      return res.json(result)
    }).catch((err) => {
      console.log(err)
      return res.sendStatus(500)
    })
  })
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
