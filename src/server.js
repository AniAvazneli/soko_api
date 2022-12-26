import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectMongo from "./config/mongo.js";
import userRouter from "./routes/userRouter.js";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";
import authRouter from "./routes/authRouter.js";

const fb           = require('./auth/facebook')
const google       = require('./auth/google')

const app = express();
dotenv.config();
connectMongo();

app.use(bodyParser.json());

app.get('', (req, res) => {
    res.render('index', {
        fbUrl: fb.getLoginUrl(),
        googleUrl: google.getLoginUrl()
    })
})

app.get('/auth/facebook', async (req, res) => {
    if (req.cookies.at) {
        const user = await User.findOne({
            authToken: req.cookies.at
        })

        if (user) {
            console.log('auth token already issued')
            return res.render('redirect')
        }
    }
    if (req.cookies.rt) {
        const user = await User.findOne({
            'refreshTokens.token': req.cookies.rt
        })

        if (user) {
            console.log('already authenticated')
            return res.render('redirect')
        }
    }
    try {
        const userData = await fb.getUserData(req.query.code)
        console.log(userData)
        const user = await User.findOneOrCreate({
            email: userData.email
        }, {
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            id: userData.id,
            avatar: userData.avatar.url,
            authMethod: 'facebook'
        })

        const authToken = await user.generateAuthToken()
        await user.save()

        console.log('findoneorcreate: ', user)
        res.cookie('at', authToken, {
            httpOnly: true,
            secure: true,
            maxAge: process.env.AUTH_TOKEN_EXPIRES * 60 * 1000
        })

        res.cookie('sa', 1, {
            httpOnly: false,
            secure: false,
            maxAge: process.env.AUTH_TOKEN_EXPIRES * 60 * 1000
        })

        res.status(200).render('redirect')
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})


app.get('/auth/google', async (req, res) => {
    if (req.cookies.at) {
        const user = await User.findOne({
            authToken: req.cookies.at
        })

        if (user) {
            console.log('auth token already issued')
            return res.render('redirect')
        }
    }
    if (req.cookies.rt) {
        const user = await User.findOne({
            'refreshTokens.token': req.cookies.rt
        })

        if (user) {
            console.log('already authenticated')
            return res.render('redirect')
        }
    }
    try {
        const userData = await google.getUserData(req.query.code)
        console.log(userData)
        const user = await User.findOneOrCreate({
            email: userData.email
        }, {
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            id: userData.id,
            avatar: userData.avatar.url,
            authMethod: 'google'
        })

        const authToken = await user.generateAuthToken()
        await user.save()

        console.log('findoneorcreate: ', user)
        res.cookie('at', authToken, {
            httpOnly: true,
            secure: true,
            maxAge: process.env.AUTH_TOKEN_EXPIRES * 60 * 1000
        })

        res.cookie('sa', 1, {
            httpOnly: false,
            secure: false,
            maxAge: process.env.AUTH_TOKEN_EXPIRES * 60 * 1000
        })

        res.status(200).render('redirect')
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})


app.use("/api", cors(), userRouter);
app.use("/api", cors(), authRouter);
app.use("/", ...swaggerMiddleware());

app.listen(process.env.PORT || 3000);
