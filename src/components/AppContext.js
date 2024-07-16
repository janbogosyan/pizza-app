'use client';
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return price;
}


export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const localStorage = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (localStorage && localStorage.getItem('cart')) {
      setCartProducts(JSON.parse(localStorage.getItem('cart')));
    }
  }, []);

  function removeCartProduct(indexToRemove) {
    setCartProducts(prevCartProduct => {
      const newCartProducts = prevCartProduct.filter((v, index) => index !== indexToRemove);
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success('Product removed');
  }

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }


  function saveCartProductsToLocalStorage(cartProducts) {
    if (localStorage) {
      localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
  }



  function addToCart(product, size = null, extras = []) {
    setCartProducts(prevProducts => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    })
  }


  return (
    <SessionProvider>
      <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}


//tozi komponent e svurzan s /components/menu/MenuItem.js
//we will wrap up our App in <AppProvider so we can use useSession from anywhere

//The useSession() React Hook in the NextAuth.js client is the easiest way 
//to check if someone is signed in. You can use the useSession hook from 
//anywhere in your application (e.g. in a header component).

//his is a good approach to ensure that the session context is available to all components in your application.
