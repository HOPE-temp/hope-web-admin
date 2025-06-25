import { itemsNavAdmin } from "./admin.menu"
import { itemsNavVetinarian } from "./veterinariam.menu"
import { itemsNavVolunteer } from "./volunteer.menu"


const itemList: Record<RoleUser, NavItem[]> = {
  admin: itemsNavAdmin,
  veterinarian: itemsNavVetinarian,
  volunteer: itemsNavVolunteer
}
export function navbarItems(role: RoleUser){
  console.log({role})
  return itemList[role]
}