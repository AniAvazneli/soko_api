const queryString = require('query-string')
const axios = require('axios')

export const getLoginUrl = () => {
    const fbparams = queryString.stringify({
        client_id: process.env.FACEBOOK_APP_ID,
        redirect_uri: `https://localhost:${process.env.PORT}/auth/facebook/`,
        scope: 'email,public_profile',
        response_type: 'code',
        auth_type: 'rerequest',
        display: 'popup'
    })
    return `https://www.facebook.com/v8.0/dialog/oauth?${fbparams}`
}

export const getUserAccessToken = async (code) => {
    try {
        const { data } = await axios({
            url: 'https://graph.facebook.com/v8.0/oauth/access_token',
            method: 'get',
            params: {
                client_id: process.env.FACEBOOK_APP_ID,
                client_secret: process.env.FACEBOOK_APP_SECRET,
                redirect_uri: `https://localhost:${process.env.PORT}/auth/facebook/`,
                code
            }
        })
    
        return {
            data: data.access_token
        }
    } catch (e) {
        return {
            error: 'Failed to exchange code to access token'
        }
    }
}

export const getFBUserData = async (accessToken) => {
    try {
        const { data } = await axios({
            url: 'https://graph.facebook.com/me',
            method: 'get',
            params: {
                fields: 'id,email,first_name,last_name',
                access_token: accessToken
            }
        })
    
        return { data }
    } catch (e) {
        return {
            error: 'Failed to fetch user info'
        }
    }
}

export const getProfilePicture = async (uid) => {
    try {
        const { data } = await axios({
            url: `https://graph.facebook.com/${uid}/picture`,
            method: 'get',
            params: {
                breaking_change: 'profile_picture',
                redirect: 'false',
                type: 'normal'
            }
        })
    
        return {
            data: data.data
        }
    }
    catch (e) {
        return {
            error: 'Failed to fetch profile picture'
        }
    }
}

export const getUserData = async (code) => {
    const userAccessToken  = await getUserAccessToken(code)
    if (userAccessToken.error) {
        throw new Error(userAccessToken.error)
    }
    const userData = await getFBUserData(userAccessToken.data)
    if (userData.error) {
        throw new Error(userData.error)
    }
    const profilePicture = await getProfilePicture(userData.data.id)
    if (profilePicture.error) {
        throw new Error(profilePicture.error)
    }
    return {
        firstname: userData.data.first_name,
        lastname: userData.data.last_name,
        email: userData.data.email,
        id: userData.data.id,
        avatar: {
            url: profilePicture.data.url,
            width: profilePicture.data.width,
            height: profilePicture.data.height
        }
    }
}


