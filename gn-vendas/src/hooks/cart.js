import React, { createContext, useState, useContext, useEffect } from 'react';

const CartData = createContext({});

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  function addProduct(n) {
    const inProducts = products.filter((item) => item.id === n.id);
    if (inProducts.length > 0) {
      let aux = products.map((item) =>
        item.id === n.id ? { ...item, amount: item.amount + n.amount } : item
      );
      setProducts(aux);
      localStorage.setItem('@gnvendas:cart', JSON.stringify(aux));
    } else {
      localStorage.setItem('@gnvendas:cart', JSON.stringify([...products, n]));
      setProducts([...products, n]);
    }
  }
  function removeProduct(n) {
    const aux = products.filter((item) => item.id !== n.id);
    setProducts(aux);
    localStorage.setItem('@gnvendas:cart', JSON.stringify(aux));
  }
  function resetCart() {
    setProducts([]);
    localStorage.setItem('@gnvendas:cart', JSON.stringify([]));
  }
  useEffect(() => {
    const products_get = localStorage.getItem('@gnvendas:cart');
    if (products_get) {
      setProducts(JSON.parse(products_get));
    }
  }, []);

  return (
    <CartData.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        resetCart,
      }}
    >
      {children}
    </CartData.Provider>
  );
};

export function useCart() {
  const context = useContext(CartData);

  if (!context) {
    throw new Error('useCart must be used from within an CartProvider');
  }

  return context;
}
