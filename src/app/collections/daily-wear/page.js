import CollectionDetail from "@/components/collection-detail";
import productService from "@/api/ProductService";

export const metadata = { title: "Daily Wear — SareeHub" };

export default async function DailyWearPage() {
  const products = await productService.getProductsByCategory("daily-wear");
  return (
    <CollectionDetail
      title="Daily Wear"
      subtitle="Everyday elegance, effortlessly worn."
      bannerImage="/images/banners/daily.png"
      products={products}
    />
  );
}
