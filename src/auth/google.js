const queryString = require('query-string')
const axios = require('axios')

const getLoginUrl = () => {
    const googleparams = queryString.stringify({
        client_id: process.env.GOOGLE_APP_ID,
        redirect_uri: `https://localhost:${process.env.PORT}/auth/google/`,
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ].join(' '),
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent'
    })
    return `https://accounts.google.com/o/oauth2/v2/auth?${googleparams}`
}

const getUserAccessToken = async (code) => {
    try {
        const { data } = await axios({
            url: 'https://oauth2.googleapis.com/token',
            method: 'post',
            data: {
                client_id: process.env.GOOGLE_APP_ID,
                client_secret: process.env.GOOGLE_APP_SECRET,
                redirect_uri: `https://localhost:${process.env.PORT}/auth/google/`,
                grant_type: 'authorization_code',
                code
            }
        })
    
        return {
            data: data.access_token
        }

    } catch (e) {
        console.log(e)
        return {
            error: 'Failed to exchange code to access token'
        }
    }
}

const getGoogleUserData = async (accessToken) => {
    try {
        const { data } = await axios({
            url: 'https://www.googleapis.com/oauth2/v2/userinfo',
            method: 'get',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    
        return { data }
    } catch (e) {
        return {
            error: 'Failed to fetch user info'
        }
    }
}

const getUserData = async (code) => {
    const userAccessToken = await getUserAccessToken(code)
    if (userAccessToken.error) {
        throw new Error(userAccessToken.error)
    }
    const userData = await getGoogleUserData(userAccessToken.data)
    if (userData.error) {
        throw new Error(userData.error)
    }
    console.log(userData.data)
    return {
        firstname: userData.data.given_name,
        lastname: userData.data.family_name,
        email: userData.data.email,
        id: userData.data.id,
        avatar: {
            url: userData.data.picture,
            width: 100,
            height: 100
        }
    }

}

module.exports = {
    getLoginUrl,
    getUserData
}