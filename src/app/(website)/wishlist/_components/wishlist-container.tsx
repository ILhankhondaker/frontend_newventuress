"use client";

import { CartItemCard } from "@/components/shared/cards/cart-item";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/store";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

const WishlistContainer = () => {
  const cartItems = useAppSelector((state) => state.cart.items); // Get cart items from Redux

  useEffect(() => {
    console.log("Cart Items from Redux:", cartItems); // Log cart items
  }, [cartItems]); // Re-log when cartItems change

  const [items, setItems] = useState<typeof cartItems>([]); // Initialize with an empty array

  useEffect(() => {
    setItems(cartItems); // Update state after mount
  }, [cartItems]);

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.slice(0, 6).map((item) => (
          <div key={item._id} className="w-full pb-[16px]">
            <CartItemCard
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
              icon={<ShoppingCart className="w-4 h-4 " />}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-[20px] md:pt-[30px] lg:pt-[40px]">
        <Button className="text-base font-medium leading-[19px] bg-gradient-to-r from-[#121D42] via-[#152764] to-[#4857BD] hover:bg-[#121D42] rounded-[8px] py-[12px] px-[24px]">
          Move All to Cart
        </Button>
      </div>
    </section>
  );
};

export default WishlistContainer;
