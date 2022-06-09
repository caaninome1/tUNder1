const fs = require('fs');
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    https: {
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.crt'),
    },
  },
})
