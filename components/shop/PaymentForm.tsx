"use client"
import { PaymentFormInputs, paymentFormSchema } from "@/src/type"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PaymentForm() {

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema)
  })

  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = (data) => {
    console.log(data)
    router.push("/cart?step=3", { scroll: false })
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handlePaymentForm)}
    >

      {/* PAYMENT METHOD */}
      <div className="flex flex-col gap-2">

        <label className="text-xs text-gray-400 font-medium">
          Phương thức thanh toán
        </label>

        <label className="flex gap-2">
          <input type="radio" value="cod" {...register("paymentMethod")} />
          Thanh toán khi nhận hàng (COD)
        </label>

        <label className="flex gap-2">
          <input type="radio" value="bank_transfer" {...register("paymentMethod")} />
          Chuyển khoản ngân hàng
        </label>

        <label className="flex gap-2">
          <input type="radio" value="momo" {...register("paymentMethod")} />
          MoMo
        </label>

        <label className="flex gap-2">
          <input type="radio" value="zalopay" {...register("paymentMethod")} />
          ZaloPay
        </label>

        <label className="flex gap-2">
          <input type="radio" value="vnpay" {...register("paymentMethod")} />
          VNPay
        </label>

        {errors.paymentMethod && (
          <p className="text-red-500 text-xs">
            {errors.paymentMethod.message}
          </p>
        )}

      </div>

      <button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-900 transition text-white p-2 rounded-lg cursor-pointer flex items-center justify-center"
      >
        Checkout
        <ShoppingCart className="w-4 h-4 text-white"/>
      </button>

    </form>
  )
}