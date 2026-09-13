export function capitalize(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

export function formatPrice(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
