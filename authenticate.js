const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user'); //since created with the user schema has access to the passport local mongoose plugin already

exports.local = passport.use(new LocalStrategy(User.authenticate())); //passport.use specific strategy plugin want to use to our passport implementation. Pass in new instance of LocalStrategy, it requires verify callback function, against locally stored username & pw. User.authenticate
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
