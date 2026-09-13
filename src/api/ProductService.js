import { ALL_PRODUCTS, getProductBySlug as findProductBySlug } from "@/app/collections/all-products";
import { getDerivedProductInfo } from "@/app/collections/product-derived";

// No product/catalog backend exists yet, so these methods resolve from the
// local mock catalog (src/app/collections) instead of calling an API. They're
// still async and shaped like the eventual real calls on purpose: when a
// backend is ready, only the bodies below change (e.g. to `api.get(...)`,
// mirroring src/api/CustomerService.js) — every caller already awaits these
// and needs no changes.
class ProductService {
  async getAllProducts() {
    return ALL_PRODUCTS;
  }

  async getProductsByCategory(category) {
    return ALL_PRODUCTS.filter((product) => product.category === category);
  }

  async getProductBySlug(slug) {
    const product = findProductBySlug(slug);
    if (!product) return null;
    // Merged here so ProductDetail can read rating/seller/etc. straight off
    // the product it's given — once a real API returns those fields natively
    // under the same names, this merge (and product-derived.js) just goes away.
    return { ...product, ...getDerivedProductInfo(product) };
  }
}

const productService = new ProductService();

export default productService;
