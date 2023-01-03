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

export interface CartArrayInt {
    prodId: string
    quantity: number
    price: number
}

export enum PaymentState {
    Ready = 'READY',
    Pending = 'PEDNDING',
    Success = 'SUCCESS',
    Cancel = 'CANCEL'
}

export enum CommentStatus {
    Pending = 'PENDING',
    Approved = 'APPROVED',
    Rejected = 'REJECTED'
}

export enum CommentRating {
    VeryBad = 1,
    Bad = 2,
    Ok = 3,
    Good = 4,
    VeryGood = 5
}

export interface ZarinGatewayReqInt {
    merchant_id: string
    amount: number
    description: string
    callback_url: string
    mobile?: string
    email?: string
}

export interface PaymentOptionsInt {
    amount: number
    description: string
    mobile?: string
    email?: string
}

export interface LoggerOptions {
    ip: string
    originalUrl: string
    method: string
    errorName?: string
    errorMessage?: string,
    status?: number
}