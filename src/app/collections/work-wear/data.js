import { inferFabric } from "../infer-fabric";
import { slugify } from "../slugify";

const CATEGORY = "work-wear";
const IMAGE = "/images/collections/workwear.png";

export const PRODUCTS = [
  { name: "Formal Cotton Saree", price: 2999, color: "blue", design: "plain", occasion: "reception" },
  { name: "Office Silk Saree", price: 4499, color: "maroon", design: "plain", occasion: "wedding" },
  { name: "Beige Linen Saree", price: 3499, color: "gold", design: "plain", occasion: "engagement" },
  { name: "Subtle Print Saree", price: 3299, color: "orange", design: "printed", occasion: "reception" },
  { name: "Formal Silk Blend", price: 4999, color: "green", design: "plain", occasion: "wedding" },
  { name: "Classic Cotton Saree", price: 2799, color: "red", design: "plain", occasion: "reception" },
  { name: "Elegant Work Saree", price: 4199, color: "pink", design: "plain", occasion: "wedding" },
  { name: "Minimal Georgette Saree", price: 3799, color: "blue", design: "printed", occasion: "engagement" },
  { name: "Royal Purple Work Saree", price: 3999, color: "purple", design: "printed", occasion: "reception" },
  { name: "Pastel Formal Saree", price: 3599, color: "pink", design: "plain", occasion: "wedding" },
  { name: "Charcoal Silk Saree", price: 4699, color: "purple", design: "plain", occasion: "reception" },
  { name: "Steel Blue Saree", price: 3899, color: "blue", design: "printed", occasion: "engagement" },
  { name: "Sage Green Work Saree", price: 4299, color: "green", design: "plain", occasion: "wedding" },
  { name: "Rust Formal Saree", price: 3699, color: "orange", design: "printed", occasion: "reception" },
  { name: "Wine Office Saree", price: 4899, color: "maroon", design: "plain", occasion: "engagement" },
  { name: "Ivory Formal Saree", price: 3999, color: "gold", design: "plain", occasion: "wedding" },
  { name: "Coral Work Saree", price: 3499, color: "red", design: "printed", occasion: "reception" },
  { name: "Lilac Georgette Saree", price: 4099, color: "purple", design: "printed", occasion: "engagement" },
].map((product) => ({
  ...product,
  image: IMAGE,
  fabric: inferFabric(product.name),
  category: CATEGORY,
  slug: `${CATEGORY}-${slugify(product.name)}`,
}));
