const path = require('path')
const express = require('express')
const app = express()

app.get('/', (_, res) => {
  res.sendFile(path.resolve(path.join(__dirname, 'index.html')))
})

app.listen(4000, () => {
  console.log('Tasks application is running on port 4000')
})
