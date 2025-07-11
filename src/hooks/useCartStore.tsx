
"use client";

import type { CartItemType, MenuItemType, SelectedCustomization } from '@/types';
import { produce } from 'immer';
import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

interface CartState {
  items: CartItemType[];
  addToCart: (item: MenuItemType, quantity: number, customizations?: SelectedCustomization[]) => void;
  removeFromCart: (itemId: string, customizationsSignature: string) => void;
  updateQuantity: (itemId: string, customizationsSignature: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  generateCustomizationSignature: (customizations?: SelectedCustomization[]) => string;
}

const CartContext = createContext<CartState | undefined>(undefined);

const CART_STORAGE_KEY = 'byteeat-cart';

const saveCartToStorage = (items: CartItemType[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

const loadCartFromStorage = (): CartItemType[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedItems = loadCartFromStorage();
    setItems(savedItems);
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (isInitialized) {
      saveCartToStorage(items);
    }
  }, [items, isInitialized]);

  const generateCustomizationSignature = (customizations?: SelectedCustomization[]): string => {
    if (!customizations || customizations.length === 0) return 'default';
    return customizations
      .slice() // Create a shallow copy before sorting
      .sort((a, b) => a.optionId.localeCompare(b.optionId) || a.choiceName.localeCompare(b.choiceName))
      .map(c => `${c.optionId}:${c.choiceName}`)
      .join('|');
  };
  
  const calculateFinalPrice = (basePrice: number, customizations?: SelectedCustomization[]): number => {
    let finalPrice = basePrice;
    if (customizations) {
      customizations.forEach(c => {
        finalPrice += c.priceModifier;
      });
    }
    return finalPrice;
  };

  const addToCart = (item: MenuItemType, quantity: number, customizations?: SelectedCustomization[]) => {
    const signature = generateCustomizationSignature(customizations);
    const finalPrice = calculateFinalPrice(item.price, customizations);

    setItems(
      produce(draft => {
        const existingItemIndex = draft.findIndex(
          cartItem => cartItem.id === item.id && generateCustomizationSignature(cartItem.selectedCustomizations) === signature
        );

        if (existingItemIndex !== -1) {
          draft[existingItemIndex].quantity += quantity;
        } else {
          draft.push({
            ...item,
            quantity,
            selectedCustomizations: customizations,
            finalPrice,
          });
        }
      })
    );
  };

  const removeFromCart = (itemId: string, customizationsSignature: string) => {
    setItems(
      produce(draft => {
        return draft.filter(
          item => !(item.id === itemId && generateCustomizationSignature(item.selectedCustomizations) === customizationsSignature)
        );
      })
    );
  };

  const updateQuantity = (itemId: string, customizationsSignature: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId, customizationsSignature);
      return;
    }
    setItems(
      produce(draft => {
        const itemIndex = draft.findIndex(
          item => item.id === itemId && generateCustomizationSignature(item.selectedCustomizations) === customizationsSignature
        );
        if (itemIndex !== -1) {
          draft[itemIndex].quantity = quantity;
        }
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.finalPrice * item.quantity, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };


  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getItemCount, generateCustomizationSignature }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartStore = (): CartState => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartStore must be used within a CartProvider');
  }
  return context;
};
