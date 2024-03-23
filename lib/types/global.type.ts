import { StaticImageData } from "next/image";

export type Assurance = {
  price: number;
  name: string;
  img: StaticImageData;
  country: string;
};

export type ActiveSubscription = {
  name: string;
  logo: StaticImageData;
  subscriptionDate: string;
  expiredDate: string;
  payedPrice: number;
  lastPayment: string;
};
