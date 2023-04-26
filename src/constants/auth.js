
const loginURL = `${import.meta.env.VITE_BASE_URL}/login?response_type=code&client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}`
const tokenURL = `${import.meta.env.VITE_BASE_URL}/oauth2/token`
const revokeTokenURL = `${import.meta.env.VITE_BASE_URL}/oauth2/revoke`


export default {
    loginURL,
    tokenURL,
    revokeTokenURL,
}