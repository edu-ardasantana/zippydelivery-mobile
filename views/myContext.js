import React, { createContext, useState, useContext, useEffect} from 'react';

const MyContext = createContext();
const MyProvider = ({ children }) => {
    
const [cart, setCart] = useState([]);



const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    if (existingProductIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingProductIndex].quantity += 1;
        setCart(updatedCart);
    } else {
        setCart([...cart, { ...product, quantity: 1 }]);
    }
    // const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    // if (existingProductIndex !== -1) {
    //     // Se o produto já está no carrinho, aumenta a quantidade
    //     const updatedCart = [...cart];
    //     updatedCart[existingProductIndex].quantity += 1;
    //     setCart(updatedCart);
    // } else {
    // // Se o produto não está no carrinho, adiciona com quantidade 1
    //     setCart([...cart, { ...product, quantity: 1 }]);
    // }
};
const delToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    if (existingProductIndex !== -1) {
        // Se o produto já está no carrinho, verifica a quantidade antes de diminuir
        const updatedCart = [...cart];
        if (updatedCart[existingProductIndex].quantity > 1) {
            updatedCart[existingProductIndex].quantity -= 1;
            setCart(updatedCart);
        } else {
            // Se a quantidade for igual a 1, mantém em 1 e não diminui
            // Se a quantidade for 0 ou negativa, remove o produto do carrinho
            removeFromCart(product.id);
        }
    } else {
        // Se o produto não está no carrinho, adiciona com quantidade 1
        setCart([...cart, { ...product, quantity: 1 }]);
    }
};

const removeFromCart = (productId) => {
    const updatedCart = cart.map((item) =>
    item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.id !== productId);
    setCart(updatedCart);
};
return (
    <MyContext.Provider value={{ cart,setCart, addToCart, delToCart, removeFromCart }}>
        {children}
    </MyContext.Provider>
);
};

const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};

export { MyProvider, useMyContext };