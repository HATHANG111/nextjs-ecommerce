import ProductInterRaction from "@/components/shop/ProductInterRaction";
import { ProductType } from "@/type";
import Image from "next/image";
 const products: ProductType[] = [
   {
     id: 1,
     name: "Adidas CoreFit T-Shirt",
     shortDescription:
       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
     description:
       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
     price: 39.9,
     sizes: ["s", "m", "l", "xl", "xxl"],
     colors: ["gray", "purple", "green"],
     images: {
       gray: "/products/1g.png",
       purple: "/products/1p.png",
       green: "/products/1gr.png",
     },
  
   },
   {
     id: 2,
     name: "Puma Ultra Warm Zip",
     shortDescription:
       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
     description:
       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
     price: 59.9,
     sizes: ["s", "m", "l", "xl"],
     colors: ["gray", "green"],
     images: { gray: "/products/2g.png", green: "/products/2gr.png" },
    
   },
   {
     id: 3,
     name: "Nike Air Essentials Pullover",
     shortDescription:
       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
     description:
       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
     price: 69.9,
     sizes: ["s", "m", "l"],
     colors: ["green", "blue", "black"],
     images: {
       green: "/products/3gr.png",
       blue: "/products/3b.png",
       black: "/products/3bl.png",
     },
     
   },
   {
     id: 4,
     name: "Nike Dri Flex T-Shirt",
     shortDescription:
       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
     description:
       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
     price: 29.9,
     sizes: ["s", "m", "l"],
     colors: ["white", "pink"],
     images: { white: "/products/4w.png", pink: "/products/4p.png" },
   },
   {
     id: 5,
     name: "Under Armour StormFleece",
     shortDescription:
       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
     description:
       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
     price: 49.9,
     sizes: ["s", "m", "l"],
     colors: ["red", "orange", "black"],
     images: {
       red: "/products/5r.png",
       orange: "/products/5o.png",
       black: "/products/5bl.png",
     },
   },
   {
     id: 6,
     name: "Nike Air Max 270",
     shortDescription:
       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
     description:
       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
     price: 59.9,
     sizes: ["40", "42", "43", "44"],
     colors: ["gray", "white"],
     images: { gray: "/products/6g.png", white: "/products/6w.png" },
   },
   {
     id: 7,
     name: "Nike Ultraboost Pulse ",
     shortDescription:
       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
     description:
       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
     price: 69.9,
     sizes: ["40", "42", "43"],
     colors: ["gray", "pink"],
     images: { gray: "/products/7g.png", pink: "/products/7p.png" },
   },
   {
     id: 8,
     name: "Levi’s Classic Denim",
     shortDescription:
       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
     description:
       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
     price: 59.9,
     sizes: ["s", "m", "l"],
     colors: ["blue", "green"],
     images: { blue: "/products/8b.png", green: "/products/8gr.png" },
   },
 ];

export default async  function ProductPage  ({params,searchParams}: {params:Promise<{id:string}>; searchParams:Promise<{size:string; color:string}>}){
 
  const {id} = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }
  const {size,color} = await searchParams;
    const selectedSize = size || product.sizes[0];
    const selectedColor= color || product.colors[0];
    
    return (
        <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
            {/* IAMGE */}
            <div className="w-full lg:w-5/12 relative aspect-[2/3]">
               <Image src={product.images[selectedColor]} alt={product.name} fill className="object-contain rounded-md"/>
            </div>
            {/* DETAIL */}
            <div className="w-full lg:w-7/12 flex flex-col gap-8">
                <h1 className="text-2xl font-medium">{product.name}</h1>
                <p className="text-gray-500"> {product.description}</p>
                 <h2 className="text-xl font-medium">${product.price.toFixed(2)}</h2>
                 <ProductInterRaction product={product} selectedSize={selectedSize} selectedColor={selectedColor}/>
                    </div>
            </div>
    )
}