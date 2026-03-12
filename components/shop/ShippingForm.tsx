import { ShippingFormInputs,shippingFormSchema } from "@/src/type";
import {useForm,SubmitHandler} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
export default function ShippingForm({setShippingForm}: {setShippingForm : (data:ShippingFormInputs) => void}) {
    const {register,handleSubmit,formState:{errors}}= useForm<ShippingFormInputs>({
        resolver:zodResolver(shippingFormSchema)
    })
    const router = useRouter();
    const handleShippingForm:SubmitHandler<ShippingFormInputs> = (data) => {
        setShippingForm(data)
        router.push("/cart?step=3",{scroll :false})
    } 

    return (
        <form className="flex flex-col gap-4 " onSubmit={handleSubmit(handleShippingForm)} >
  {/* NAME */}
  <div className="flex flex-col gap-1">
    <label htmlFor="name" className="text-xs text-gray-400 font-medium  ">
      Họ và tên
    </label>

    <input
      id="name"
      type="text"
      placeholder="Nguyễn Văn A"
      {...register("name")}
      className="border-b border-gray-300 outline-none text-sm py-1"
    />

    {errors.name && (
      <p className="text-red-500 text-xs">{errors.name.message}</p>
    )}
  </div>

  {/* EMAIL */}
  <div className="flex flex-col gap-1">
    <label htmlFor="email" className="text-xs text-gray-400 font-medium">
      Email
    </label>

    <input
      id="email"
      type="email"
      placeholder="example@gmail.com"
      {...register("email")}
      className="border-b border-gray-300 outline-none text-sm py-1"
    />

    {errors.email && (
      <p className="text-red-500 text-xs">{errors.email.message}</p>
    )}
  </div>

  {/* PHONE */}
  <div className="flex flex-col gap-1">
    <label htmlFor="phone" className="text-xs text-gray-400 font-medium">
      Số điện thoại
    </label>

    <input
      id="phone"
      type="text"
      placeholder="0912345678"
      {...register("phone")}
      className="border-b border-gray-300 outline-none text-sm py-1"
    />

    {errors.phone && (
      <p className="text-red-500 text-xs">{errors.phone.message}</p>
    )}
  </div>

  {/* ADDRESS */}
  <div className="flex flex-col gap-1">
    <label htmlFor="address" className="text-xs text-gray-400 font-medium">
      Địa chỉ
    </label>

    <input
      id="address"
      type="text"
      placeholder="123 Y Yên, Nam Định"
      {...register("address")}
      className="border-b border-gray-300 outline-none text-sm py-1"
    />

    {errors.address && (
      <p className="text-red-500 text-xs">{errors.address.message}</p>
    )}
  </div>

  {/* CITY */}
  <div className="flex flex-col gap-1">
    <label htmlFor="city" className="text-xs text-gray-400 font-medium">
      Thành phố
    </label>

    <input
      id="city"
      type="text"
      placeholder="Hà Nội"
      {...register("city")}
      className="border-b border-gray-300 outline-none text-sm py-1"
    />

    {errors.city && (
      <p className="text-red-500 text-xs">{errors.city.message}</p>
    )}
  </div>
<button className="w-full bg-gray-800 hover:bg-gray-900 transition-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center">
    Continue
    <ArrowRight/>
     </button>
</form>
    )
} 