import React, { useState } from 'react';
import { MapView } from './components/MapView';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginPage } from './components/LoginPage';
import { LoadingScreen } from './components/LoadingScreen';
import { useCities } from './hooks/useCities';
import { useAuth } from './hooks/useAuth';
import { isSupabaseConfigured } from './lib/supabase';

function App() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showOnlyVisited, setShowOnlyVisited] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { 
    cities, 
    allCities,
    visitedCities, 
    visitedCountries, 
    toggleCityVisited, 
    updateCityName,
    addCustomCity,
    removeCustomCity,
    isAddingCity,
    totalCities,
    updateZoom,
    currentZoom,
    mapStats,
    isLoading: citiesLoading,
    isSyncing
  } = useCities();

  // Show loading screen while checking authentication (only if Supabase is configured)
  if (isSupabaseConfigured && authLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  // Show login page if:
  // 1. Supabase is configured but not authenticated, OR
  // 2. User manually requested login page (even in demo mode)
  if ((isSupabaseConfigured && !isAuthenticated) || showLoginPage) {
    return <LoginPage onBack={() => setShowLoginPage(false)} />;
  }

  // Show loading screen while loading cities (only if authenticated)
  if (isSupabaseConfigured && isAuthenticated && citiesLoading) {
    return <LoadingScreen message="Loading your travel data..." />;
  }

  const handleCityClick = (cityId: string) => {
    toggleCityVisited(cityId);
  };

  const handleFilterChange = (showVisited: boolean) => {
    setShowOnlyVisited(showVisited);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        visitedCities={visitedCities.length}
        visitedCountries={visitedCountries}
        isSyncing={isSyncing}
        onLoginClick={() => setShowLoginPage(true)}
        showLoginButton={!isSupabaseConfigured || !isAuthenticated}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          cities={cities}
          allCities={allCities}
          visitedCities={visitedCities}
          visitedCountries={visitedCountries}
          totalCities={totalCities}
          onCityClick={(city) => handleCityClick(city.id)}
          onToggleVisited={toggleCityVisited}
          onAddCustomCity={addCustomCity}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          showOnlyVisited={showOnlyVisited}
          onToggleShowOnlyVisited={() => setShowOnlyVisited(!showOnlyVisited)}
          onRemoveCustomCity={removeCustomCity}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          mapStats={mapStats}
          user={user}
          onFilterChange={handleFilterChange}
          onLoginClick={() => setShowLoginPage(true)}
          showLoginButton={!isSupabaseConfigured || !isAuthenticated}
          onLogout={async () => {
            try {
              const { signOut } = await import('./hooks/useAuth');
              // For now, just reload the page to reset state
              window.location.reload();
            } catch (error) {
              console.error('Logout error:', error);
              window.location.reload();
            }
          }}
        />
        
        <main className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 p-4 lg:p-6">
            <MapView 
              cities={cities} 
              onCityClick={handleCityClick}
              onAddCustomCity={addCustomCity}
              isAddingCity={isAddingCity}
              onRemoveCustomCity={removeCustomCity}
              onZoomChange={updateZoom}
              currentZoom={currentZoom}
              onUpdateCityName={updateCityName}
              showOnlyVisited={showOnlyVisited}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App;