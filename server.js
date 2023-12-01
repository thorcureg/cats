const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// FETCHING DATA FROM ENV USING DOTENV MODULE
const DB = process.env.DATABASE_LOCAL;
port = process.env.PORT

// CONNECTING TO DB USING MONGOOSE MODULE

mongoose
    .connect(DB)
    .then(() => console.log('DB connection successful'));


app.listen(port,()=>{
    console.log(`App running on port${port}`)
})
