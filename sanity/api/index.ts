import { client } from "../lib/client"

const getAllVehicles = () => {
  console.log("api called");
  
    return client.fetch(`*[_type=="vehicle"]{
        _id,
        photo,
        name,
        price
      }`)

}
const getVehicleById = ({ id }: { id: string }) => {
    return client.fetch(`*[_type=="vehicle"&& _id==$id ][0]{
        ...,
          user->{
            name,phoneNumber
          } 
        }`, {
        id
    })

}

export {
    getAllVehicles,
    getVehicleById
}