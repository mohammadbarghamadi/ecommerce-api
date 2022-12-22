import path, { dirname } from 'path'
import { fileURLToPath } from "url"
const __dirname = dirname(fileURLToPath(import.meta.url))

type GenerateFilePath = (name: string, mimetype: string) => string

export const genFilePath: GenerateFilePath = (name: string, mimetype: string) => {
    const currDate = new Date()
    const datePath = currDate.getFullYear() + '/' + (currDate.getMonth() + 1) + '/' + currDate.getDate()
    const randName = Math.floor(Math.random() * 9999999)
    const fileName = Date.now() + '-' + randName + name.substring(name.lastIndexOf('.'), name.length)
    return path.join(__dirname, `../files/${mimetype.split('/')[0]}s/${datePath}/`, fileName)
}