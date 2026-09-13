import CollectionDetail from "@/components/collection-detail";
import productService from "@/api/ProductService";

export const metadata = { title: "Work Wear — SareeHub" };

export default async function WorkWearPage() {
  const products = await productService.getProductsByCategory("work-wear");
  return (
    <CollectionDetail
      title="Work Wear"
      subtitle="Grace that carries you through the workday."
      bannerImage="/images/banners/work.png"
      products={products}
    />
  );
}
