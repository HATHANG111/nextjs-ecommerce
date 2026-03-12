import { z } from "zod";

export type ProductType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

export type ProductsType = ProductType[];

export type CartItemType = ProductType & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type CartItemsType = CartItemType[];

export const shippingFormSchema = z.object({
  name: z
    .string()
    .min(1, "Vui lòng nhập họ và tên"),

  email: z
    .string()
    .min(1, "Vui lòng nhập email")
    .email("Email không đúng định dạng"),

  phone: z
    .string()
    .regex(/^\d{10}$/, "Số điện thoại phải có đúng 10 chữ số"),

  address: z
    .string()
    .min(1, "Vui lòng nhập địa chỉ"),

  city: z
    .string()
    .min(1, "Vui lòng nhập thành phố"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;
export const paymentFormSchema = z.object({
  paymentMethod: z.enum(
    ["cod", "bank_transfer", "momo", "zalopay", "vnpay"],
    {
      message: "Vui lòng chọn phương thức thanh toán",
    }
  ),

  cardHolder: z
    .string()
    .min(1, "Vui lòng nhập tên chủ thẻ"),

  cardNumber: z
    .string()
    .min(16, "Số thẻ phải có 16 chữ số")
    .max(16, "Số thẻ phải có 16 chữ số"),

  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Ngày hết hạn phải đúng định dạng MM/YY"
    ),

  cvv: z
    .string()
    .min(3, "CVV phải có 3 chữ số")
    .max(3, "CVV phải có 3 chữ số"),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};