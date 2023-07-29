import { client } from "../lib/client"

const getAllVehicles = () => {
    return client.fetch(`*[_type=="vehicle"]{
        _id,
        photo,
        name,
        price
      }`)

}
const getVehicleById = ({ id }: { id: string }) => {
    return client.fetch(`*[_type=="vehicle"&& _id==$id ][0]{
        _id,
        photo,
          name,
          price
      }`, {
        id
    })

}

export {
    getAllVehicles,
    getVehicleById
}