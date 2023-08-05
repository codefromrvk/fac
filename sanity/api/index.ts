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
        ...,
          user->{
            name,phoneNumber
          } 
        }`, {
    id
  })

}
const getDraftVehicle = ({ id }: { id: string }) => {
  const query = `*[
    _type == "vehicle" && 
    name == $name && 
    !(_id in path("drafts.**") 
  ]._id`
  return client.fetch(query, { name: name })

}

export {
  getAllVehicles,
  getVehicleById
}