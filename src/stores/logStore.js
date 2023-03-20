import { defineStore } from 'pinia'

import api from '../helpers/api.js'
import logHelper from '../helpers/logHelper.js'

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
        fetchLogs() {
            const logs = api.fetchLogs()
            this.logs = logs
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