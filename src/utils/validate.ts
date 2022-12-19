


type IsValidRequest = (body: {}, list: string[]) => boolean

export const isValidReq: IsValidRequest = (body, list) => {
    const element = Object.keys(body)
    const isMatch = element.every(item => list.includes(item))
    return isMatch
}