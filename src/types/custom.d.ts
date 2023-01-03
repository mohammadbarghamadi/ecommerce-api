declare namespace Express {
    export interface Request {
      cred: {
         user: {
            role: Number
            mobile?: string
            email?: string
            name?: string
            tokens?: { token: string }[]
            _id: string
            save: () => Promise
            delete: () => Promise
         },
         isAuthenticated?: boolean
         token: string
      }
   }
}
 