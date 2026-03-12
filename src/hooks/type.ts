import { z } from "zod";
export type ProductType = {
    id: number | string;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    sizes: string[];
    colors: string[];
    images: Record<string, string>;
};

export type ProductsType = ProductType[];

export type CartItemType= ProductType & {
    quantity:number;
    selectedSize:string;
    selectedColor:string;
};
export type CartItemsType = CartItemType[];

export const ShippingFormSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  email: z
    .string()
    .min(1, "Email không được để trống"),
  phone: z.string()
    .length(10, "Số điện thoại phải có đúng 10 chữ số")
    .regex(/^\d+$/, "Số điện thoại chỉ được chứa chữ số"),
    address: z.string().min(1, "Địa chỉ không được để trống"),
    city: z.string().min(1, "Thành phố không được để trống"),
});

export type ShippingFormInputs = z.infer<typeof ShippingFormSchema>;


const paymentMethods = [
  "cod",
  "bank_transfer",
  "momo",
  "zalopay",
  "vnpay",
] as const;

export const PaymentFormSchema = z
  .object({
    paymentMethod: z.enum(paymentMethods, {
      message: "Vui lòng chọn phương thức thanh toán",
    }),

    bankName: z.string().optional(),

    accountName: z
      .string()
      .min(2, "Tên chủ tài khoản phải có ít nhất 2 ký tự")
      .optional(),

    accountNumber: z
      .string()
      .regex(/^[0-9]{8,20}$/, "Số tài khoản không hợp lệ")
      .optional(),
  })

  // validate nếu chọn bank transfer
  .refine(
    (data) =>
      data.paymentMethod !== "bank_transfer" ||
      (data.bankName && data.accountName && data.accountNumber),
    {
      message: "Vui lòng nhập đầy đủ thông tin ngân hàng",
      path: ["bankName"],
    }
  );

export type PaymentFormInputs = z.infer<typeof PaymentFormSchema>;

export type CartStoreStateType= {
    cart: CartItemsType,
    hasHydrated: boolean,
  }

  export type CartStoresActionType = {
    addToCart : (product: CartItemType) => void,
    removeFromCart:(product:CartItemType)=>void,
    clearCart:()=>void,

  }