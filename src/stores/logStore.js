import { defineStore } from 'pinia'

import api from '../helpers/api.js'
import logHelper from '../helpers/logHelper.js'

import { useAuthStore } from './authStore.js'

export const useLogStore = defineStore('log', {
    state: () => ({
        logs: [],
    }),
    getters: {
        getAllLogs() {
            console.log("Hello from getAllLogs getter")
            console.log(this.logs)
            return logHelper.formatLogs(this.logs)
        }
    },
    actions: {
        async fetchLogs() {

            const authStore = useAuthStore()
            let data = await api.fetchLogs()

            if (data.message === authStore.tokenExpiryMessage) {
                await authStore.refreshToken()
                data = await api.fetchLogs()
            }

            if (!data.body.Items) {
                const errorMessage = data.error ? data.error : "There was a problem fetching logs"
                throw new Error(errorMessage)
            }

            console.log(data.body.Items)
            this.logs = data.body.Items

        },
        async addLog(formData) {

            const authStore = useAuthStore()

            let data = await api.addLog(formData)

            if (data.message === authStore.tokenExpiryMessage) {
                await authStore.refreshToken()
                data = await api.addLog(formData)
            }

            if (!data.body) {
                throw new Error("There was a problem adding the log")
            }

            this.logs.push(data.body)

        },
        async toggleLogActivity(log) {
            const authStore = useAuthStore()
        
            log.active = !log.active

            let data = await api.updateLog(log)

            if (data.message === authStore.tokenExpiryMessage) {
                await authStore.refreshToken()
                data = await api.updateLog(log)
            }

            if (!data.body) {
                throw new Error("There was a problem updating the log")
            }
        },
        async deleteLog(log) {
            const authStore = useAuthStore()

            let data = await api.deleteLog(log)

            if (data.message === authStore.tokenExpiryMessage) {
                await authStore.refreshToken()
                data = await api.deleteLog(log)
            }

            if (data.error || data.statusCode != 200) {
                console.log(data)
                throw new Error("There was a problem deleting the log")
            }
            
            const index = this.logs.findIndex((l) => l.id === log.id)
            this.logs.splice(index, 1)
        },
    }
})