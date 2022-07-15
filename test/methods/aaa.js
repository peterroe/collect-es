const fs = require('fs')
const path = require('path')

// rename files xxx_test.js to xxx.test.js
const tests = fs.readdirSync(path.join(__dirname))
tests.forEach((file) => {
  if (file.includes('_test.js')) {
    const newFile = file.replace('_test.js', '.test.js')
    fs.renameSync(path.join(__dirname, file), path.join(__dirname, newFile))
  }
})

