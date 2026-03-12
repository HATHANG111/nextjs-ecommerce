"use client"
import useCartStore  from "@/src/stores/cartStore";
import { ProductType } from "@/src/type";
import {useState} from "react"
import Link from "next/link";
import Image from "next/image";
import {ShoppingCart} from "lucide-react";
import { toast } from "react-hot-toast"
export default function ProductCard({ product }: { product: ProductType }) {
  const [productType,setProductType] = useState({
    size:product.sizes[0],
    color:product.colors[0]
  })

  const {addToCart} = useCartStore();
  const handleAddToCart =()=> {
    addToCart({
      ...product,
      quantity:1,
      selectedSize:productType.size,
      selectedColor:productType.color
    });
            toast.success("Product added to cart");
  }

  const handleProductType = ({type,value} : {type : "size" | "color", value:string}) => {
   setProductType((prev)=> ({
    ...prev,
    [type]:value
   }))
  }
    return (
     <div className="shadow-lg rounded-lg overflow-hidden">
        <Link href= {`/product/${product.id}`}>
          <div className ="relative aspect-[2/3]">
          <Image src={product.images[productType.color]} 
          alt={product.name}  fill className=" object-cover hover:scale-105 transition-all duration-300" />
    </div>
    
        {/* PRODUCT DETAIL */}      
        </Link>
<div className="flex flex-col h-full gap-2 p-4">
  <h1 className="text-base font-medium line-clamp-2">
    {product.name}
  </h1>

  <p className="text-sm text-gray-500 line-clamp-2">
    {product.shortDescription}
  </p>

  {/* PRODUCT TYPES */}
  <div className="flex items-center text-xs mt-1">
    <div className="flex flex-col gap-1">
      <span className="text-gray-500">Sizes</span>

      <select id="size"
        name="size"
        className="w-10 ring-1 ring-gray-300 rounded-md py-1"
      onChange={(e)=> handleProductType({type:"size", value:e.target.value})}  
      >
        {product.sizes.map((size) => (
          <option key={size} value={size}>
            {size.toUpperCase()}
          
          </option>
        ))}
      </select>
    </div>
    {/* COLORs */}
  <div className="flex flex-col gap-1 ">
    <span className="text=gray-500">Color</span>
   <div className="flex items-center gap-2">
  <div className="flex gap-2">
    {product.colors.map((color) => (
      <div
        key={color}
        onClick={() => handleProductType({ type: "color", value: color })}
        className={`cursor-pointer border ${
          productType.color === color
            ? "border-gray-400"
            : "border-gray-200"
        } rounded-full p-[2px]`}
      >
        <div
          className="w-[14px] h-[14px] rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    ))}
  </div>
</div>
  </div>
  </div>
  {/* PRICE */}
  <div className=" flex items-center justify-between">
 <p className="text-medium">{product.price.toFixed(2)}</p>
 <button onClick={handleAddToCart} className=" ring ring-gray-200 shadow-lg rounded-md text-sm cursor-pointer px-4 py-2 duration-300 trasition-all hover:text-white hover:bg-black flex items-center gap-2 ">
  <ShoppingCart className="w-4 h-4"/>
  Add to Cart
 </button>
  </div>
</div>
    </div>
    )
}