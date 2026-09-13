import { inferFabric } from "../infer-fabric";
import { slugify } from "../slugify";

const CATEGORY = "daily-wear";
const IMAGE = "/images/collections/dailywear.png";

export const PRODUCTS = [
  { name: "Cotton Checks Saree", price: 1499, color: "blue", design: "plain", occasion: "reception" },
  { name: "Handloom Cotton Saree", price: 1999, color: "green", design: "plain", occasion: "wedding" },
  { name: "Printed Daily Cotton Saree", price: 1299, color: "orange", design: "printed", occasion: "engagement" },
  { name: "Linen Blend Saree", price: 2499, color: "gold", design: "plain", occasion: "reception" },
  { name: "Soft Silk Daily Saree", price: 3499, color: "maroon", design: "plain", occasion: "wedding" },
  { name: "Chiffon Casual Saree", price: 1799, color: "pink", design: "printed", occasion: "engagement" },
  { name: "Georgette Daily Saree", price: 2199, color: "purple", design: "printed", occasion: "reception" },
  { name: "Cotton Silk Saree", price: 2799, color: "red", design: "plain", occasion: "wedding" },
  { name: "Everyday Cotton Ikat Saree", price: 1999, color: "blue", design: "printed", occasion: "engagement" },
  { name: "Pastel Cotton Saree", price: 1699, color: "pink", design: "plain", occasion: "wedding" },
  { name: "Block Print Cotton Saree", price: 1899, color: "orange", design: "printed", occasion: "reception" },
  { name: "Mul Cotton Saree", price: 1399, color: "blue", design: "plain", occasion: "engagement" },
  { name: "Khadi Cotton Saree", price: 2299, color: "green", design: "plain", occasion: "wedding" },
  { name: "Bagru Print Cotton Saree", price: 1599, color: "red", design: "printed", occasion: "reception" },
  { name: "Handloom Cotton Checks Saree", price: 1999, color: "purple", design: "printed", occasion: "engagement" },
  { name: "Tussar Cotton Saree", price: 2599, color: "gold", design: "plain", occasion: "wedding" },
  { name: "Ikat Cotton Saree", price: 2199, color: "blue", design: "printed", occasion: "reception" },
  { name: "Simple Silk Cotton Saree", price: 2999, color: "maroon", design: "plain", occasion: "engagement" },
].map((product) => ({
  ...product,
  image: IMAGE,
  fabric: inferFabric(product.name),
  category: CATEGORY,
  slug: `${CATEGORY}-${slugify(product.name)}`,
}));
