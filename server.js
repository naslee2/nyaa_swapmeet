var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 
var path = require('path');
var session = require('express-session');
var bcrypt =require('bcryptjs')

app.use(express.static( __dirname + '/angular/dist' ));

var UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    usertype: {type: Number, default: 1}
}, {timestamps: true});

mongoose.model('User', UserSchema);

var User = mongoose.model('User');

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/user',{useNewUrlParser: true });

mongoose.Promise = global.Promise;

app.post('/register', function(request, response){
    console.log("server working!", request.body.email);
    console.log("server working!", request.body.password);
    console.log("server working!", request.body.username);
    let hash = bycrpt.hashSync(request.body.password,12);
    var add = new User(
        { username: request.body.username,
        email: request.body.email,
        password: hash
        }
    )
    console.log('add', add)
        
});

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular/dist/index.html"))
});

app.listen(8000, function() {
    console.log("listening on port 8000");
});