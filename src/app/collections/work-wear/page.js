import CollectionDetail from "@/components/collection-detail";
import { PRODUCTS } from "./data";

export const metadata = { title: "Work Wear — SareeHub" };

export default function WorkWearPage() {
  return (
    <CollectionDetail
      title="Work Wear"
      subtitle="Grace that carries you through the workday."
      bannerImage="/images/banners/work.png"
      products={PRODUCTS}
    />
  );
}
