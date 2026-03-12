import ProductList from "@/components/shop/ProductList";
import Image from "next/image";

const Homepage =({
  searchParams,}: {searchParams: { category?: string };
}) => {
  const category = searchParams.category?? "";
  return (
    <div className="">
      <div className="relative aspect-[3/1] mb-12">
        <Image src="/featured.png" alt="Featured Product" fill />
      </div>
      <ProductList category={category} />
    </div>
  );
};

export default Homepage;