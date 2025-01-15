import React, { createContext, useState, useContext, useEffect} from 'react';

const MyContext = createContext();
const MyProvider = ({ children }) => {
    
const [cart, setCart] = useState([]);

const clearCart = () => {
    setCart([]);
};


const addToCart = (product) => {
    setCart((prevCart) => {
        const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
        if (existingProductIndex !== -1) {
            // Se o produto já existe no carrinho, atualiza a quantidade
            const updatedCart = [...prevCart];
            updatedCart[existingProductIndex].quantity += product.quantity;  // Aqui, usamos a quantidade passada
            return updatedCart;
        } else {
            // Se o produto não existe no carrinho, adiciona com a quantidade fornecida
            return [...prevCart, { ...product }];
        }
    });
};


const delToCart = (product) => {
    setCart((prevCart) => {
        const updatedCart = prevCart.map((item) => 
            item.id === product.id && item.quantity > 1 
                ? { ...item, quantity: item.quantity - 1 } 
                : item
        ).filter((item) => item.quantity > 0); // Remove produtos com quantidade 0
        return updatedCart;
    });
};


const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
};

return (
    <MyContext.Provider value={{ cart,setCart, addToCart, delToCart, removeFromCart, clearCart }}>
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