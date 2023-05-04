const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')

const PORT = 8080
const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/pet', userRouter)

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
});