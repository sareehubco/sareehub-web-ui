import CollectionDetail from "@/components/collection-detail";
import { ALL_PRODUCTS } from "../collections/all-products";

export const metadata = { title: "All Sarees — SareeHub" };

const FABRIC_FACET = {
  field: "fabric",
  label: "Fabric",
  options: [
    { key: "silk", label: "Silk" },
    { key: "cotton", label: "Cotton" },
    { key: "chiffon", label: "Chiffon" },
    { key: "georgette", label: "Georgette" },
    { key: "organza", label: "Organza" },
    { key: "linen", label: "Linen" },
    { key: "other", label: "Other" },
  ],
};

export default function SareesPage() {
  return (
    <CollectionDetail
      title="All Sarees"
      subtitle="Our complete collection — handpicked from every category."
      bannerImage="/images/banners/allsarees.png"
      products={ALL_PRODUCTS}
      secondaryFacet={FABRIC_FACET}
      breadcrumbParent={null}
    />
  );
}
