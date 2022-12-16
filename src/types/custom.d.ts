declare namespace Express {
    export interface Request {
       user?: {
         name: string
         username: string
         email: string
         address?: Types.ObjectId
         phone?: string
         password: string
         role: number
         tokens?: { token: string }[]
         resetToken?: string
         resetExpire?: string
         save: () => Promise
      },
      token: string
   }
}
 