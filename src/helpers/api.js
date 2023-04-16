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


export async function addLog(formData) {
    console.log("Adding Log...")

    const response = await fetch(LOGS_URL, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("id_token")
        },
        "body": JSON.stringify(formData)
    })

    const data = await response.json()

    console.log(data)

    return data
}

export async function updateLog(log) {
    console.log("Updating Log...")

    const response = await fetch(LOGS_URL, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("id_token")
        },
        "body": JSON.stringify(log)
    })

    const data = await response.json()
    console.log(data)

    return data
}

export async function deleteLog(log) {
    console.log("Deleting log...")

    const response = await fetch(LOGS_URL, {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("id_token")
        },
        "body": JSON.stringify(log)
    })

    const data = await response.json()

    return data
}

export default {
    fetchLogs,
    addLog,
    updateLog,
    deleteLog,
}