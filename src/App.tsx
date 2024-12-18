import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import CreateInvoice from './pages/CreateInvoice';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Business from './pages/Business';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="invoices/new" element={<CreateInvoice />} />
          <Route path="customers" element={<Customers />} />
          <Route path="products" element={<Products />} />
          <Route path="business" element={<Business />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;