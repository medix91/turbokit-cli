import React from 'react';

export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">Turbokit</div>
        <nav className="space-x-6">
          <a href="#" className="text-gray-600 hover:text-blue-600">Accueil</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Services</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">À propos</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
        </nav>
      </div>
    </header>
  );
}
