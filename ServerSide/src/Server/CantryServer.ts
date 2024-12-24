import CantryModel from "../DBModel/geografModel"
export const getAllCantry = async()=>{
const allCantry = await CantryModel.find({})
return allCantry.map(x => x.name)
}