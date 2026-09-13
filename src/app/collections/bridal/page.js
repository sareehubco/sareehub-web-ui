import CollectionDetail from "@/components/collection-detail";
import { PRODUCTS } from "./data";

export const metadata = { title: "Bridal Collection — SareeHub" };

export default function BridalCollectionPage() {
  return (
    <CollectionDetail
      title="Bridal Collection"
      subtitle="For the moments that matter forever."
      bannerImage="/images/banners/bridal.png"
      products={PRODUCTS}
    />
  );
}
