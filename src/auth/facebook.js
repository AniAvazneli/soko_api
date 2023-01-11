import express from 'express';
import passport  from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import expressSession from 'express-session';
import dotenv from "dotenv";

dotenv.config();

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL:'/api/auth/facebook/callback',
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


//routes

export const facebookCallback = (req,res) => {
  console.log('facebook works')
}




