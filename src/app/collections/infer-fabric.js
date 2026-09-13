// Rough fabric guess from a product's name, since mock products don't carry
// a dedicated fabric field of their own yet.
export function inferFabric(name) {
  const n = name.toLowerCase();
  if (n.includes("cotton")) return "cotton";
  if (n.includes("linen")) return "linen";
  if (n.includes("chiffon")) return "chiffon";
  if (n.includes("georgette")) return "georgette";
  if (n.includes("organza") || n.includes("tissue")) return "organza";
  if (n.includes("sequin") || n.includes("shimmer") || n.includes("net")) return "other";
  return "silk";
}
