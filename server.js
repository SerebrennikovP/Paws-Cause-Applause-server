const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')
const petRouter = require('./routes/pet')
const dbConnection = require('./db/knex')
require('dotenv').config()

const PORT = Number(process.env.PORT) || 8080

const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/pet', petRouter)

dbConnection.migrate.latest().then((migration) => {
    if (migration) {
        console.log('Connected to DB', migration)
        app.listen(PORT, () => {
            console.log(`App listening on http://localhost:${PORT}`)
        });
    }
}).catch(err => console.log(err))