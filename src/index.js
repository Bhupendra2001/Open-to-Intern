const express = require('express')
const route = require('./routes/route')
const app = express()
const mongoose = require('mongoose')
const multer = require('multer')

app.use(express.json())
app.use(multer().any())

mongoose.connect(
    "mongodb+srv://bhupendra_:1B97GiRnjBfdXTL4@cluster5.fjlkdvr.mongodb.net/Project-2", { useNewUrlParser: true }
).then(() => console.log("MongoDb is connected"))
.catch(err => console.log(err))


app.use('/', route)
app.use((req, res) => {
    res.status(404).send({ status: false, message: "Url not found" })
})

app.listen(process.env.PORT || 3001, function () { console.log("Express app is running on PORT " + (process.env.PORT || 3001)) })