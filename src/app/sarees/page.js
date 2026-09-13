import CollectionDetail from "@/components/collection-detail";
import productService from "@/api/ProductService";

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

export default async function SareesPage() {
  const products = await productService.getAllProducts();
  return (
    <CollectionDetail
      title="All Sarees"
      subtitle="Our complete collection — handpicked from every category."
      bannerImage="/images/banners/allsarees.png"
      products={products}
      secondaryFacet={FABRIC_FACET}
      breadcrumbParent={null}
    />
  );
}
