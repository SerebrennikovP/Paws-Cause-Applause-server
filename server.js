const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes')
const petRouter = require('./routes/petRoutes')
require('dotenv').config()

const PORT = process.env.PORT || 8080

const app = express()

async function main() {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, { dbName: "pet-adoption-Serebrennikov" });
        if (connection) {
            app.listen(PORT, () => {
                console.log(`App listening on http://localhost:${PORT}`)
            });
        }
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }
}

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/pet', petRouter)


main()