import React from 'react';
import { Menu, MapPin, Cloud, CloudOff, LogIn } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  visitedCities: number;
  visitedCountries: number;
  isSyncing?: boolean;
  onLoginClick?: () => void;
  showLoginButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onMenuClick, 
  visitedCities, 
  visitedCountries, 
  isSyncing = false,
  onLoginClick,
  showLoginButton = false
}) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-b border-blue-500 lg:hidden z-[70]">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors z-10"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xl">🗺️</span>
              <h1 className="text-lg font-semibold">Travel Map</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            {/* Login Button */}
            {showLoginButton && onLoginClick && (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <LogIn size={14} />
                <span className="text-xs hidden sm:inline">Login</span>
              </button>
            )}

            {/* Sync Status */}
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${
              isSyncing ? 'bg-yellow-500/20' : 'bg-white/20'
            }`}>
              {isSyncing ? (
                <>
                  <Cloud size={14} className="animate-pulse" />
                  <span className="text-xs hidden sm:inline">Syncing...</span>
                </>
              ) : (
                <>
                  <Cloud size={14} />
                  <span className="text-xs hidden sm:inline">Synced</span>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-1 bg-white/20 px-2 sm:px-3 py-1 rounded-full">
              <span>✨</span>
              <span className="font-medium text-xs sm:text-sm">{visitedCities}</span>
              <span className="hidden sm:inline text-xs sm:text-sm">cities</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-2 sm:px-3 py-1 rounded-full">
              <span>🌍</span>
              <span className="font-medium text-xs sm:text-sm">{visitedCountries}</span>
              <span className="hidden sm:inline text-xs sm:text-sm">countries</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};