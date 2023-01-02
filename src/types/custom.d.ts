declare namespace Express {
    export interface Request {
       user?: {
         role: Number
         mobile?: string
         email?: string
         name?: string
         tokens?: { token: string }[]
         _id: string
         save: () => Promise
         delete: () => Promise
      },
      token: string
   }
}
 