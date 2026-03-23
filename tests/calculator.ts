export function calculateTotal(
  price: number,
  quantity: number,
  // discount: number = 0,
) {
  return price * quantity * (1 - discount);
}
