import {DEFAULT_CATEGORY, CATEGORIES} from "../constants/categories"

import dayjs from "dayjs"

export function getLogCategory(log){
    // Extracts the category from the log.
    const [typedCategory,] = splitLog(log)

    return categorize(typedCategory)
}

export function getLogText(log){
    // Extracts the text from the log.
    
    const [typedCategory, text] = splitLog(log)

    const categoryIsDefault = categorize(typedCategory) === DEFAULT_CATEGORY.name

    return categoryIsDefault ? log : text
}

export function formatLogs(logs){
    return logs.map( (log, index) => {

        const previousLog = index > 0 ? logs[index - 1] : null
        
        return formatSingleLog(log, previousLog)
    })
}

function formatSingleLog(currentLog, previousLog){
    const logDate = dayjs(currentLog.timestamp)
    const previousLogDate = previousLog ? dayjs(previousLog.timestamp) : null

    currentLog.isFirstOfDay = previousLog ? logDate.isAfter(previousLogDate, 'day') : true
    currentLog.formattedDate = logDate.format("dddd DD MMMM")
    currentLog.time = logDate.format("HH:mm:ss")
    
    return currentLog
}

export function isCategorized(category) {
    return category !== DEFAULT_CATEGORY.name
}

function splitLog(log){
    // Attempts to split the log into a category and text.

    if (!log.startsWith("/")){
        return [DEFAULT_CATEGORY.name, log]
    }

    if (!log.includes(" ")){
        return [DEFAULT_CATEGORY.name, log]
    }

    const typedCategory = log.split("/")[1].split(" ")[0].toLowerCase()

    const text = log.replace(`/${typedCategory}`, "").trim()

    return [typedCategory, text]
}

function categorize(category){
    // Attempts to categorize the log.
    return CATEGORIES.map(x => x.name).includes(category) ? category : DEFAULT_CATEGORY.name
}

export default {
    getLogCategory,
    getLogText,
    formatLogs,
    isCategorized,
}