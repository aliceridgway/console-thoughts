import dayjs from 'dayjs'

import getFakeLogs from './fakeLogs.js';

const LOGS_URL = "https://utq5sff0a7.execute-api.us-east-1.amazonaws.com/Prod/logs"

export async function fetchLogs() {
    console.log("Fetching logs from the api...")

    const response = await fetch(
        LOGS_URL, {
        "method": "GET",
        "headers": {
            "Authorization": "Bearer " + localStorage.getItem("id_token")
        }
    }
    )
    const data = await response.json()

    return data
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