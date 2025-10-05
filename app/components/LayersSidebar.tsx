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
          {Object.entries(groupSetsByInstrument(config.sets)).map(([group, sets]) => (
            <div key={group} className="mb-4 rounded-md border border-gray-600 bg-black bg-opacity-40">
              <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-blue-300 border-b border-gray-600">{group}</div>
              <div className="p-2">
                {sets.map((set) => (
                  <button
                    key={set.name}
                    className={`layer-button ${selectedLayerSet === set.name ? 'active' : ''}`}
                    onClick={() => {
                      onLayerSetChange(set.name);
                    }}
                  >
                    <span className="layer-icon">{set.icon}</span>
                    <span>{set.name}</span>
                  </button>
                ))}
              </div>
            </div>
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

// Helper: group layer sets by inferred satellite/instrument from layer IDs
function groupSetsByInstrument(sets: LayerSet[]): Record<string, LayerSet[]> {
  const groups: Record<string, LayerSet[]> = {};
  for (const s of sets) {
    const group = inferGroupName(s.layers);
    if (!groups[group]) groups[group] = [];
    groups[group].push(s);
  }
  return groups;
}

function inferGroupName(layerIds: string[]): string {
  // Prefer first scientific layer over base like OSM/BlueMarble
  const preferred = layerIds.find((id) => !/^OSM_|^BlueMarble_/i.test(id)) || layerIds[0] || 'Other';
  const parts = preferred.split('_');
  // Known instruments/satellites
  const first = parts[0];
  const second = parts[1] || '';
  if (/^MODIS$/i.test(first)) {
    if (/^Terra$/i.test(second)) return 'MODIS Terra';
    if (/^Aqua$/i.test(second)) return 'MODIS Aqua';
    return 'MODIS';
  }
  if (/^VIIRS$/i.test(first)) return 'VIIRS';
  if (/^MISR$/i.test(first)) return 'MISR - Terra';
  if (/^MOPITT$/i.test(first)) return 'MOPITT - Terra';
  if (/^AIRS$/i.test(first)) return 'AIRS';
  if (/^GHRSST$/i.test(first)) return 'GHRSST';
  if (/^BlueMarble$/i.test(first)) return 'Blue Marble';
  if (/^OSM$/i.test(first)) return 'OpenStreetMap';
  return first || 'Other';
}
