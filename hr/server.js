const path = require('path')
const express = require('express')
const app = express()

app.get('/', (_, res) => {
  res.sendFile(path.resolve(path.join(__dirname, 'index.html')))
})

app.listen(3000, () => {
  console.log('HR application is running on port 3000')
})
