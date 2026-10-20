function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Quantity must be greater than zero');
  }

  const existingProduct = cart.find((item) => item.id === product.id);

  const newQuantity = existingProduct
    ? existingProduct.quantity + quantity
    : quantity;

  if (newQuantity > product.stock) {
    throw new RangeError('Not enough products in stock');
  }

  if (existingProduct) {
    return cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: newQuantity }
        : item
    );
  }

  return [...cart, { ...product, quantity }];
};


function changeQuantity() { return notImplemented(); }
function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
