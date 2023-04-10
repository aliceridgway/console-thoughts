import { defineStore } from 'pinia'

const BASE_URL = "https://alicer-journal.auth.us-east-1.amazoncognito.com"
const CLIENT_ID = "4sh0j6csboim75kj6oadmmjcim"


export const useAuthStore = defineStore('log', {
    state: () => ({
        isAuthenticated: false,

    }),
    actions: {
        async fetchToken(authorizationCode) {
            const url = `${BASE_URL}/oauth2/token`

            const body = {
                grant_type: "authorization_code",
                client_id: CLIENT_ID,
                code: authorizationCode,
                redirect_uri: 'http://localhost:5173/callback',
            }

            const requestBody = new URLSearchParams()
            for (const key in body) {
                requestBody.append(key, body[key])
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: requestBody,
            })

            const data = await response.json()

            if (data.access_token && data.refresh_token && data.id_token) {
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('refresh_token', data.refresh_token)
                localStorage.setItem('id_token', data.id_token)
                this.isAuthenticated = true
            }

            return data

        },
        async refreshToken() {
            const url = `${BASE_URL}/oauth2/token`

            const body = {
                grant_type: "refresh_token",
                client_id: CLIENT_ID,
                refresh_token: localStorage.getItem('refreshToken'),
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: createRequestBody(body),
            })
            
            const data = await response.json()

            if (data.refresh_token && data.access_token && data.id_token) {
                localStorage.setItem('refreshToken', data.refresh_token)
                localStorage.setItem('accessToken', data.access_token)
                localStorage.setItem('idToken', data.id_token)
                this.isAuthenticated = true
            }

            return data

        },
        logout: (state) => () => {
            console.log('Signing out...')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('idToken')
            state.isAuthenticated = false
        }
    
    },
})

function createRequestBody(body) {
    // converts a dictionary into a URLSearchParams object
    const requestBody = new URLSearchParams()
    for (const key in body) {
        requestBody.append(key, body[key])
    }
    return requestBody
}