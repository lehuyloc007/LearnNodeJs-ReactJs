const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

const router = require('./router')
//public static file
// app.use(express.static('router'))

// app.use('/get', (req, res) => {
//     res.json({a: 2})
// });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use('/', router);

app.listen(port, ()=> {
    console.log('listen sucess');
});