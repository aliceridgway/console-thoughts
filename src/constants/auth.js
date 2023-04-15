const BASE_URL = "https://alicer-journal.auth.us-east-1.amazoncognito.com"
const CLIENT_ID = "4sh0j6csboim75kj6oadmmjcim"
const REDIRECT_URI = 'http://localhost:5173/callback'

const loginURL = `${BASE_URL}/login?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
const tokenURL = `${BASE_URL}/oauth2/token`
const revokeTokenURL = `${BASE_URL}/oauth2/revoke`


export default {
    REDIRECT_URI,
    CLIENT_ID,
    loginURL,
    tokenURL,
    revokeTokenURL,
}