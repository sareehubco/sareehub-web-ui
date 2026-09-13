import { inferFabric } from "../infer-fabric";
import { slugify } from "../slugify";

const CATEGORY = "handloom";
const IMAGE = "/images/collections/handloom.png";

export const PRODUCTS = [
  { name: "Handwoven Ikat Saree", price: 5999, color: "blue", design: "printed", occasion: "reception" },
  { name: "Pure Handloom Cotton", price: 4499, color: "green", design: "plain", occasion: "wedding" },
  { name: "Tussar Silk Handloom", price: 7499, color: "gold", design: "zari", occasion: "engagement" },
  { name: "Kantha Work Saree", price: 6499, color: "maroon", design: "embroidery", occasion: "reception" },
  { name: "Handloom Linen Saree", price: 3999, color: "orange", design: "plain", occasion: "wedding" },
  { name: "Jamdani Silk Saree", price: 8999, color: "purple", design: "zari", occasion: "engagement" },
  { name: "Handwoven Cotton Silk", price: 5499, color: "red", design: "printed", occasion: "reception" },
  { name: "Chanderi Handloom Saree", price: 6999, color: "pink", design: "zari", occasion: "wedding" },
  { name: "Bengal Handloom Saree", price: 4999, color: "green", design: "printed", occasion: "engagement" },
  { name: "Ikat Silk Saree", price: 6999, color: "blue", design: "printed", occasion: "wedding" },
  { name: "Baluchari Silk Saree", price: 8499, color: "maroon", design: "embroidery", occasion: "reception" },
  { name: "Mangalagiri Cotton Saree", price: 3499, color: "green", design: "plain", occasion: "engagement" },
  { name: "Pochampally Ikat Saree", price: 7499, color: "purple", design: "printed", occasion: "wedding" },
  { name: "Venkatagiri Silk Saree", price: 6499, color: "gold", design: "zari", occasion: "reception" },
  { name: "Sambalpuri Saree", price: 5999, color: "red", design: "printed", occasion: "engagement" },
  { name: "Kota Doria Saree", price: 4499, color: "orange", design: "plain", occasion: "wedding" },
  { name: "Maheshwari Silk Saree", price: 6999, color: "pink", design: "zari", occasion: "reception" },
  { name: "Bhagalpuri Silk Saree", price: 5499, color: "green", design: "embroidery", occasion: "engagement" },
].map((product) => ({
  ...product,
  image: IMAGE,
  fabric: inferFabric(product.name),
  category: CATEGORY,
  slug: `${CATEGORY}-${slugify(product.name)}`,
}));
