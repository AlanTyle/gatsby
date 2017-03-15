const fs = require("fs")
const Promise = require("bluebird")

exports.postBuild = ({ pluginOptions }) =>
  new Promise(resolve => {
    const manifest = { ...pluginOptions }
    delete manifest.plugins
    fs.writeFileSync(`./public/manifest.json`, JSON.stringify(manifest))
    resolve()
  })
