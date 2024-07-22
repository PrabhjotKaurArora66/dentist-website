var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))


mongoose.connect('mongodb://localhost:27017/mydentist',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

var dentist=mongoose.connection;

dentist.on('error',()=>console.log("Error in connecting to database"));
dentist.once('open',()=>console.log("Connected to database"))

app.post("/sign_up",(req,res)=>{
    var first_name  = req.body.first_name;
    var last_name=req.body.last_name;
    var email = req.body.email;
    var phno=req.body.phno;
    var date=req.body.date;

    var data={
       "first_name":first_name,
       "last_name":last_name,
       "email":email,
       "phno":phno,
       "date":date

    }

    dentist.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted successfully");
    });

    return res.redirect('submit.html')
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.send(index.html);
}).listen(3000);

console.log("Listening on port 3000")