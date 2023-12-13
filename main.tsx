import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Cria uma instância do QueryClient para gerenciar o estado global da consulta
const queryClient = new QueryClient();

// Usa o ReactDOM.createRoot para renderizar a aplicação no elemento 'root' do HTML
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // Usa o React.StrictMode para identificar possíveis problemas na fase de desenvolvimento
  <React.StrictMode>
    {/* 
      Usa o QueryClientProvider para fornecer a instância do QueryClient à árvore de componentes.
      Isso permite que os componentes usem o React Query para consultas e mutações.
    */}
    <QueryClientProvider client={queryClient}>
      {/* Renderiza o componente principal da aplicação (App) */}
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
