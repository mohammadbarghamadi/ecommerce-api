import { RequestHandler } from "express"
import { LoggerOptions } from "../types/types"
import { existsSync, mkdir, writeFile, appendFile, stat } from 'fs'
import { randomUUID } from "crypto"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

type Logger = (options: LoggerOptions) => Promise<void>

export const logger: Logger = async ({ ip, method, originalUrl, errorName, errorMessage, status }) => {

    let date = new Date().toLocaleString()
    let template = `${date}   ${randomUUID()}   ${ip}   ${originalUrl}   Method: ${method}`
    if (errorName || errorMessage) template = template + `   Status: ${status}   ${errorName || 'Error'}: ${errorMessage}`
    template = template + '\n'

    const logPath = path.join(__dirname, '../logs')
    const logsEvent = path.join(__dirname, '../logs/events.txt')
    const errorEvent = path.join(__dirname, '../logs/errors.txt')

    if (!existsSync(logPath)) mkdir(logPath, (err) => { if (err) console.log(err) })
    if (!existsSync(logsEvent)) writeFile(logsEvent, '', (err) => { if (err) console.log(err) })
    if (!existsSync(errorEvent)) writeFile(errorEvent, '', (err) => { if (err) console.log(err) })

    if (errorName || errorMessage) appendFile(errorEvent, template, (err) => { if (err) console.log(err) })
    else appendFile(logsEvent, template, (err) => { if (err) console.log(err) })
}

export const events: RequestHandler = async (req, res, next) => {
    const { ip, originalUrl, method } = req
    logger({ ip, originalUrl, method })
    next()
}