import express from 'express';
import passport, { Passport } from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import expressSession from 'express-session';
import dotenv from "dotenv";

dotenv.config();

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_ID,
  clientSecret: FACEBOOK_SECRET,
  callbackURL:'/auth/facebook/callback',
  profileFields: ['emails', 'displayName', 'name', 'picture']
}, (accessToken, refreshToken, profile, callback)=>{
  callback(null, profile)
}))

passport.serializeUser((user,callback)=>{
  callback(null, user);
})

passport.deserializeUser((user, callback)=>{
  callback(null, user);
})

app.use(expressSession({
  secret: 'jayantpatilapp',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
//routes

export const facebook = (req,res)=> {
  passport.authenticate('facebook', {scope: ['email']})
}

export const facebookCallback = (req,res) => {
  res.redirect('/protected')
}



app.get('/',(req,res)=>{

  res.send(req.user? req.user: 'Not logged in, login with facebook');
})

app.listen(3000, ()=>{
  console.log('server started on 3000');
})