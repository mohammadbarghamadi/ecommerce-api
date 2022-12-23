interface QueryInt {
    csort?: 'dsc' | 'asc'
    usort?: 'dsc' | 'asc'
    price?: 'dsc' | 'asc'
    limit?: number
    skip?: number
    keyphrase?: string
    match?: {}
}

type CreatedAt = 'createdAt' | '-createdAt'
type UpdatedAt = 'updatedAt' | '-updatedAt'


type QueryHandler = (query: QueryInt) => { createdAt: CreatedAt, updatedAt: UpdatedAt, limit: number, skip: number, price: string, keyphrase: string }

export const queryHandler: QueryHandler = (query) => {

    let createdAt: CreatedAt = 'createdAt'
    let updatedAt: UpdatedAt = 'updatedAt'
    let price: string = 'price'
    let skip = 0
    let limit = 0
    let keyphrase: string = ''

    if (query.csort === 'dsc') createdAt = '-createdAt'
    if (query.usort === 'dsc') updatedAt = '-updatedAt'
    if (query.price === 'dsc') price = '-price'

    if (query.csort === 'asc') createdAt = 'createdAt'
    if (query.usort === 'asc') updatedAt = 'updatedAt'
    if (query.price === 'asc') price = 'price'

    if (query.skip) skip = +query.skip
    if (query.limit) limit = +query.limit
    if (query.keyphrase) keyphrase = query.keyphrase

    return { createdAt, updatedAt, limit, skip, price, keyphrase }

}