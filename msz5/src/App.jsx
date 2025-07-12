import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


export default function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900">Bienvenue dans Turbokit</h1>
      </main>
      <Footer />
    </>
  );
}
