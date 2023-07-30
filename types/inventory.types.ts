export type CarItemType = {
    id: string,
    title: string,
    url: string,
    price: number,
    className?: string
}
export type PriceType = {
    amount: number
}

type Base = {
    _type: string
    _id: string
    _updatedAt: Date
    _createdAt: Date
    _rev: string
}

type ReferenceType = {
    "_ref": string,
    "_type": string
}
type PhotoType = {
    "_type": string,
    "_key": string,
    "asset": ReferenceType
}
export interface VehicleType extends Base {
    price: number
    details: string
    transmission: string
    fuel: string
    name: string
    year: number
    ownerNumber: string
    kmDriven: number
    photo: PhotoType[]
    user: {
        name: string
        phoneNumber: number
    }
}
