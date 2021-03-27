const path = require('path')
const crypto = require('crypto')
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

let SESSIONS = [] /** we store sessions here */
const USERS = [
  { fullName: 'Orkhan Huseynli', username: 'admin', password: 'admin' },
] /** this is out users databasee */
const COOKIE_KEY = 'sid' /** stands for Session ID */
const ORIGIN_WHITELIST = [
  'http://localhost:3000' /** this is HR application */,
  'http://localhost:4000' /** this is tasks application */,
]

app.use((req, res, next) => {
  const requestOrigin = req.get('origin')
  if (ORIGIN_WHITELIST.includes(requestOrigin)) {
    res.header('Access-Control-Allow-Origin', requestOrigin)
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, DELETE'
    )
  }
  next()
})

app.get('/', (_, res) => {
  res.sendFile(path.resolve(path.join(__dirname, 'dashboard.html')))
})

app.get('/login', (_, res) => {
  res.sendFile(path.resolve(path.join(__dirname, 'login.html')))
})

app.get('/accounts/sessions/sid', (req, res) => {
  const sid = req.cookies[COOKIE_KEY]
  if (sid) {
    res.send({ sid })
  } else {
    res.status(401)
    res.send({
      error: 'Session does not exist',
    })
  }
})

app.get('/accounts/sessions/:id', (req, res) => {
  const SID = req.params.id
  const session = SESSIONS.find((session) => session.sid === SID)
  if (session) {
    res.send(session)
  } else {
    res.status(404)
    res.send({ error: 'Session not found' })
  }
})

app.post('/accounts/auth/login', (req, res) => {
  const { username, password } = req.body
  const user = USERS.find(
    (user) => user.username === username && user.password === password
  )
  if (user) {
    const token = crypto
      .randomBytes(32)
      .toString('hex') /** this is to simulate an authorization token */

    /** set cookie and send response */
    res.cookie(COOKIE_KEY, token, { httpOnly: true })
    res.send({ token })
    /** delete existing session of user (if exists) */
    SESSIONS = SESSIONS.filter((session) => session.username === user.username)
    /** push  */
    SESSIONS.push({
      ...user,
      sid: token,
      timestamp: new Date().getTime() / 1000,
    })
  } else {
    res.status(401)
    res.send({
      error: 'Username or password is not correct',
    })
  }
})

app.listen(8080, () => {
  console.log('Accounts application is running on port 8080')
})
