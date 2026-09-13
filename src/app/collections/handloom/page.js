import CollectionDetail from "@/components/collection-detail";
import { PRODUCTS } from "./data";

export const metadata = { title: "Handloom Treasures — SareeHub" };

export default function HandloomPage() {
  return (
    <CollectionDetail
      title="Handloom Treasures"
      subtitle="Rooted in tradition, woven with heritage."
      bannerImage="/images/banners/handloom.png"
      products={PRODUCTS}
    />
  );
}
