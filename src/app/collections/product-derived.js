// Deterministic placeholder numbers (rating/reviews/stock/discount/seller)
// derived from the product name, since there's no real catalog or seller
// backend behind this data yet.
function hash(text) {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (h * 31 + text.charCodeAt(i)) >>> 0;
  }
  return h;
}

const SELLERS = [
  "Kanchi Silk House",
  "Weavers Guild Co-op",
  "Saree Junction",
  "Heritage Looms",
  "Tradition Textiles",
  "Silk Route Sarees",
];

export function getDerivedProductInfo(product) {
  const h = hash(product.slug);
  const rating = (4.3 + (h % 6) / 10).toFixed(1);
  const reviewCount = 40 + (h % 160);
  const stock = 1 + (h % 12);
  const discountPercent = 10 + (h % 3) * 5;
  const originalPrice = Math.round((product.price / (1 - discountPercent / 100)) / 10) * 10;

  const sellerHash = hash(`seller-${product.slug}`);
  const seller = SELLERS[sellerHash % SELLERS.length];
  const sellerRating = (3.9 + (sellerHash % 10) / 10).toFixed(1);
  const sellerRatingCount = 500 + (sellerHash % 4500);

  return {
    rating,
    reviewCount,
    stock,
    discountPercent,
    originalPrice,
    seller,
    sellerRating,
    sellerRatingCount,
  };
}
