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
