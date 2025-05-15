import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  // State
  const cartItems = ref([]);
  const loading = ref(false);

  // Computed
  const cartCount = computed(() => {
    return cartItems.value.reduce((count, item) => count + item.quantity, 0);
  });

  const cartTotal = computed(() => {
    return cartItems.value.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  });

  const isEmpty = computed(() => {
    return cartItems.value.length === 0;
  });

  // Actions
  const addToCart = (product, quantity = 1) => {
    const itemExists = cartItems.value.find(
      (item) => item.product.id === product.id
    );

    if (itemExists) {
      itemExists.quantity += quantity;
    } else {
      cartItems.value.push({
        product,
        quantity,
      });
    }

    saveToLocalStorage();
  };

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter(
      (item) => item.product.id !== productId
    );
    saveToLocalStorage();
  };

  const updateQty = (productId, quantity) => {
    const item = cartItems.value.find((item) => item.product.id === productId);

    if (item) {
      item.quantity = quantity;
    }
    saveToLocalStorage();
  };

  const clearCart = () => {
    cartItems.value = [];
    saveToLocalStorage();
  };

  // Loading
  const setLoading = (state) => {
    loading.value = state;
  };

  // Local storage
  const saveToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cartItems.value));
  };

  const loadFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      cartItems.value = JSON.parse(savedCart);
    }
  };

  loadFromLocalStorage();

  return {
    // State
    cartItems,
    loading,

    // Computed
    cartCount,
    isEmpty,
    cartTotal,

    //Actions
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    setLoading,
  };
});

export default useCartStore;
