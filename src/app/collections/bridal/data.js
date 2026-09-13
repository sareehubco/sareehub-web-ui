import { inferFabric } from "../infer-fabric";
import { slugify } from "../slugify";

const CATEGORY = "bridal";
const IMAGE = "/images/collections/bridal.png";

export const PRODUCTS = [
  { name: "Red Kanjivaram", price: 12999, color: "red", design: "zari", occasion: "wedding" },
  { name: "Gold Tissue Saree", price: 14999, color: "gold", design: "zari", occasion: "wedding" },
  { name: "Maroon Banarasi", price: 11999, color: "maroon", design: "zari", occasion: "reception" },
  { name: "Pink Bridal Silk", price: 13999, color: "pink", design: "embroidery", occasion: "wedding" },
  { name: "Green Kanchipuram", price: 15999, color: "green", design: "zari", occasion: "reception" },
  { name: "Wine Zari Saree", price: 12499, color: "maroon", design: "zari", occasion: "engagement" },
  { name: "Crimson Silk Saree", price: 16499, color: "red", design: "embroidery", occasion: "wedding" },
  { name: "Champagne Silk Saree", price: 13499, color: "gold", design: "plain", occasion: "reception" },
  { name: "Royal Purple Banarasi", price: 14499, color: "purple", design: "zari", occasion: "engagement" },
  { name: "Ivory Silk Kanjivaram", price: 15499, color: "gold", design: "zari", occasion: "wedding" },
  { name: "Coral Pink Bridal Saree", price: 12999, color: "pink", design: "embroidery", occasion: "reception" },
  { name: "Emerald Bridal Silk", price: 16999, color: "green", design: "zari", occasion: "engagement" },
  { name: "Scarlet Zari Saree", price: 13999, color: "red", design: "zari", occasion: "wedding" },
  { name: "Antique Gold Banarasi", price: 17999, color: "gold", design: "zari", occasion: "reception" },
  { name: "Blush Pink Silk Saree", price: 12499, color: "pink", design: "plain", occasion: "engagement" },
  { name: "Deep Maroon Kanjivaram", price: 14999, color: "maroon", design: "embroidery", occasion: "wedding" },
  { name: "Violet Silk Bridal Saree", price: 15999, color: "purple", design: "zari", occasion: "reception" },
  { name: "Ruby Red Banarasi", price: 16499, color: "red", design: "zari", occasion: "engagement" },
].map((product) => ({
  ...product,
  image: IMAGE,
  fabric: inferFabric(product.name),
  category: CATEGORY,
  slug: `${CATEGORY}-${slugify(product.name)}`,
}));
