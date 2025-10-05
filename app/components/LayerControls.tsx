'use client';

import { useState, useEffect } from 'react';

interface LayerControlsProps {
  viewer: any;
  activeLayers: Set<string>;
  setActiveLayers: (layers: Set<string>) => void;
}

interface LayerConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const AVAILABLE_LAYERS: LayerConfig[] = [
  {
    id: 'fires',
    name: 'Active Fires',
    icon: '🔥',
    description: 'MODIS thermal anomalies and fire detections',
  },
  {
    id: 'co',
    name: 'Carbon Monoxide',
    icon: '💨',
    description: 'MOPITT CO total column measurements',
  },
  {
    id: 'lights',
    name: 'Light Pollution',
    icon: '💡',
    description: 'VIIRS nighttime lights showing urban development',
  },
  {
    id: 'aerosol',
    name: 'Aerosol / Pollution',
    icon: '🌫️',
    description: 'MODIS aerosol optical depth (methane proxy)',
  },
];

export default function LayerControls({ viewer, activeLayers, setActiveLayers }: LayerControlsProps) {
  const [opacities, setOpacities] = useState<Record<string, number>>({
    fires: 0.7,
    co: 0.7,
    lights: 0.7,
    aerosol: 0.7,
  });

  const toggleLayer = (layerId: string) => {
    const newLayers = new Set(activeLayers);
    if (newLayers.has(layerId)) {
      newLayers.delete(layerId);
    } else {
      newLayers.add(layerId);
    }
    setActiveLayers(newLayers);
  };

  const updateOpacity = (layerId: string, opacity: number) => {
    setOpacities((prev) => ({ ...prev, [layerId]: opacity }));
    
    if (viewer && activeLayers.has(layerId)) {
      // Update the imagery layer opacity
      const layers = viewer.imageryLayers;
      for (let i = 0; i < layers.length; i++) {
        const layer = layers.get(i);
        // Simple approach: update all non-base layers
        if (i > 0) {
          layer.alpha = opacity;
        }
      }
    }
  };

  return (
    <div className="layer-controls">
      <h2>🛰️ Data Layers</h2>
      <p style={{ 
        color: '#adb5bd', 
        fontSize: '12px', 
        marginBottom: '15px',
        lineHeight: '1.4'
      }}>
        Toggle layers to explore 25 years of NASA Terra satellite data
      </p>
      
      {AVAILABLE_LAYERS.map((layer) => (
        <div key={layer.id} className="layer-item">
          <div className="layer-header">
            <div className="layer-name">
              <span className="layer-icon">{layer.icon}</span>
              <span>{layer.name}</span>
            </div>
            <button
              className={`layer-toggle ${activeLayers.has(layer.id) ? 'active' : ''}`}
              onClick={() => toggleLayer(layer.id)}
              aria-label={`Toggle ${layer.name}`}
            />
          </div>
          
          <p style={{ 
            color: '#868e96', 
            fontSize: '11px', 
            marginBottom: '10px',
            lineHeight: '1.3'
          }}>
            {layer.description}
          </p>

          {activeLayers.has(layer.id) && (
            <div className="opacity-control">
              <label>Opacity:</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={opacities[layer.id]}
                onChange={(e) => updateOpacity(layer.id, parseFloat(e.target.value))}
                className="opacity-slider"
              />
              <span style={{ color: '#adb5bd', fontSize: '12px', minWidth: '35px' }}>
                {Math.round(opacities[layer.id] * 100)}%
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

