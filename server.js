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
    usertype: {type: Number, default: 2}
}, {timestamps: true});

var FiguredataSchema = new mongoose.Schema({
    name: {type: String, required: true},
    releasedate: {type: Date, required: true},
    announcedate: {type: Date},
    brand: {type: String, required: true},
    series: {type: String, required: true},
    number: {type: Number},
    manufacturer: {type: String},
    distributor: {type: String},
    releaseprice: {type: String},
    currencytype: {type: String, default: "USD"},
    notes: {type: String},
    pictures: {type: Array},
},{timestamps: true});

mongoose.model('User', UserSchema, 'users');
mongoose.model('Figuredata', FiguredataSchema, 'figures')

var User = mongoose.model('User');
var Figuredata = mongoose.model('Figuredata')

app.use(bodyParser.json());

app.use(session({
    secret: '%FI)J(&#A$FC.N=IUG^%$MHG',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: null}
}));

mongoose.connect('mongodb://localhost/user',{useNewUrlParser: true });

mongoose.Promise = global.Promise;

app.post('/register', function(request, response){ //registers user
    var regex= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    var reg_pw_data = request.body.password;
    var reg_email_data = request.body.email;
    var reg_username = request.body.username;
    var reg_pw_check = request.body.check_password
    if (reg_username < 3){
        response.json({message: "Error", error: {message: "Username must be 4 characters long or more!", name: "ValidationError"}})
    }
    else if (regex.test(reg_email_data) == false){
        response.json({message: "Error", error: {message: "Email is invalid!", name: "ValidationError"}})
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

app.post('/login', function(request, response){ //logins user and saves to mongodb
    var login_pw_data = request.body.password;
    var login_username = request.body.username;
    User.find({username: login_username}, function(error, users){
        if (error){
            response.json({message: "Error", error: "Database error"});
            // console.log(error);
        }
        if (users.length > 0){
            var pw_compare = bcrypt.compareSync(login_pw_data, users[0]['password']);
            if(pw_compare){
                request.session.userid = users[0]['_id'];
                request.session.username=users[0]['username'];
                request.session.email=users[0]['email'];
                request.session.usertype=users[0]['usertype'];
                request.session.save();
                response.json({message: "success!", data: request.session});
            }
            else{
                response.json({message: "Error", error: "Passwords do not match!"});
                console.log("woah")
            }
        }
        else{
            response.json({message: "Error", error: "User does not exist!"});
        }
    })
})

app.post('/add', function(request, response){ //observables inherently lazy, use subscribe
    var name = request.body.name;
    var releasedate = request.body.releasedate;
    var announcedate = request.body.announcedate;
    var brand = request.body.brand;
    var series = request.body.series;
    var number = request.body.number;
    var manufacturer = request.body.manufacturer;
    var distributor = request.body.distributor;
    var releaseprice = request.body.releaseprice;
    var currencytype = request.body.currencytype;
    var notes = request.body.notes;

    var newfigure = new Figuredata(
        {
        name: name,
        releasedate: releasedate,
        announcedate: announcedate,
        brand: brand,
        series: series,
        number: number,
        manufacturer: manufacturer,
        distributor: distributor,
        releaseprice: releaseprice,
        currencytype: currencytype,
        notes: notes
        }
    )
    newfigure.save(function(error){
        if(error){
            response.json({message: "Error", error: error});
        }
        else{
            response.json({message: "success!", data: add});
        }
    });

    response.json({message: "success!", data: "test"});
})

app.get('/session', function(request, response){ //sends request.session data
    response.json({message: "Success", data: request.session}); 
})

app.get('/getFigures', function(request, response){
    Figuredata.find({}, null, {sort: 'number'}, function(err, task){
        if(err){
            response.json({message: "Error", error: err});
        }
        else{
            response.json({message: "success", data: task});
        }
    })
})

app.get('/logout', function(request, response){ //deletes request.session data
    if(request.session){
        request.session.destroy(); 
        response.json({message: "success!", data: "cookies cleared!"})
    }
    else{
        response.json({message: "Error", data: "cookies unable to be cleared"})
    }
    
    
})

app.get('/checkSession', function(request, response){ //sends data for any request.session users.
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