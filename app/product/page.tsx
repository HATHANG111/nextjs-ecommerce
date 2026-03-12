import ProductList from "@/components/shop/ProductList";
export default function ProductPage({searchParams,} 
    : {searchParams :{category?:string}}
) {
    const category = searchParams.category ?? "";
    return (
        <div>
        <ProductList category={category} />
        </div>
    )
}