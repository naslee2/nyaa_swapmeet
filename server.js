var express = require('express');
var session = require('express-session')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 
var path = require('path');
var bcrypt =require('bcryptjs')


app.use(express.static( __dirname + '/angular/dist' ));

var UserSchema = new mongoose.Schema({
    username: {type: String, required: true, minlength: 3, unique: true},
    email: {type: String, unique: true, required: true, unique: true},
    password: {type: String, required: true, minlength: 7},
    usertype: {type: Number, default: 1}
}, {timestamps: true});

mongoose.model('User', UserSchema);

var User = mongoose.model('User');

app.use(bodyParser.json());

app.use(session({
    secret: '%FI)J(&#A$FC.N=IUG^%$MHG',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: null}
}));

mongoose.connect('mongodb://localhost/user',{useNewUrlParser: true });

mongoose.Promise = global.Promise;

app.post('/register', function(request, response){
    var reg_pw_data = request.body.password;
    var reg_email_data = request.body.email;
    var reg_username = request.body.username;
    var reg_pw_check = request.body.check_password
    if (reg_username < 3){
        response.json({message: "Error", error: {message: "Username must be 4 characters long or more!", name: "ValidationError"}})
    }
    else if (reg_pw_data.length < 7){
        response.json({message: "Error", error: {message: "Password must be 8 characters long or more!", name: "ValidationError"}})
    }
    else if (reg_pw_data != reg_pw_check){
        response.json({message: "Error", error: {message: "Passwords do not match!!", name: "ValidationError"}})
    }
    else{
        var hash = bcrypt.hashSync(reg_pw_data,12);
        var add = new User(
            { 
            username: request.body.username,
            email: request.body.email,
            password: hash
            }
        )
        add.save(function(error){
            if(error){
                response.json({message: "Error", error: error});
            }
            else{
                response.json({message: "success!", data: add});
            }
        });
    }
});

app.post('/login', function(request, response){
    var login_pw_data = request.body.password;
    var login_username = request.body.username;
    var login_hash = bcrypt.hashSync(request.body.password,12);
    User.find({username: login_username}, function(error, users){
        if (error){
            response.json({message: "Error", error: "User does not exist!"});
        }
        else{
            if(bcrypt.compareSync(login_pw_data, login_hash)){
                request.session.userid = users[0]['_id'];
                request.session.username=users[0]['username'];
                request.session.email=users[0]['email'];
                request.session.save();
                response.json({message: "success!", data: request.session});
                console.log(request.session)
            }
            else{
                response.json({message: "Error", error: "Passwords do not match!"});
            }
        }
    })
})

app.get("/session", function(request, response){
    response.json({message: "Success", data: request.session}); 
})

app.get('/logout', function(request, response){
    if(request.session){
        request.session.destroy(); 
        response.json({message: "success!", data: "cookies cleared!"})
    }
    else{
        response.json({message: "Error", data: "cookies unable to be cleared"})
    }
    
    
})

app.get('/checkSession', function(request, response){
    if (request.session){
        response.json({message: "success!", data: request.session});
    }
    else{
        response.json({message: "Error", error: "session not valid"})
    }
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular/dist/index.html"))
});

app.listen(8000, function() {
    console.log("listening on port 8000");
});