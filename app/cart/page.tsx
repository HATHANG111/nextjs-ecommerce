"use client"
import { ShippingFormInputs } from "@/type";
import { useSearchParams,useRouter } from "next/navigation";
import { ArrowRight,Trash2 } from "lucide-react";
import ShippingForm from "@/components/shop/ShippingForm";
import PaymentForm from "@/components/shop/PaymentForm";
import Image from "next/image";
import useCartStore from "@/src/stores/cartStore";
import { useState } from "react";
const steps= [
    {
        id:1,
        tittle:"Shopping Cart"
    },
    {
        id:2,
        tittle:"Shipping Details"
    },
    {
        id:3,
        tittle:"Payment"
    }
]
// const cartItems: CartItemsType = [
//      {
//     id: 1,
//     name: "Adidas CoreFit T-Shirt",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 39.9,
//     sizes: ["s", "m", "l", "xl", "xxl"],
//     colors: ["gray", "purple", "green"],
//     images: {
//       gray: "/products/1g.png",
//       purple: "/products/1p.png",
//       green: "/products/1gr.png",
//     },
//     quantity:1,
//     selectedSize:"m",
//     selectedColor:"gray"
//   },
//   {
//     id: 2,
//     name: "Puma Ultra Warm Zip",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 59.9,
//     sizes: ["s", "m", "l", "xl"],
//     colors: ["gray", "green"],
//     images: { gray: "/products/2g.png", green: "/products/2gr.png" },
//     quantity:2,
//     selectedSize:"m",
//     selectedColor:"gray"
//   },
//   {
//     id: 3,
//     name: "Nike Air Essentials Pullover",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 69.9,
//     sizes: ["s", "m", "l"],
//     colors: ["green", "blue", "black"],
//     images: {
//       green: "/products/3gr.png",
//       blue: "/products/3b.png",
//       black: "/products/3bl.png",
//     },
//     quantity:3,
//     selectedSize:"m",
//     selectedColor:"green"
//   },

// ]
export default function CartPage() {
    const searchParams = useSearchParams();
     const activeSteps = parseInt(searchParams.get("step") || "1");
     const router= useRouter();
    const [shippingForm,setShippingForm] = useState<ShippingFormInputs>();
    const {cart,removeFromCart} = useCartStore();
    const cartItems = cart
    return (
        <div className="flex flex-col gap-8 items-center justify-center mt-12 ">
            <h1 className="text-2xl font-medium">Shopping Cart</h1>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {steps.map((step)=> (
                <div className={`flex items-center gap-2 border-b-2 pb-4 ${step.id === activeSteps ? "font-bold" : "text-gray-500"}`} key={step.id}>
             <div className={`w-6 h-6 rounded-full text-white p-2 flex items-center justify-center ${step.id === activeSteps ? "bg-black" : "bg-gray-400"}`}>{step.id}</div>
             <p className={`text-sm font-medium ${step.id === activeSteps ? "text-gray-800" : "text-gray-300"}`}>{step.tittle}</p>
                </div>
            ))}
            </div>
            {/* STEPS AND DETAIL */}
            <div className=" w-full flex flex-col lg:flex-row gap-16">
                {/* STEPS */}
                <div className=" w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 ">
                {activeSteps ===1 ? (
                    <div className="flex flex-col gap-4">
                        {cartItems.map((item)=> (
                          //  Single cart item
                          <div key={item.id+item.selectedColor+item.selectedSize} className="flex items-center justify-between">
                            {/* IMAGE AND DETAIL */}
                            <div className="flex gap-8">
                              <div className="relative w-24 h-26 rounded-lg overflow-hidden">
                                <Image src={item.images[item.selectedColor]} alt={item.name} fill className="object-content " />
                              </div>
                              {/* DETAIL */}
                              <div className="flex flex-col justify-between">
                               <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-xs text-gray-500">Quantity:{item.quantity}</p>
                                <p className="text-xs text-gray-500">Size:{item.selectedSize}</p>
                                <p className="text-xs text-gray-500">Color:{item.selectedColor}</p>
                               </div>
                               <p className="font-medium">{item.price}$</p>
                              </div>
                            </div>
                            {/* DETAIL */}                       
                            {/* DELETE */}
                            <button onClick={()=> removeFromCart(item)}  className="flex items-center w-8 h-8 rounded-full bg-red-100 duration-300 text-red-400 hover:bg-red-200 justify-center transition-all">
                              <Trash2 className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        ))}
                    </div>
                ) : activeSteps === 2 ? (<ShippingForm setShippingForm={setShippingForm}/>)
                :activeSteps ===3 && shippingForm  ? 
                (<PaymentForm/>)  
                : (
                  <p className="text-gray-500">Please complete the previous steps</p>
                )
                      }
                </div>
                {/* DETAILS */}
                <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max ">
                <h2 className="font-semibold">Cart Detail</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex  justify-between text-sm">
                    <p className="text-gray-500">Subtotal</p>
                    <p className="font-medium">
                      ${(cartItems.reduce((total,item)=> total +item.price * item.quantity,0) +10 -5).toFixed(2)}
                    </p>
                    </div>
                     <div className="flex  justify-between text-sm">
                    <p className="text-gray-500">Discount(10%)</p>
                    <p className="font-medium">
                      $10
                    </p>
                    </div>
                     <div className="flex  justify-between text-sm">
                    <p className="text-gray-500">Shipping Fee</p>
                    <p className="font-medium">
                      $5
                    </p>
                    </div>
                    <hr className ="text-gray-300"></hr>
                      <div className="flex  justify-between text-sm">
                    <p className="text-gray-500">Total</p>
                    <p className="font-medium">
                      ${ (cartItems.reduce((total,item)=> total +item.price * item.quantity,0)).toFixed(2)}
                    </p>
                    </div>
                {activeSteps === 1 && (
                    <button  onClick={() =>router.push("/cart?step=2",{scroll :false})} className="w-full bg-gray-800 hover:bg-gray-900 transition-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center"
                      >Continue
                        <ArrowRight/>
                    </button>
                )}
                  
                </div>
                </div>
            </div>
        </div>
    )
}