if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}


const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();


const indexRouter = require('./routes/index')
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')

// Use express-ejs-layouts middleware
app.use(expressLayouts);
app.use(express.static('public'))


// Other middleware and route definitions...


const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db = mongoose.connection
db.on('error',error => console.log(error))
db.once('open',()=> console.log('connected to mongoose'))

app.use('/',indexRouter)
// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
