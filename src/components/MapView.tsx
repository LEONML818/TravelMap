import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import { City } from '../types';
import { Plus, Loader2, Info, Edit2, Save, X, Eye, EyeOff } from 'lucide-react';

interface MapViewProps {
  cities: City[];
  onCityClick: (cityId: string) => void;
  onAddCustomCity: (lat: number, lng: number) => Promise<City | null>;
  isAddingCity: boolean;
  onRemoveCustomCity: (cityId: string) => void;
  onZoomChange: (zoom: number) => void;
  currentZoom: number;
  onUpdateCityName: (cityId: string, newName: string) => void;
  showOnlyVisited: boolean;
  onFilterChange: (showOnlyVisited: boolean) => void;
}

// Create custom emoji markers with size based on importance
const createEmojiIcon = (emoji: string, visited: boolean, isCustom: boolean = false, importance: string = 'medium') => {
  const getSize = () => {
    if (isCustom) return [36, 36];
    switch (importance) {
      case 'major': return [44, 44];
      case 'medium': return [36, 36];
      case 'small': return [28, 28];
      default: return [36, 36];
    }
  };

  const [width, height] = getSize();
  const fontSize = importance === 'major' ? 30 : importance === 'medium' ? 24 : 18;

  return new DivIcon({
    className: 'custom-emoji-marker',
    html: `
      <div class="emoji-marker ${visited ? 'visited' : 'unvisited'} ${isCustom ? 'custom-city' : ''} ${importance}">
        <div class="emoji-content" style="font-size: ${fontSize}px; width: ${width-8}px; height: ${height-8}px;">
          ${emoji}
        </div>
        ${visited ? '<div class="visited-badge">✨</div>' : ''}
        ${isCustom ? '<div class="custom-badge">📍</div>' : ''}
      </div>
    `,
    iconSize: [width, height],
    iconAnchor: [width/2, height],
    popupAnchor: [0, -height],
  });
};

// Component to handle map events
const MapEventHandler: React.FC<{ 
  onMapClick: (lat: number, lng: number) => void;
  onZoomChange: (zoom: number) => void;
}> = ({ onMapClick, onZoomChange }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng);
    },
    zoomend: (e) => {
      const zoom = e.target.getZoom();
      onZoomChange(zoom);
    },
  });
  return null;
};

