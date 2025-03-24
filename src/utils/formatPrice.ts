function formatPrice(amount?: number) {
  if (!amount) return "0₫";
  let formatted = Math.floor(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return formatted + " ₫";
}

export { formatPrice };
