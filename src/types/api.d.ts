export interface ApiResponse<T> {
  data: T;
  message?: string;
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
}

export interface Category {
  id?: number | undefined;
  name?: string | undefined;
}

export interface Attribute {
  id?: number | undefined;
  name?: string | undefined;
}

export interface User {
  id?: number | undefined;
  email?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  phoneNumber?: string | undefined;
  username?: string | undefined;
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
  shippingMethod?: string | undefined;
  shippingPrice?: number | undefined;
  paymentMethod?: string | undefined;
  discount?: number | undefined;
  vat?: number | undefined;
  subTotal?: number | undefined;
  totalPrice?: number | undefined;
}