export const MapView: React.FC<MapViewProps> = ({ 
  cities, 
  onCityClick, 
  onAddCustomCity, 
  isAddingCity,
  onRemoveCustomCity,
  onZoomChange,
  currentZoom,
  onUpdateCityName,
  showOnlyVisited,
  onFilterChange
}) => {
  const [addMode, setAddMode] = useState(false);
  const [editingCity, setEditingCity] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [showZoomInfo, setShowZoomInfo] = useState(true);

  const handleMapClick = async (lat: number, lng: number) => {
    if (addMode) {
      const newCity = await onAddCustomCity(lat, lng);
      if (newCity) {
        setAddMode(false);
      }
    }
  };

  const startEditing = (cityId: string, currentName: string) => {
    setEditingCity(cityId);
    setEditName(currentName);
  };

  const saveEdit = () => {
    if (editingCity && editName.trim()) {
      onUpdateCityName(editingCity, editName.trim());
      setEditingCity(null);
      setEditName('');
    }
  };

  const cancelEdit = () => {
    setEditingCity(null);
    setEditName('');
  };

  const getZoomInfo = () => {
    if (currentZoom <= 4) return { level: 'World View', cities: 'Major cities only' };
    if (currentZoom <= 7) return { level: 'Regional View', cities: 'Major & medium cities' };
    return { level: 'Detailed View', cities: 'All cities & towns' };
  };

  const zoomInfo = getZoomInfo();

  // Filter cities based on the visited filter
  const displayedCities = showOnlyVisited ? cities.filter(city => city.visited) : cities;

  return (
    <div className="h-full relative">
      <style jsx>{`
        .custom-emoji-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .emoji-marker {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
        }
        
        .emoji-marker:hover {
          transform: scale(1.2) translateY(-2px);
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.25));
        }
        
        .emoji-content {
          line-height: 1;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #e5e7eb;
          transition: all 0.3s ease;
        }
        
        .emoji-marker.major .emoji-content {
          border-width: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .emoji-marker.small .emoji-content {
          border-width: 2px;
        }
        
        .emoji-marker.visited .emoji-content {
          border-color: #10b981;
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          animation: pulse-glow 2s infinite;
        }
        
        .emoji-marker.unvisited .emoji-content {
          border-color: #d1d5db;
          background: #f9fafb;
          opacity: 0.7;
        }
        
        .emoji-marker.custom-city .emoji-content {
          border-color: #8b5cf6;
          background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
        }
        
        .visited-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          font-size: 12px;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: sparkle 1.5s infinite;
          border: 2px solid white;
        }
        
        .custom-badge {
          position: absolute;
          top: -8px;
          left: -8px;
          font-size: 10px;
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          border-radius: 50%;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          color: white;
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
          }
        }
        
        @keyframes sparkle {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.1) rotate(180deg);
          }
        }
      `}</style>
      
      {/* Dismissible Zoom Info */}
      {showZoomInfo && (
        <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-blue-200">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Info size={16} className="text-blue-500" />
              <div>
                <div className="font-medium text-gray-900">{zoomInfo.level}</div>
                <div className="text-gray-600 text-xs">{zoomInfo.cities}</div>
              </div>
            </div>
            <button
              onClick={() => setShowZoomInfo(false)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Dismiss"
            >
              <X size={14} className="text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>
      )}

      {/* Filter Toggle */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000]">
        <button
          onClick={() => onFilterChange(!showOnlyVisited)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 shadow-lg ${
            showOnlyVisited
              ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
              : 'bg-white/95 backdrop-blur-sm text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {showOnlyVisited ? <Eye size={16} /> : <EyeOff size={16} />}
          {showOnlyVisited ? 'Showing visited only' : 'Show all cities'}
          <span className="text-xs opacity-75">
            ({showOnlyVisited ? displayedCities.length : cities.length})
          </span>
        </button>
      </div>

      {/* Add City Mode Toggle */}
      <div className="absolute top-4 right-4 z-[1000]">
        <button
          onClick={() => setAddMode(!addMode)}
          disabled={isAddingCity}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 shadow-lg flex items-center gap-2 ${
            addMode
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600'
              : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
          } ${isAddingCity ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isAddingCity ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Adding...
            </>
          ) : addMode ? (
            <>
              ❌ Cancel
            </>
          ) : (
            <>
              <Plus size={16} />
              Add City
            </>
          )}
        </button>
      </div>

      {/* Instructions when in add mode */}
      {addMode && (
        <div className="absolute top-16 right-4 z-[1000] bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-purple-200 max-w-xs">
          <div className="text-sm text-gray-700">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-purple-500">📍</span>
              <span className="font-medium">Add Custom City</span>
            </div>
            <p>Click anywhere on the map to add a new city to your collection!</p>
          </div>
        </div>
      )}
      
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="h-full w-full rounded-lg z-0"
        zoomControl={false}
        style={{ cursor: addMode ? 'crosshair' : 'grab' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <MapEventHandler onMapClick={handleMapClick} onZoomChange={onZoomChange} />
        
        {displayedCities.map((city) => (
          <Marker
            key={city.id}
            position={city.coordinates}
            icon={createEmojiIcon(city.emoji, city.visited, city.isCustom, city.importance)}
            eventHandlers={{
              click: () => onCityClick(city.id),
            }}
          >
            <Popup>
              <div className="p-3 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{city.emoji}</span>
                  <div className="flex-1">
                    {editingCity === city.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-bold text-gray-900"
                          placeholder="City name"
                          autoFocus
                          onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                        />
                        <div className="flex gap-1">
                          <button
                            onClick={saveEdit}
                            className="flex-1 px-2 py-1 bg-green-500 text-white rounded text-xs font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                          >
                            <Save size={12} />
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex-1 px-2 py-1 bg-gray-500 text-white rounded text-xs font-medium hover:bg-gray-600 transition-colors flex items-center justify-center gap-1"
                          >
                            <X size={12} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 text-lg">{city.name}</h3>
                        {city.isCustom && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditing(city.id, city.name);
                            }}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Edit city name"
                          >
                            <Edit2 size={14} className="text-gray-500 hover:text-gray-700" />
                          </button>
                        )}
                      </div>
                    )}
                    <p className="text-sm text-gray-600">{city.country}</p>
                    <div className="flex items-center gap-2 text-xs">
                      {city.isCustom && (
                        <span className="text-purple-600 font-medium">📍 Custom</span>
                      )}
                      <span className={`px-2 py-1 rounded-full font-medium ${
                        city.importance === 'major' ? 'bg-red-100 text-red-700' :
                        city.importance === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {city.importance === 'major' ? '🏙️ Major' :
                         city.importance === 'medium' ? '🏘️ Medium' : '🏡 Small'}
                      </span>
                      {city.population && city.population > 0 && (
                        <span className="text-gray-500">
                          👥 {(city.population / 1000000).toFixed(1)}M
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  {city.visited ? (
                    <div className="flex items-center gap-1 text-emerald-600">
                      <span className="text-lg">✨</span>
                      <span className="font-medium text-sm">Visited!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-gray-500">
                      <span className="text-lg">📍</span>
                      <span className="text-sm">Not visited yet</span>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => onCityClick(city.id)}
                    className={`flex-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      city.visited
                        ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 hover:from-red-200 hover:to-pink-200 border border-red-200'
                        : 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 hover:from-emerald-200 hover:to-green-200 border border-emerald-200'
                    }`}
                  >
                    {city.visited ? '❌ Unmark' : '✅ Mark Visited'}
                  </button>
                  
                  {city.isCustom && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveCustomCity(city.id);
                      }}
                      className="px-3 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 border border-gray-300 transition-all duration-200"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};