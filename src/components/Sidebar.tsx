import React, { useState } from 'react';
import { Search, MapPin, Globe, Map, Plus, X, User, LogOut, Filter, BarChart3 } from 'lucide-react';
import type { City, User as UserType } from '../types';

interface SidebarProps {
  cities: City[];
  allCities: City[];
  visitedCities: City[];
  visitedCountries: string[];
  totalCities: number;
  onCityClick: (city: City) => void;
  onToggleVisited: (cityId: string) => void;
  onAddCustomCity: (name: string, lat: number, lng: number) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  showOnlyVisited: boolean;
  onToggleShowOnlyVisited: () => void;
  onRemoveCustomCity: (cityId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  mapStats: {
    visitedCountries: string[];
    visitedContinents: string[];
    completionPercentage: number;
  };
  user: UserType | null;
  onFilterChange: (showVisited: boolean) => void;
  onLoginClick: () => void;
  showLoginButton: boolean;
  onLogout: () => void;
}

export function Sidebar({
  cities,
  allCities,
  visitedCities,
  visitedCountries,
  totalCities,
  onCityClick,
  onToggleVisited,
  onAddCustomCity,
  searchTerm,
  onSearchChange,
  showOnlyVisited,
  onToggleShowOnlyVisited,
  onRemoveCustomCity,
  isOpen,
  onClose,
  mapStats,
  user,
  onFilterChange,
  onLoginClick,
  showLoginButton,
  onLogout
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'search' | 'visited' | 'stats' | 'custom'>('search');
  const [newCityName, setNewCityName] = useState('');
  const [isAddingCity, setIsAddingCity] = useState(false);

  const customCities = cities.filter(city => city.isCustom);
  
  const filteredCities = cities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         city.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !showOnlyVisited || city.visited;
    return matchesSearch && matchesFilter;
  });

  const handleAddCity = () => {
    if (newCityName.trim()) {
      // For demo purposes, add at a random location
      const lat = Math.random() * 180 - 90;
      const lng = Math.random() * 360 - 180;
      onAddCustomCity(newCityName.trim(), lat, lng);
      setNewCityName('');
      setIsAddingCity(false);
    }
  };

  const getUserInitials = (user: UserType | null) => {
    if (!user?.email) return 'U';
    return user.email.charAt(0).toUpperCase();
  };

