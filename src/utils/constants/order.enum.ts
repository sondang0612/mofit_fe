export enum EOrderStatus {
  DRAFT = "draft",
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELED = "canceled",
  RETURNED = "returned",
}

export enum EShippingMethod {
  OWN_DELIVERY = "own_delivery",
}

export enum EPaymentMethod {
  COD = "cod",
  PAYMENT_GATEWAY = "payment_gateway",
}

export enum EPaymentStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDING = "refunding",
  REFUNDED = "refunded",
  COD = "cod",
}

export const EOrderStatusLabel = {
  [EOrderStatus.DRAFT]: "Đơn nháp",
  [EOrderStatus.PENDING]: "Chờ xử lý",
  [EOrderStatus.PROCESSING]: "Đang xử lý",
  [EOrderStatus.SHIPPED]: "Đang vận chuyển",
  [EOrderStatus.DELIVERED]: "Đã giao",
  [EOrderStatus.CANCELED]: "Đã huỷ",
  [EOrderStatus.RETURNED]: "Đã trả hàng",
};

export const EPaymentMethodLabel = {
  [EPaymentMethod.COD]: "Tiền mặt",
  [EPaymentMethod.PAYMENT_GATEWAY]: "Chuyển khoản",
};

export const EShippingMethodLabel = {
  [EShippingMethod.OWN_DELIVERY]: "Tự vận chuyển",
};
