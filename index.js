const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes')
const petRouter = require('./routes/petRoutes')
require('dotenv').config()

const PORT = process.env.PORT || 8080

const app = express()
app.use(cors({ origin: ['http://localhost:3000','https://paws-cause-applause-serebrennikovp.vercel.app/']}));
app.use(express.json())

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



app.use('/user', userRouter)
app.use('/pet', petRouter)


main()