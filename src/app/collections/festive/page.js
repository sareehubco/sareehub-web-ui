import CollectionDetail from "@/components/collection-detail";
import { PRODUCTS } from "./data";

export const metadata = { title: "Festive Collection — SareeHub" };

export default function FestiveCollectionPage() {
  return (
    <CollectionDetail
      title="Festive Collection"
      subtitle="Celebrate every moment in style."
      bannerImage="/images/banners/festive.png"
      products={PRODUCTS}
    />
  );
}
