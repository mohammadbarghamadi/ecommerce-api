declare namespace Express {
    export interface Request {
       user?: {
         role: Number
         tokens?: { token: string }[]
         save: () => Promise
         delete: () => Promise
      },
      token: string
   }
}
 