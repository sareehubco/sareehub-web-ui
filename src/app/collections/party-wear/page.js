import CollectionDetail from "@/components/collection-detail";
import productService from "@/api/ProductService";

export const metadata = { title: "Party Wear — SareeHub" };

export default async function PartyWearPage() {
  const products = await productService.getProductsByCategory("party-wear");
  return (
    <CollectionDetail
      title="Party Wear"
      subtitle="Make a statement wherever you go."
      bannerImage="/images/banners/party.png"
      products={products}
    />
  );
}
