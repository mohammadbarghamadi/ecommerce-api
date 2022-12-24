import { SortOrder } from "mongoose"

interface QueryInt {
    csort?: 'dsc' | 'asc'
    usort?: 'dsc' | 'asc'
    price?: 'dsc' | 'asc'
    limit?: number
    skip?: number
    keyphrase?: string
    match?: {}
}


type QueryHandler = (query: QueryInt) => { createdAt: SortOrder, updatedAt: SortOrder, limit: number, skip: number, price: SortOrder, keyphrase: string }

export const queryHandler: QueryHandler = (query) => {

    let createdAt: SortOrder = 1
    let updatedAt: SortOrder = 1
    let price: SortOrder = 1
    let skip = 0
    let limit = 0
    let keyphrase: string = ''

    if (query.csort === 'dsc') createdAt = -1
    if (query.usort === 'dsc') updatedAt = -1
    if (query.price === 'dsc') price = -1

    if (query.csort === 'asc') createdAt = 1
    if (query.usort === 'asc') updatedAt = 1
    if (query.price === 'asc') price = 1

    if (query.skip) skip = +query.skip
    if (query.limit) limit = +query.limit
    if (query.keyphrase) keyphrase = query.keyphrase

    return { createdAt, updatedAt, limit, skip, price, keyphrase }

}