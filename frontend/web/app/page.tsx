'use client';

import { useEffect, useState } from 'react';

interface MenuItem {
  id: number;
  name: string;
  price_php: number;
  vendor_name: string;
  location: string;
  current_stock: number;
  category: string;
}

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/menu')
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">USC FoodChain</h1>
          <p className="text-gray-600 mt-1">See it. Buy it. Blockchain it.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Available Now</h2>
          <p className="text-gray-600">{menuItems.length} items across USC canteens</p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.vendor_name}</p>
                  <p className="text-xs text-gray-500">{item.location}</p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {item.category}
                </span>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-2xl font-bold text-green-600">₱{item.price_php}</p>
                  <p className="text-xs text-gray-500">~{(item.price_php / 50).toFixed(2)} USC</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Stock: {item.current_stock}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}