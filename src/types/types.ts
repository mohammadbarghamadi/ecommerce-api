export interface FilesNameSchemaInt {
    name: string
    md5: string
    size: number
    mimetype: string
    encoding: string
    filepath: string
    userId: string
    mv: () => {}
}

export interface FilesNameErrorInt {
    status: boolean
    message?: string
}