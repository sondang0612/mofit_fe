import {
  EOrderStatus,
  EPaymentMethod,
  EShippingMethod,
} from "@/utils/constants/order.enum";
import { ERole } from "@/utils/constants/role.enum";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  total?: number;
}

export interface Product {
  id?: number | undefined;
  title?: string | undefined;
  price?: number | undefined;
  imgSrc?: string | undefined;
  imgSrc2?: string | undefined;
  ratings?: number | undefined;
  totalReviews?: string | undefined;
  price?: number | undefined;
  category?: Category | undefined;
  attributes?: Attribute[] | undefined;
  discount?: Discount | undefined;
  shortDescription?: string | undefined;
  description?: string | undefined;
  sku?: string | undefined;
  slug?: string | undefined;
}

export interface Category {
  id?: number | undefined;
  name?: string | undefined;
  imgSrc?: string | undefined;
  parentCategory?: Category | undefined;
  subCategories?: Category[] | undefined;
}

export interface Brand {
  id?: number | undefined;
  name?: string | undefined;
  totalProducts?: number | undefined;
}

export interface Attribute {
  id?: number | undefined;
  label?: string | undefined;
  value: string | undefined;
}

export interface User {
  id?: number | undefined;
  email?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  phoneNumber?: string | undefined;
  username?: string | undefined;
  role?: ERole | undefined;
}

export interface CartItem {
  id: number | undefined;
  quantity?: number | undefined;
  product?: Product | undefined;
}

export interface Address {
  id?: number | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  city?: string | undefined;
  district?: string | undefined;
  streetAddress?: string | undefined;
  note?: string | undefined;
  isDefault?: string | undefined;
  phoneNumber?: string | undefined;
  user?: User | undefined;
}

export interface OrderItem {
  id?: number | undefined;
  product?: Product | undefined;
  quantity?: number | undefined;
}

export interface Order {
  id?: number | undefined;
  orderItems?: OrderItem[] | undefined;
  shippingMethod?: EShippingMethod | undefined;
  shippingPrice?: number | undefined;
  paymentMethod?: EPaymentMethod | undefined;
  status?: EOrderStatus | undefined;
  discount?: number | undefined;
  vat?: number | undefined;
  subTotal?: number | undefined;
  totalPrice?: number | undefined;
  txnRef?: string | undefined;
}

export interface Category {
  id?: number | undefined;
  name?: string | undefined;
}

export interface Discount {
  id?: number | undefined;
  percentage?: number | undefined;
}

export interface Contact {
  id?: number | undefined;
  email?: string | undefined;
  name?: string | undefined;
  message?: string | undefined;
}

export interface Attribute {
  id?: number | undefined;
  label?: string | undefined;
  value?: string | undefined;
}
