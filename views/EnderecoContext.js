// EnderecoContext.js
import React, { createContext, useState, useContext } from 'react';

// Criando o contexto para o endereço
const EnderecoContext = createContext();

// Provedor do contexto
export const EnderecoProvider = ({ children }) => {
  const [endereco, setEndereco] = useState(localStorage.getItem('enderecoSelecionado') || null);

  // Atualiza o endereço e o armazena no LocalStorage
  const atualizarEndereco = (novoEndereco) => {
    setEndereco(novoEndereco);
    localStorage.setItem('enderecoSelecionado', novoEndereco);
  };

  return (
    <EnderecoContext.Provider value={{ endereco, atualizarEndereco }}>
      {children}
    </EnderecoContext.Provider>
  );
};

// Hook para acessar o contexto
export const useEndereco = () => useContext(EnderecoContext);
