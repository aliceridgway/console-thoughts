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
            return logHelper.formatLogs(this.logs)
        }
    },
    actions: {
        async fetchLogs() {

            const authStore = useAuthStore()
            let data = await api.fetchLogs()

            console.log(data)

            if (data.message === authStore.tokenExpiryMessage) {
                await authStore.refreshToken()
                data = await api.fetchLogs()
            }

            console.log(data)

            if (!data.body.Items) {
                throw new Error("There was a problem fetching logs")
            }

            this.logs = data.body.Items

        },
        addLog(formData) {
            const log = api.addLog(formData)
            this.logs.push(log)
        },
        toggleLogActivity(log) {
            const updatedLog = api.toggleActive(log)
            const index = this.logs.findIndex((l) => l.id === log.id)
            this.logs.splice(index, 1, updatedLog)
        },
        deleteLog(log) {
            api.deleteLog(log)
            const index = this.logs.findIndex((l) => l.id === log.id)
            this.logs.splice(index, 1)
        },
    }
})