// src/components/Layout/Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-8 bg-gray-200 md:p-4 sm:p-2"> {/* Adjust padding for responsiveness */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
