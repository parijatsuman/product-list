import { useCallback, useEffect, useMemo, useState } from "react";
import CartSummary from "./components/CartSummary";
import ProductFilters from "./components/ProductFilters";
import ProductCard from "./components/ProductCard";
import products from "./data/product";

const CART_STORAGE_KEY = "cart";

function getSavedCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [cart, setCart] = useState(getSavedCart);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const minimumPrice = Number(minPrice) || 0;
    return products.filter((product) => product.name.toLowerCase().includes(normalizedSearch)
      && product.price >= minimumPrice && (!category || product.category === category));
  }, [category, minPrice, search]);

  const cartQuantities = useMemo(() => new Map(cart.map(({ id, quantity }) => [id, quantity])), [cart]);
  const cartTotals = useMemo(() => cart.reduce((totals, item) => ({
    itemCount: totals.itemCount + item.quantity,
    price: totals.price + item.price * item.quantity,
  }), { itemCount: 0, price: 0 }), [cart]);

  const addToCart = useCallback((productId) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === productId);
      if (existingItem) return currentCart.map((item) => (
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ));
      return [...currentCart, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  }, []);

  const clearFilters = useCallback(() => {
    setSearch(""); setMinPrice(""); setCategory("");
  }, []);

  return (
    <main className="container mx-auto px-4 py-5">
      <ProductFilters category={category} minPrice={minPrice} search={search}
        onCategoryChange={setCategory} onMinPriceChange={setMinPrice}
        onSearchChange={setSearch} onClear={clearFilters} />
      <div className="flex gap-10">
        <CartSummary cart={cart} totals={cartTotals} onRemove={removeFromCart} />
        <section className="min-w-0 flex-1">
          {filteredProducts.length === 0 ? (
            <div className="flex min-h-75 w-full items-center justify-center"><p className="font-bold text-gray-500">No products found.</p></div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => <ProductCard key={product.id} product={product}
                qty={cartQuantities.get(product.id) ?? 0} onAddToCart={addToCart} />)}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
