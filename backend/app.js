require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const app = express()
const userRouter = require('./routes/userRouter')
const homeRouter = require('./routes/homeRouter')
const adminRouter = require('./routes/adminRouter')
const swipeRouter = require('./routes/swipeRouter')
const passwordResetRouter = require('./routes/passwordResetRouter')
// const utilRouter = require('./routes/utilRouter')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT
const cors = require('cors')

connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests from all origins when in development
        // Replace this condition with your actual production origin check
        if (!origin || origin.startsWith('http://localhost')) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}));


app.listen(PORT, ()=> {
    console.log("server is running on ", PORT)
})

// app.use('/', utilRouter)

app.use('/user', userRouter)

app.use('/home', homeRouter)

app.use('/swipe', swipeRouter) 

app.use('/password-reset', passwordResetRouter)

app.use('/admin', adminRouter)  // For testing purposes  // can make a admin dashboard in future