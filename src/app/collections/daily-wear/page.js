import CollectionDetail from "@/components/collection-detail";
import { PRODUCTS } from "./data";

export const metadata = { title: "Daily Wear — SareeHub" };

export default function DailyWearPage() {
  return (
    <CollectionDetail
      title="Daily Wear"
      subtitle="Everyday elegance, effortlessly worn."
      bannerImage="/images/banners/daily.png"
      products={PRODUCTS}
    />
  );
}
