var express = require("express"),
     app = express(),
     seedDB = require("./seed"),
     mongoose = require("mongoose"),
     bodyParser = require("body-parser"),
     flash = require("connect-flash"),
     passport = require("passport"),
     LocalStrategy = require("passport-local"),
     methodOverride = require ("method-override"),
     Article = require("./models/article"),
     Comment = require("./models/comment"),
     User = require("./models/user");
     
     //require routes
     
     var commentRoutes = require("./routes/comments"),
         articleRoutes = require("./routes/articles"),
         indexRoutes = require("./routes/index");
         
//Seed the database and connect to mongoose ORM
console.log(process.env.DATABASEURL);
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();


//Passport Config
app.use(require("express-session")({
    secret: "Do you want ants? Because thats how you get ants",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Flash config

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use("/", indexRoutes);
app.use("/articles", articleRoutes);
app.use("/articles/:id/comments", commentRoutes);

//App listen

app.listen(process.env.PORT, process.env.IP, function(){
    console.log ("Server is online");
});