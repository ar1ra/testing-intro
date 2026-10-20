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


function changeQuantity(cart, productId, quantity) {
  const product = cart.find((item) => item.id === productId);

  if (!product) {
    return cart;
  }

  if (quantity <= 0) {
    throw new RangeError('Quantity must be greater than zero');
  }

  if (quantity > product.stock) {
    throw new RangeError('Quantity exceeds available stock');
  }

  return cart.map((item) =>
    item.id === productId
      ? { ...item, quantity }
      : item
  );
};

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
};

function calculateCartSubtotal(cart) {
  return cart.reduce((prev, cur) => prev + cur.price * cur.quantity, 0);
};

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);

  let discount = 0;
  let delivery = 0;

  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = Math.round(subtotal * 0.1);
  }

  if (subtotal < 50000) {
    delivery = 30000;
  }

  const total = subtotal - discount + delivery;
  const result = {
    subtotal,
    discount,
    delivery,
    total,
  };

  return result;
};

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
