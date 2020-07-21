const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();
const port = process.env.PORT || 5000

passport.use(new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, users) {
           
         return done(err, users);
       });
  }
));


app.get('/',passport.authenticate('google',{
    scope:['profile','email']
}))
app.get('/auth/google/callback',(req, res)=> {
    res.redirect("https://facebook.com");
  });
app.listen(port,()=>{
    console.log("Server is running on "+port);
})