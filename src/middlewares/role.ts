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

export const Role = (role: number, access: Access = Access.Higher) => () => {

    

}