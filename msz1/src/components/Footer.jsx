import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-600 py-4 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        © {new Date().getFullYear()} Turbokit. Tous droits réservés.
      </div>
    </footer>
  );
}
