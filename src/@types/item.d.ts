type IImage = {
  url?: string;
  alt?: string;
};
type IAddress = {
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  // zip?: string;
};
// type IPrice = {
//   value: number;
//   currency: string;
// };

type IItemInput = {
  address: IAdress;
  image?: IImage;
  phone: string;
  title: string;
  brand: string;
  price: number;
  category: string;
  size?: string;
  description: string;
  price: IPrice;
  status?: string;
};
// type IPayment = {
//   cardNumber: number;
//   expirationDate: string;
//   cvv: string;
//   id: string;
// };
type IItem = IItemInput & {
  itemNumber?: number;
  userId?: string;
  _id?: string;
  likes: string[];
  createdAt: Date;
  saleDate: Date;

  //payment?: IPayment;
};

export { IItem, IItemInput, IAddress, IImage };
