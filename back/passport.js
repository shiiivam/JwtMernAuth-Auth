const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');

// Extracting token from request
const cookieExtractor = req=>{
    let token = null;
    if(req && req.cookies){
        // naming token is nookien as access_token
        token = req.cookies["access_token"]
    }
    return token;
}


// Willl be used for authorization, or to protect the endpoint eg: Admin panel

passport.use(new JwtStrategy({
    // cookieExtractor is the custom function which we are
    //providing to extract the JWT from the request
    jwtFromRequest : cookieExtractor,
    // Key used to sign the token, to verify tht the token is genuine
    secretOrKey : "Shivamcoder"
},(payload,done)=>{
    User.findById({_id : payload.sub},(err,user)=>{
        if(err)
            return done(err, false);
        // Just return the user as already authenticated and now authorized if present also
        if(user)
            return done(null, user);
        else
            return(null, false);
    });
}));


// Authenticated local strategy using username and password or when we loin
// 1. This will be triggered when we try to sign, once we are authenticated
// We will set a cookie on client browser JWT
passport.use(new LocalStrategy((username,passport,done)=>{
    User.findOne({username},(err,user)=>{
        // Something went wrong with DB
        if(err)
            return done(err);
        // if no user exist
        if(!user)
            return done(null,false);
        // Check if passp=word is correct
        user.comparePassport(password,done);

    });
}));