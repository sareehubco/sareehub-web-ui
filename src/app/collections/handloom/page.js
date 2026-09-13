import CollectionDetail from "@/components/collection-detail";
import productService from "@/api/ProductService";

export const metadata = { title: "Handloom Treasures — SareeHub" };

export default async function HandloomPage() {
  const products = await productService.getProductsByCategory("handloom");
  return (
    <CollectionDetail
      title="Handloom Treasures"
      subtitle="Rooted in tradition, woven with heritage."
      bannerImage="/images/banners/handloom.png"
      products={products}
    />
  );
}
