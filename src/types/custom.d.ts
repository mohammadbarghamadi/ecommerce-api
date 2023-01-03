declare namespace Express {
    export interface Request {
       user?: {
         role: Number
         mobile?: string
         email?: string
         name?: string
         isAuthenticated?: boolean
         tokens?: { token: string }[]
         _id: string
         save: () => Promise
         delete: () => Promise
      },
      token: string
   }
}
 