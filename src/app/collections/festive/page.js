import CollectionDetail from "@/components/collection-detail";
import productService from "@/api/ProductService";

export const metadata = { title: "Festive Collection — SareeHub" };

export default async function FestiveCollectionPage() {
  const products = await productService.getProductsByCategory("festive");
  return (
    <CollectionDetail
      title="Festive Collection"
      subtitle="Celebrate every moment in style."
      bannerImage="/images/banners/festive.png"
      products={products}
    />
  );
}
