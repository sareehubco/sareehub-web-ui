import CollectionDetail from "@/components/collection-detail";
import { PRODUCTS } from "./data";

export const metadata = { title: "Party Wear — SareeHub" };

export default function PartyWearPage() {
  return (
    <CollectionDetail
      title="Party Wear"
      subtitle="Make a statement wherever you go."
      bannerImage="/images/banners/party.png"
      products={PRODUCTS}
    />
  );
}
