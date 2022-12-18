import { Request, Response, NextFunction } from "express"
export enum ROLES {
    Root = 1000,
    Admin = 1100,
    Seller = 1500,
    Customer = 2000
}

export enum Access {
    Just = 0,
    Higher = 10,
    Lower = 20
}

export const Role = (role: number, access: Access = Access.Higher) =>
    (req: Request, res: Response, next: NextFunction) => {
        if (access === Access.Higher) if (req.user?.role! <= role) return next()
        if (access === Access.Lower) if (req.user?.role! >= role) return next()
        if (access === Access.Just) if (req.user?.role! === role) return next()
        next({ status: 403, message: 'You have insufficient permission!' })
    }