export type CarItemType = {
    id:string,
    title: string,
    url: string,
    price:number,
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

export interface VehicleType extends Base {
    price: number
    details: string
    transmission: string
    fuel: string
    name: string
    year: number
    ownerNumber: string
    kmDriven: number
    photo: any
}