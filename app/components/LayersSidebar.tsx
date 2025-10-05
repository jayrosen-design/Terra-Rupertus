'use client';

import { useState } from 'react';

interface LayerSet {
  name: string;
  layers: string[];
  icon: string;
  legend?: {
    type: 'scale' | 'single';
    title: string;
    colorbar?: string;
    min?: string;
    max?: string;
    color?: string;
  };
}

interface LayersSidebarProps {
  config: {
    sets: LayerSet[];
  };
  selectedLayerSet: string;
  onLayerSetChange: (layerSetName: string) => void;
}

export default function LayersSidebar({ config, selectedLayerSet, onLayerSetChange }: LayersSidebarProps) {
  const [isOpen, setIsOpen] = useState(true); // Open by default

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Layers Button */}
      <button
        className="layers-button"
        onClick={toggleSidebar}
        title="Toggle Layers Panel"
      >
        <span className="mr-2">🗺️</span>
        Layers
      </button>

      {/* Layers Sidebar */}
      <div className={`layers-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="layers-sidebar-header">
          <h3 className="layers-sidebar-title">NASA GIBS Layers</h3>
          <button
            className="layers-close-button"
            onClick={closeSidebar}
            title="Close Layers Panel"
          >
            ×
          </button>
        </div>

        <div className="layers-list">
          {config.sets.map((set) => (
            <button
              key={set.name}
              className={`layer-button ${selectedLayerSet === set.name ? 'active' : ''}`}
              onClick={() => {
                onLayerSetChange(set.name);
                // Don't close sidebar when selecting a layer
              }}
            >
              <span className="layer-icon">{set.icon}</span>
              <span>{set.name}</span>
            </button>
          ))}
        </div>

        {/* NASA Attribution */}
        <div className="mt-6 pt-4 border-t border-gray-600">
          <a
            href="https://wiki.earthdata.nasa.gov/display/GIBS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-100 text-sm transition-colors"
          >
            NASA EOSDIS GIBS
          </a>
        </div>
      </div>
    </>
  );
}
