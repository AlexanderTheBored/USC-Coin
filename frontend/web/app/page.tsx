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
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCanteen, setSelectedCanteen] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetch('http://localhost:3001/api/menu')
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
        setFilteredItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Apply filters whenever search or filters change
  useEffect(() => {
    let results = menuItems;

    // Search filter
    if (searchQuery) {
      results = results.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Canteen filter
    if (selectedCanteen !== 'all') {
      results = results.filter(item =>
        item.vendor_name === selectedCanteen
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      results = results.filter(item =>
        item.category === selectedCategory
      );
    }

    setFilteredItems(results);
  }, [searchQuery, selectedCanteen, selectedCategory, menuItems]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-900">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">USC FoodChain</h1>
          <p className="text-gray-900 mt-1">See it. Buy it. Blockchain it.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for food... (e.g., Pancit, Lumpia)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Canteen Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Canteen
              </label>
              <select
                value={selectedCanteen}
                onChange={(e) => setSelectedCanteen(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900"
              >
                <option value="all">All Canteens</option>
                <option value="Main Canteen">Main Canteen</option>
                <option value="Law Canteen">Law Canteen</option>
                <option value="Engineering Canteen">Engineering Canteen</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900"
              >
                <option value="all">All Categories</option>
                <option value="Main Dish">Main Dish</option>
                <option value="Snack">Snack</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            {(searchQuery || selectedCanteen !== 'all' || selectedCategory !== 'all') && (
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCanteen('all');
                    setSelectedCategory('all');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">
            {filteredItems.length === 0 ? 'No items found' : 'Available Now'}
          </h2>
          <p className="text-gray-900">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} 
            {searchQuery && ` matching "${searchQuery}"`}
            {selectedCanteen !== 'all' && ` at ${selectedCanteen}`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-700 mb-4">No food items match your search</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCanteen('all');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Show All Items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
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
        )}
      </main>
    </div>
  );
}