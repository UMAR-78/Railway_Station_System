const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./utils/db')
const userRoutes = require('./routes/userRoutes')
const staionRoutes = require('./routes/stationRoutes')
const trainRoutes = require('./routes/trainRoutes')
const timeTableRoutes = require('./routes/timeTableRoutes')
const cloudinary = require('cloudinary')

const cors = require('cors');
// const PORT = require(process.env.PORT || 3005)
connectDB();

cloudinary.v2.config(
{
    cloud_name:"ddjvryys2",
    api_key:"785684183871418",
    api_secret:"QaTuJPNArjSA6a5ZJqjV90LZlyc"
}
)
const app =  express()

app.use(express.json())
app.use(cors());


app.use('/admin/api/v1' , staionRoutes);
app.use('/admin/api/v1' , trainRoutes)
app.use('/admin/api/v1' , timeTableRoutes)

app.use('/api/v1' , userRoutes);



app.listen(process.env.PORT, ()=>
{
    console.log(`Server is listening on ${process.env.PORT}`)
})
