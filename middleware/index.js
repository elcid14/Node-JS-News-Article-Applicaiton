var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");




//root route
router.get("/", function(req, res){
    res.render("register");
});

//show register form



//sign up logic



//login form



//login logic



//logout route



//middleware