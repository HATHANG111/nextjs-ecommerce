"use client"
import Link from "next/link";
import useCartStore from "@/src/stores/cartStore";
import { ShoppingCart } from "lucide-react";
export default function  ShoppingCartIcon() {
    const {cart, hasHydrated}= useCartStore()
    if (!hasHydrated) return null;
    return  (
        <Link href="/cart" className="relative">
            <ShoppingCart className=" w-4 h-4 text-gray-600"/>
           <span className="absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-xs">
            {cart.reduce((total,item)=> total + item.quantity,0)}
           </span>
             </Link>
    )  
}