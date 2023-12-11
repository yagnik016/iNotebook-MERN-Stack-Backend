const connectToMongo = require('./db')
connectToMongo()
const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const cors = require('cors')
app.use(express.json())
app.use(cors())
require('dotenv').config()

// available Routes
app.use("/auth/v1", require('./routes/auth'))
app.use("/notes/v1", require('./routes/notes'))
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
  })
