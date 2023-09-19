const express = require("express");
const path = require('path');

const app = express();

app.use(express.static(dirname +'/dist/offres'));

app.get('/*',function(req,res){
    res.sendFile(path.join(dirname +'/dist/offres/index.html'));
})
app.listen(process.env.PORT);