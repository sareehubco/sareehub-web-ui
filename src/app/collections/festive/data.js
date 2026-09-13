import { inferFabric } from "../infer-fabric";
import { slugify } from "../slugify";

const CATEGORY = "festive";
const IMAGE = "/images/collections/festive.png";

export const PRODUCTS = [
  { name: "Yellow Kanjivaram Silk", price: 8999, color: "orange", design: "zari", occasion: "wedding" },
  { name: "Marigold Silk Saree", price: 6499, color: "orange", design: "zari", occasion: "reception" },
  { name: "Golden Tissue Festive Saree", price: 9499, color: "gold", design: "zari", occasion: "engagement" },
  { name: "Rani Pink Silk Saree", price: 7999, color: "pink", design: "embroidery", occasion: "wedding" },
  { name: "Emerald Green Saree", price: 8499, color: "green", design: "zari", occasion: "reception" },
  { name: "Royal Blue Kanjivaram", price: 10999, color: "blue", design: "zari", occasion: "engagement" },
  { name: "Coral Silk Saree", price: 5999, color: "orange", design: "plain", occasion: "wedding" },
  { name: "Purple Banarasi Saree", price: 9999, color: "purple", design: "zari", occasion: "reception" },
  { name: "Maroon Festive Silk", price: 7499, color: "maroon", design: "embroidery", occasion: "engagement" },
  { name: "Sunshine Yellow Saree", price: 6999, color: "orange", design: "printed", occasion: "wedding" },
  { name: "Peacock Blue Saree", price: 8999, color: "blue", design: "zari", occasion: "reception" },
  { name: "Fuchsia Silk Saree", price: 7499, color: "pink", design: "embroidery", occasion: "engagement" },
  { name: "Amber Kanjivaram", price: 9999, color: "orange", design: "zari", occasion: "wedding" },
  { name: "Jade Green Saree", price: 7999, color: "green", design: "plain", occasion: "reception" },
  { name: "Lavender Silk Saree", price: 6499, color: "purple", design: "printed", occasion: "engagement" },
  { name: "Copper Zari Saree", price: 8499, color: "gold", design: "zari", occasion: "wedding" },
  { name: "Ruby Festive Silk", price: 9499, color: "red", design: "embroidery", occasion: "reception" },
  { name: "Turquoise Saree", price: 7999, color: "blue", design: "printed", occasion: "engagement" },
].map((product) => ({
  ...product,
  image: IMAGE,
  fabric: inferFabric(product.name),
  category: CATEGORY,
  slug: `${CATEGORY}-${slugify(product.name)}`,
}));
