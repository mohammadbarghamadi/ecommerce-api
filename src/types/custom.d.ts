declare namespace Express {
    export interface Request {
       user?: {
         tokens?: { token: string }[]
         save: () => Promise
      },
      token: string
   }
}
 