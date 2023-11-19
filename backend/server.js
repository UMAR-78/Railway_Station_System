const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./utils/db')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');
// const PORT = require(process.env.PORT || 3005)
connectDB();
const app =  express()

app.use(express.json())
app.use(cors());
app.use('/api/v1' , userRoutes);



app.listen(process.env.PORT, ()=>
{
    console.log(`Server is listening on ${process.env.PORT}`)
})
