import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx'
import './index.css'
import HomePage from './pages/HomePage.tsx';
import ProductPage from './pages/ProductPage.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StoreProvider } from './Store.tsx';
import CartPage from './pages/CartPage.tsx';
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';
import ShippingPage from './pages/ShippingPage.tsx';
import PaymentMethodPage from './pages/PaymentMethodPage.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path='product/:slug' element={<ProductPage />} />
      <Route path='cart' element={<CartPage />} />
      <Route path='signin' element={<SignIn />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='shipping' element={<ShippingPage />} />
      <Route path='payment' element={<PaymentMethodPage />} />
    </Route>
  )
);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </StoreProvider>
    
  </React.StrictMode>,
)
