const express = require('express')
const route = require('./routes/route')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())

mongoose.connect(
"mongodb+srv://bhupendra_:1B97GiRnjBfdXTL4@cluster5.fjlkdvr.mongodb.net/test" ,{  useNewUrlParser: true  }
).then(() => console.log( "MongoDb is connected" ) ).catch( err => console.log(err) )


app.use('/',route)

app.listen(process.env.PORT||3000 ,function()
    {console.log("Express app is running on PORT "+(process.env.PORT||3000))})