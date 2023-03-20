import dayjs from 'dayjs'

import getFakeLogs from './fakeLogs.js';

export function fetchLogs() {
    console.log("Pretending to fetch logs from the api...")
    return getFakeLogs(100);
}

export function addLog(formData) {
    console.log("Pretending to send data to the api...")
    
    return {
        ...formData,
        id: Math.floor(Math.random() * 1000000),
        active: true,
        timestamp: dayjs().toISOString(),
    }
}

export function toggleActive(log) {
    console.log("Pretending to update a log in the DB...")

    log.active = !log.active

    return log
}

export function deleteLog(log) {
    console.log("Pretending to delete a log from the DB...")

    return log.id
}

export default {
    fetchLogs,
    addLog,
    toggleActive,
    deleteLog,
}