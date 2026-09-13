import CollectionDetail from "@/components/collection-detail";
import productService from "@/api/ProductService";

export const metadata = { title: "Bridal Collection — SareeHub" };

export default async function BridalCollectionPage() {
  const products = await productService.getProductsByCategory("bridal");
  return (
    <CollectionDetail
      title="Bridal Collection"
      subtitle="For the moments that matter forever."
      bannerImage="/images/banners/bridal.png"
      products={products}
    />
  );
}
