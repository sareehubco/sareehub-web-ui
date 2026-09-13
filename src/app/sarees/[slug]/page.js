import { notFound } from "next/navigation";
import productService from "@/api/ProductService";
import { CATEGORY_META } from "../../collections/category-meta";
import ProductDetail from "@/components/product-detail";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await productService.getProductBySlug(slug);
  if (!product) return { title: "Product not found — SareeHub" };
  return { title: `${product.name} — SareeHub` };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await productService.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} categoryMeta={CATEGORY_META[product.category]} />;
}
