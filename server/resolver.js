const cheerio = require('cheerio')
const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit-logo')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
])
var nodejieba = require("nodejieba")
nodejieba.load({
  dict: nodejieba.DEFAULT_DICT,
  hmmDict: nodejieba.DEFAULT_HMM_DICT,
  userDict: __dirname + '/userdict.utf8',
  idfDict: nodejieba.DEFAULT_IDF_DICT,
  stopWordDict: nodejieba.DEFAULT_STOP_WORD_DICT
})
const got = require('got')

module.exports = class Resolver {
  constructor(url) {
    this.resolved = {
      url: url
    }
  }
  resolve () {
    return new Promise((resolve, reject) => {
      (async () => {
        const { body: html, url } = await got(this.resolved.url)
        const $ = cheerio.load(html)
        let texts = $('p').text()
        var keywords = nodejieba.extract(texts, 4).map((a, b) => {
          return a.word
        })
        const metadata = await metascraper({ html, url })
        let finalResult = Object.assign(this.resolved, metadata, { keywords: keywords })
        resolve(finalResult)
      })()
    })
  }
}
