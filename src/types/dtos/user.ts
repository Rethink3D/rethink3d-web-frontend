export interface UserAddressDTO {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  complement?: string;
}

export interface UserProfileDTO {
  id: string;
  name: string;
  lastName: string;
  identification: string;
  identificationType: string;
  email: string;
  phone: string;
  imageUrl: string;
  address: UserAddressDTO;
  creationTime: string;
  makerId?: string;
}