  const getWelcomeMessage = (user: UserType | null) => {
    if (!user?.email) return 'Welcome, Explorer!';
    const name = user.email.split('@')[0];
    return `Welcome back, ${name}!`;
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full w-80 bg-white shadow-xl z-[60]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
        lg:min-h-0
      `}>
        {/* Profile & Stats Header */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-6">
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              {user ? (
                <span className="text-lg font-semibold">{getUserInitials(user)}</span>
              ) : (
                <User size={24} />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{getWelcomeMessage(user)}</h2>
              {user && (
                <p className="text-blue-100 text-sm opacity-90">{user.email}</p>
              )}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Travel Progress</span>
              <span className="text-sm font-bold">{Math.round(mapStats.completionPercentage)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${mapStats.completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{visitedCities.length}</div>
              <div className="text-xs opacity-90">Cities</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{mapStats.visitedCountries.length}</div>
              <div className="text-xs opacity-90">Countries</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{mapStats.visitedContinents.length}</div>
              <div className="text-xs opacity-90">Continents</div>
            </div>
            {customCities.length > 0 && (
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{customCities.length}</div>
                <div className="text-xs opacity-90">Custom</div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button
              onClick={onToggleShowOnlyVisited}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                showOnlyVisited 
                  ? 'bg-white text-blue-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Filter size={14} className="inline mr-1" />
              {showOnlyVisited ? 'Show All' : 'Visited Only'}
            </button>
            
            {showLoginButton ? (
              <button
                onClick={onLoginClick}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              >
                Login
              </button>
            ) : (
              <button
                onClick={onLogout}
                className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'search'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Search size={16} className="inline mr-2" />
              Search
            </button>
            <button
              onClick={() => setActiveTab('visited')}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'visited'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <MapPin size={16} className="inline mr-2" />
              Visited
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'stats'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BarChart3 size={16} className="inline mr-2" />
              Stats
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'custom'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Plus size={16} className="inline mr-2" />
              Custom
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'search' && (
            <div className="h-full flex flex-col">
              {/* Search Input */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search cities or countries..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Cities List */}
              <div className="flex-1 overflow-y-auto">
                {filteredCities.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <Globe size={48} className="mx-auto mb-2 opacity-50" />
                    <p>No cities found</p>
                  </div>
                ) : (
                  <div className="p-2">
                    {filteredCities.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => onCityClick(city)}
                        className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                          city.visited
                            ? 'bg-green-50 border border-green-200 hover:bg-green-100'
                            : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{city.name}</h3>
                            <p className="text-sm text-gray-600">{city.country}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {city.isCustom && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onRemoveCustomCity(city.id);
                                }}
                                className="p-1 text-red-500 hover:bg-red-100 rounded"
                              >
                                <X size={16} />
                              </button>
                            )}
                            <div className={`w-3 h-3 rounded-full ${
                              city.visited ? 'bg-green-500' : 'bg-gray-300'
                            }`} />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'visited' && (
            <div className="h-full overflow-y-auto p-4">
              {visitedCities.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <MapPin size={48} className="mx-auto mb-2 opacity-50" />
                  <p>No cities visited yet</p>
                  <p className="text-sm mt-1">Click on cities on the map to mark them as visited!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {visitedCities.map((city) => (
                    <div
                      key={city.id}
                      className="p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{city.name}</h3>
                          <p className="text-sm text-gray-600">{city.country}</p>
                        </div>
                        <button
                          onClick={() => onToggleVisited(city.id)}
                          className="p-1 text-green-600 hover:bg-green-100 rounded"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="h-full overflow-y-auto p-4">
              <div className="space-y-6">
                {/* Countries */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Globe size={20} className="mr-2" />
                    Countries Visited ({mapStats.visitedCountries.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {mapStats.visitedCountries.map((country) => (
                      <div key={country} className="p-2 bg-blue-50 rounded-lg text-sm">
                        {country}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Continents */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Map size={20} className="mr-2" />
                    Continents Explored ({mapStats.visitedContinents.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {mapStats.visitedContinents.map((continent) => (
                      <div key={continent} className="p-2 bg-purple-50 rounded-lg text-sm">
                        {continent}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Overall Progress</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Cities visited</span>
                      <span>{visitedCities.length} / {totalCities}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${mapStats.completionPercentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 text-center">
                      {Math.round(mapStats.completionPercentage)}% Complete
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="h-full flex flex-col">
              {/* Add Custom City */}
              <div className="p-4 border-b border-gray-200">
                {isAddingCity ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Enter city name..."
                      value={newCityName}
                      onChange={(e) => setNewCityName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddCity}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add City
                      </button>
                      <button
                        onClick={() => {
                          setIsAddingCity(false);
                          setNewCityName('');
                        }}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAddingCity(true)}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Plus size={20} className="mr-2" />
                    Add Custom City
                  </button>
                )}
              </div>

              {/* Custom Cities List */}
              <div className="flex-1 overflow-y-auto p-4">
                {customCities.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <Plus size={48} className="mx-auto mb-2 opacity-50" />
                    <p>No custom cities yet</p>
                    <p className="text-sm mt-1">Add your own special places!</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {customCities.map((city) => (
                      <div
                        key={city.id}
                        className={`p-3 rounded-lg border ${
                          city.visited
                            ? 'bg-green-50 border-green-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{city.name}</h3>
                            <p className="text-sm text-gray-600">Custom Location</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onToggleVisited(city.id)}
                              className={`w-6 h-6 rounded-full border-2 ${
                                city.visited
                                  ? 'bg-green-500 border-green-500'
                                  : 'border-gray-300 hover:border-gray-400'
                              }`}
                            />
                            <button
                              onClick={() => onRemoveCustomCity(city.id)}
                              className="p-1 text-red-500 hover:bg-red-100 rounded"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}