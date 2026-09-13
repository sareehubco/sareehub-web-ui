import { inferFabric } from "../infer-fabric";
import { slugify } from "../slugify";

const CATEGORY = "party-wear";
const IMAGE = "/images/collections/party.png";

export const PRODUCTS = [
  { name: "Navy Blue Georgette Saree", price: 4999, color: "blue", design: "plain", occasion: "reception" },
  { name: "Wine Sequin Saree", price: 7999, color: "maroon", design: "embroidery", occasion: "wedding" },
  { name: "Golden Shimmer Saree", price: 6499, color: "gold", design: "printed", occasion: "engagement" },
  { name: "Emerald Sequin Saree", price: 8999, color: "green", design: "embroidery", occasion: "reception" },
  { name: "Magenta Party Saree", price: 5499, color: "pink", design: "printed", occasion: "wedding" },
  { name: "Royal Purple Georgette", price: 6999, color: "purple", design: "plain", occasion: "engagement" },
  { name: "Copper Shimmer Saree", price: 7499, color: "orange", design: "printed", occasion: "reception" },
  { name: "Crimson Party Silk", price: 8499, color: "red", design: "embroidery", occasion: "wedding" },
  { name: "Bronze Net Saree", price: 5999, color: "gold", design: "printed", occasion: "engagement" },
  { name: "Midnight Blue Sequin Saree", price: 7499, color: "blue", design: "embroidery", occasion: "wedding" },
  { name: "Rose Gold Party Saree", price: 8999, color: "gold", design: "printed", occasion: "reception" },
  { name: "Berry Pink Georgette", price: 6499, color: "pink", design: "plain", occasion: "engagement" },
  { name: "Charcoal Shimmer Saree", price: 7999, color: "purple", design: "printed", occasion: "wedding" },
  { name: "Ruby Red Party Silk", price: 9499, color: "red", design: "embroidery", occasion: "reception" },
  { name: "Olive Green Saree", price: 5999, color: "green", design: "plain", occasion: "engagement" },
  { name: "Amethyst Net Saree", price: 6999, color: "purple", design: "embroidery", occasion: "wedding" },
  { name: "Tangerine Shimmer Saree", price: 7299, color: "orange", design: "printed", occasion: "reception" },
  { name: "Wine Georgette Saree", price: 8499, color: "maroon", design: "plain", occasion: "engagement" },
].map((product) => ({
  ...product,
  image: IMAGE,
  fabric: inferFabric(product.name),
  category: CATEGORY,
  slug: `${CATEGORY}-${slugify(product.name)}`,
}));
