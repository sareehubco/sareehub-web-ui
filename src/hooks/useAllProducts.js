"use client";

import { useEffect, useState } from "react";
import productService from "@/api/ProductService";

// Read-only catalog data used only for client-side recommendation widgets
// (cart/wishlist "You may also like") — not shared/mutated app state, so a
// plain hook is enough; no Redux slice needed.
export function useAllProducts() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    productService.getAllProducts().then((products) => {
      if (!cancelled) setAllProducts(products);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return allProducts;
}
