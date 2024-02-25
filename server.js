const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes')
const cors = require('cors');
const app = express();
const port = process.env.PORT;

app.use(cors()); 

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());


const connection = async() =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/messages').then(() => {
            console.log('Database connected successfully');
        }); 
    }
    catch(err){
        console.log('Error occured while connecting to database');
    }
}

app.listen(port, async() => {
    await connection();
    console.log(`server is running at http://localhost:${port}`);
});

app.use('/api/send', routes)