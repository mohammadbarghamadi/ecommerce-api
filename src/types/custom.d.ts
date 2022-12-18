declare namespace Express {
    export interface Request {
       user?: {
         role: Number
         tokens?: { token: string }[]
         save: () => Promise
         genResetToken: () => Promise
      },
      token: string
   }
}
 