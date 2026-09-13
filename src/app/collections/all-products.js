import { PRODUCTS as BRIDAL_PRODUCTS } from "./bridal/data";
import { PRODUCTS as FESTIVE_PRODUCTS } from "./festive/data";
import { PRODUCTS as PARTY_PRODUCTS } from "./party-wear/data";
import { PRODUCTS as DAILY_PRODUCTS } from "./daily-wear/data";
import { PRODUCTS as WORK_PRODUCTS } from "./work-wear/data";
import { PRODUCTS as HANDLOOM_PRODUCTS } from "./handloom/data";

export const ALL_PRODUCTS = [
  ...BRIDAL_PRODUCTS,
  ...FESTIVE_PRODUCTS,
  ...PARTY_PRODUCTS,
  ...DAILY_PRODUCTS,
  ...WORK_PRODUCTS,
  ...HANDLOOM_PRODUCTS,
];

export function getProductBySlug(slug) {
  return ALL_PRODUCTS.find((product) => product.slug === slug);
}
