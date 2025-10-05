'use client';

import { useEffect, useRef, useState } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import LayersSidebar from './LayersSidebar';
import CustomTimeline from './CustomTimeline';

// Configure Cesium to use CDN for static assets
if (typeof window !== 'undefined') {
  (window as any).CESIUM_BASE_URL = 'https://cesium.com/downloads/cesiumjs/releases/1.119/Build/Cesium/';
}

// NASA GIBS Geographic Tiling Scheme (from official examples)
const createGeographicTilingScheme = (options?: any) => {
  const self = new Cesium.GeographicTilingScheme(options);
  const Math = Cesium.Math;

  const tilePixels = 512;
  const rectangle = Cesium.Rectangle.MAX_VALUE;

  // Resolution: radians per pixel
  const levels = [
    { width: 2, height: 1, resolution: 0.009817477042468103 },
    { width: 3, height: 2, resolution: 0.004908738521234052 },
    { width: 5, height: 3, resolution: 0.002454369260617026 },
    { width: 10, height: 5, resolution: 0.001227184630308513 },
    { width: 20, height: 10, resolution: 0.0006135923151542565 },
    { width: 40, height: 20, resolution: 0.00030679615757712823 },
    { width: 80, height: 40, resolution: 0.00015339807878856412 },
    { width: 160, height: 80, resolution: 0.00007669903939428206 },
    { width: 320, height: 160, resolution: 0.00003834951969714103 }
  ];

  self.getNumberOfXTilesAtLevel = function (level: number) {
    return levels[level].width;
  };

  self.getNumberOfYTilesAtLevel = function (level: number) {
    return levels[level].height;
  };

  self.tileXYToRectangle = function (x: number, y: number, level: number, result?: Cesium.Rectangle) {
    const resolution = levels[level].resolution;

    const xTileWidth = resolution * tilePixels;
    const west = x * xTileWidth + rectangle.west;
    const east = (x + 1) * xTileWidth + rectangle.west;

    const yTileHeight = resolution * tilePixels;
    const north = rectangle.north - y * yTileHeight;
    const south = rectangle.north - (y + 1) * yTileHeight;

    if (!result) {
      result = new Cesium.Rectangle(0, 0, 0, 0);
    }
    result.west = west;
    result.south = south;
    result.east = east;
    result.north = north;
    return result;
  };

  self.positionToTileXY = function (position: Cesium.Cartographic, level: number, result?: Cesium.Cartesian2): Cesium.Cartesian2 {
    if (!Cesium.Rectangle.contains(rectangle, position)) {
      return new Cesium.Cartesian2(0, 0);
    }

    const xTiles = levels[level].width;
    const yTiles = levels[level].height;
    const resolution = levels[level].resolution;

    const xTileWidth = resolution * tilePixels;
    const yTileHeight = resolution * tilePixels;

    let longitude = position.longitude;
    if (rectangle.east < rectangle.west) {
      longitude += Math.TWO_PI;
    }

    let xTileCoordinate = (longitude - rectangle.west) / xTileWidth | 0;
    if (xTileCoordinate >= xTiles) {
      xTileCoordinate = xTiles - 1;
    }

    const latitude = position.latitude;
    let yTileCoordinate = (rectangle.north - latitude) / yTileHeight | 0;
    if (yTileCoordinate > yTiles) {
      yTileCoordinate = yTiles - 1;
    }

    if (!result) {
      result = new Cesium.Cartesian2(0, 0);
    }
    result.x = xTileCoordinate;
    result.y = yTileCoordinate;
    return result;
  };

  return self;
};

interface NASAGibsViewerProps {
  className?: string;
}

export default function NASAGibsViewer({ className = '' }: NASAGibsViewerProps) {
  const viewerRef = useRef<Cesium.Viewer | null>(null);
  const [selectedLayerSet, setSelectedLayerSet] = useState<string>('Visible Reflectance, Morning');
  const [legend, setLegend] = useState<any>(null);

  // NASA GIBS Configuration (from official examples)
  const config = {
    resolutions: {
      '250m': {
        tileMatrixSetID: '250m',
        maximumLevel: 8
      },
      '500m': {
        tileMatrixSetID: '500m',
        maximumLevel: 7
      },
      '1km': {
        tileMatrixSetID: '1km',
        maximumLevel: 6
      },
      '2km': {
        tileMatrixSetID: '2km',
        maximumLevel: 5
      }
    },
    layers: {
      MODIS_Terra_CorrectedReflectance_TrueColor: {
        id: 'MODIS_Terra_CorrectedReflectance_TrueColor',
        resolution: '250m',
        format: 'image/jpeg',
        startDate: new Date(Date.UTC(2000, 1, 24))
      },
      MODIS_Aqua_CorrectedReflectance_TrueColor: {
        id: 'MODIS_Aqua_CorrectedReflectance_TrueColor',
        resolution: '250m',
        format: 'image/jpeg',
        startDate: new Date(Date.UTC(2002, 6, 3))
      },
      MODIS_Terra_Aerosol: {
        id: 'MODIS_Terra_Aerosol',
        resolution: '2km',
        format: 'image/png',
        startDate: new Date(Date.UTC(2000, 1, 24))
      },
      MODIS_Terra_Land_Surface_Temp_Day: {
        id: 'MODIS_Terra_Land_Surface_Temp_Day',
        resolution: '1km',
        format: 'image/png',
        startDate: new Date(Date.UTC(2000, 1, 24))
      },
      MODIS_Terra_Land_Surface_Temp_Night: {
        id: 'MODIS_Terra_Land_Surface_Temp_Night',
        resolution: '1km',
        format: 'image/png',
        startDate: new Date(Date.UTC(2000, 1, 24))
      },
      MODIS_Terra_Thermal_Anomalies_Day: {
        id: 'MODIS_Terra_Thermal_Anomalies_Day',
        wms: true,
        startDate: new Date(Date.UTC(2012, 4, 8))
      },
      MODIS_Terra_Thermal_Anomalies_Night: {
        id: 'MODIS_Terra_Thermal_Anomalies_Night',
        wms: true,
        startDate: new Date(Date.UTC(2012, 4, 8))
      },
      OSM_Land_Water_Map: {
        id: 'OSM_Land_Water_Map',
        resolution: '250m',
        format: 'image/png'
      },
      GHRSST_L4_MUR_Sea_Surface_Temperature: {
        id: 'GHRSST_L4_MUR_Sea_Surface_Temperature',
        resolution: '1km',
        format: 'image/png',
        startDate: new Date(Date.UTC(2002, 6, 1))
      },
      VIIRS_CityLights_2012: {
        id: 'VIIRS_CityLights_2012',
        resolution: '500m',
        format: 'image/jpeg'
      },
      BlueMarble_ShadedRelief_Bathymetry: {
        id: 'BlueMarble_ShadedRelief_Bathymetry',
        resolution: '500m',
        format: 'image/jpeg'
      },
      MISR_Aerosol_Optical_Depth_Avg_Green_Monthly: {
        id: 'MISR_Aerosol_Optical_Depth_Avg_Green_Monthly',
        resolution: '1km',
        format: 'image/png',
        startDate: new Date(Date.UTC(2000, 1, 24))
      },
      MOPITT_CO_Daily_Total_Column_Day: {
        id: 'MOPITT_CO_Daily_Total_Column_Day',
        resolution: '1km',
        format: 'image/png',
        startDate: new Date(Date.UTC(2000, 1, 24))
      },
      AIRS_Dust_Score_Ocean_Day: {
        id: 'AIRS_Dust_Score_Ocean_Day',
        resolution: '2km',
        format: 'image/png',
        startDate: new Date(Date.UTC(2016, 0, 28))
      },
      MODIS_Terra_Sea_Ice: {
        id: 'MODIS_Terra_Sea_Ice',
        resolution: '1km',
        format: 'image/png',
        startDate: new Date(Date.UTC(2000, 1, 24))
      },
      MODIS_Terra_NDSI_Snow_Cover: {
        id: 'MODIS_Terra_NDSI_Snow_Cover',
        resolution: '500m',
        format: 'image/png',
        startDate: new Date(Date.UTC(2000, 1, 24))
      },
      MODIS_Terra_SurfaceReflectance_Bands721: {
        id: 'MODIS_Terra_SurfaceReflectance_Bands721',
        resolution: '500m',
        format: 'image/jpeg',
        startDate: new Date(Date.UTC(2000, 1, 24))
      },
      MODIS_Terra_Cloud_Fraction_Day: {
        id: 'MODIS_Terra_Cloud_Fraction_Day',
        resolution: '1km',
        format: 'image/png',
        startDate: new Date(Date.UTC(2000, 1, 24))
      },
      MODIS_Terra_L2_Chlorophyll_A: {
        id: 'MODIS_Terra_L2_Chlorophyll_A',
        resolution: '1km',
        format: 'image/png',
        startDate: new Date(Date.UTC(2000, 1, 24))
      }
    },
    sets: [
      {
        name: 'Visible Reflectance, Morning',
        layers: ['MODIS_Terra_CorrectedReflectance_TrueColor'],
        icon: '🌅'
      },
      {
        name: 'Visible Reflectance, Afternoon',
        layers: ['MODIS_Aqua_CorrectedReflectance_TrueColor'],
        icon: '🌞'
      },
      {
        name: 'Aerosols',
        layers: ['MODIS_Terra_CorrectedReflectance_TrueColor', 'MODIS_Terra_Aerosol'],
        icon: '🌫️',
        legend: {
          type: 'scale' as const,
          title: 'Aerosol Optical Depth',
          colorbar: 'https://gibs.earthdata.nasa.gov/colormaps/MODIS_Terra_Aerosol_Optical_Depth.png',
          min: '-0.05',
          max: '0.70'
        }
      },
      {
        name: 'Land Surface Temperature, Day',
        layers: ['MODIS_Terra_CorrectedReflectance_TrueColor', 'MODIS_Terra_Land_Surface_Temp_Day'],
        icon: '🌡️',
        legend: {
          type: 'scale' as const,
          title: 'Temperature',
          colorbar: 'https://gibs.earthdata.nasa.gov/colormaps/land_surface_temperature.png',
          min: '-33°C',
          max: '67°C'
        }
      },
      {
        name: 'Land Surface Temperature, Night',
        layers: ['OSM_Land_Water_Map', 'MODIS_Terra_Land_Surface_Temp_Night'],
        icon: '🌙',
        legend: {
          type: 'scale' as const,
          title: 'Temperature',
          colorbar: 'https://gibs.earthdata.nasa.gov/colormaps/land_surface_temperature.png',
          min: '-33°C',
          max: '67°C'
        }
      },
      {
        name: 'Sea Surface Temperature',
        layers: ['OSM_Land_Water_Map', 'GHRSST_L4_MUR_Sea_Surface_Temperature'],
        icon: '🌊',
        legend: {
          type: 'scale' as const,
          title: 'Temperature',
          colorbar: 'https://gibs.earthdata.nasa.gov/colormaps/sea_surface_temperature.png',
          min: '2°C',
          max: '32°C'
        }
      },
      
      {
        name: 'Fires and Thermal Anomalies (Day)',
        layers: ['MODIS_Terra_CorrectedReflectance_TrueColor', 'MODIS_Terra_Thermal_Anomalies_Day'],
        icon: '🔥',
        legend: {
          type: 'single' as const,
          title: 'Thermal Anomalies (Day)',
          color: '#ff3333'
        }
      },
      {
        name: 'Fires and Thermal Anomalies (Night)',
        layers: ['OSM_Land_Water_Map', 'MODIS_Terra_Thermal_Anomalies_Night'],
        icon: '🌋',
        legend: {
          type: 'single' as const,
          title: 'Thermal Anomalies (Night)',
          color: '#ff8800'
        }
      },
      {
        name: 'Aerosol Optical Depth Average (Green, Monthly)',
        layers: ['MODIS_Terra_CorrectedReflectance_TrueColor', 'MISR_Aerosol_Optical_Depth_Avg_Green_Monthly'],
        icon: '🟩',
        legend: {
          type: 'scale' as const,
          title: 'AOD (Green, Monthly Avg)',
          colorbar: 'https://gibs.earthdata.nasa.gov/colormaps/aerosol_optical_depth.png',
          min: 'Low',
          max: 'High'
        }
      },
      {
        name: 'Carbon Monoxide (L3, Daily, Day, Total Column)',
        layers: ['MODIS_Terra_CorrectedReflectance_TrueColor', 'MOPITT_CO_Daily_Total_Column_Day'],
        icon: '☀️',
        legend: {
          type: 'scale' as const,
          title: 'CO Total Column (Day)',
          colorbar: 'https://gibs.earthdata.nasa.gov/colormaps/carbon_monoxide.png',
          min: 'Low',
          max: 'High'
        }
      },
      {
        name: 'Dust',
        layers: ['MODIS_Aqua_CorrectedReflectance_TrueColor', 'AIRS_Dust_Score_Ocean_Day'],
        icon: '🏜️',
        legend: {
          type: 'scale' as const,
          title: 'Dust Score',
          colorbar: 'https://gibs.earthdata.nasa.gov/colormaps/dust_score.png',
          min: '360',
          max: '500+'
        }
      },
      {
        name: 'Sea Ice',
        layers: ['MODIS_Terra_SurfaceReflectance_Bands721', 'MODIS_Terra_Sea_Ice'],
        icon: '🧊',
        legend: {
          type: 'single' as const,
          title: 'Ice',
          color: 'rgb(255,100,100)'
        }
      },
      {
        name: 'Snow Cover',
        layers: ['MODIS_Terra_SurfaceReflectance_Bands721', 'MODIS_Terra_NDSI_Snow_Cover'],
        icon: '❄️',
        legend: {
          type: 'scale' as const,
          title: 'Snow Cover',
          colorbar: 'https://gibs.earthdata.nasa.gov/colormaps/MODIS_Terra_NDSI_Snow_Cover.png',
          min: '1%',
          max: '100%'
        }
      },
      {
        name: 'Earth at Night 2012',
        layers: ['VIIRS_CityLights_2012'],
        icon: '🌃'
      },
      {
        name: 'Blue Marble Next Generation',
        layers: ['BlueMarble_ShadedRelief_Bathymetry'],
        icon: '🌍'
      },
      {
        name: 'Cloud Fraction (Day)',
        layers: ['MODIS_Terra_CorrectedReflectance_TrueColor', 'MODIS_Terra_Cloud_Fraction_Day'],
        icon: '⛅',
        legend: {
          type: 'scale' as const,
          title: 'Cloud Fraction (Day)',
          colorbar: 'https://gibs.earthdata.nasa.gov/colormaps/cloud_fraction.png',
          min: '0%',
          max: '100%'
        }
      },
      {
        name: 'Chlorophyll a (L2)',
        layers: ['OSM_Land_Water_Map', 'MODIS_Terra_L2_Chlorophyll_A'],
        icon: '🦠',
        legend: {
          type: 'scale' as const,
          title: 'Chlorophyll-a (L2)',
          colorbar: 'https://gibs.earthdata.nasa.gov/colormaps/chlorophyll_a.png',
          min: 'Low',
          max: 'High'
        }
      },
      {
        name: 'VIIRS Light Pollution',
        layers: ['VIIRS_CityLights_2012'],
        icon: '💡'
      }
    ]
  };

  useEffect(() => {
    if (!viewerRef.current) {
      // Earliest date of Corrected Reflectance in archive: Feb 24, 2000
      const startTime = Cesium.JulianDate.fromDate(new Date(Date.UTC(2000, 1, 24)));
      const endTime = Cesium.JulianDate.now();

      // If slightly after midnight, show the previous day's data while
      // the near-real time imagery is processing.
      const show = new Date();
      if (show.getUTCHours() < 3) {
        show.setUTCDate(show.getUTCDate() - 1);
      }
      const initialTime = Cesium.JulianDate.fromDate(show);

      const clock = new Cesium.Clock();
      clock.startTime = startTime;
      clock.stopTime = endTime;
      clock.currentTime = initialTime;
      clock.multiplier = 0; // Don't start animation by default
      clock.clockRange = Cesium.ClockRange.CLAMPED;
      
      const clockViewModel = new Cesium.ClockViewModel(clock);

      // Create the viewer
      const viewer = new Cesium.Viewer('cesiumContainer', {
        clockViewModel: clockViewModel,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false, // Disable default timeline - using custom timeline
        fullscreenButton: false,
        vrButton: false,
        contextOptions: {
          webgl: {
            preserveDrawingBuffer: true
          }
        }
      });

      viewer.scene.globe.baseColor = Cesium.Color.BLACK;
      viewerRef.current = viewer;

      // Set initial view
      const getLeadingPoint = () => {
        const curHour = new Date().getUTCHours();
        let adjustedHour = curHour < 3 ? 23 : curHour - 5;
        
        const minLon = 20.6015625 + adjustedHour * (-200.53125 / 23.0);
        const maxLon = minLon + 159.328125;
        const minLat = -46.546875;
        const maxLat = 53.015625;

        return new Cesium.Rectangle(
          Cesium.Math.toRadians(minLon),
          Cesium.Math.toRadians(minLat),
          Cesium.Math.toRadians(maxLon),
          Cesium.Math.toRadians(maxLat)
        );
      };

      viewer.camera.setView({ destination: getLeadingPoint() });

      // Load initial layer set
      updateLayers('Visible Reflectance, Morning');
    }

    return () => {
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  // GIBS needs the day as a string parameter in the form of YYYY-MM-DD.
  const isoDate = (isoDateTime: string) => {
    return isoDateTime.split('T')[0];
  };

  // Create the layer for the current day
  const createProvider = (layerId: string) => {
    const layer = config.layers[layerId as keyof typeof config.layers];
    let time = '';

    if ('startDate' in layer && layer.startDate && viewerRef.current) {
      const isoDateTime = viewerRef.current.clock.currentTime.toString();
      time = '?TIME=' + isoDate(isoDateTime);
    }

    let provider: Cesium.ImageryProvider;
    if (!('wms' in layer) || !layer.wms) {
      const resolution = config.resolutions[(layer as any).resolution as keyof typeof config.resolutions];
      const options = {
        url: 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi' + time,
        layer: layer.id,
        style: '',
        format: (layer as any).format,
        tileMatrixSetID: resolution.tileMatrixSetID,
        minimumLevel: 0,
        maximumLevel: resolution.maximumLevel,
        tileWidth: 512,
        tileHeight: 512,
        tilingScheme: createGeographicTilingScheme()
      };
      provider = new Cesium.WebMapTileServiceImageryProvider(options);
    } else {
      const optionsWMS = {
        url: 'https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi' + time,
        layers: layer.id,
        parameters: {
          transparent: true,
          format: 'image/png'
        }
      };
      provider = new Cesium.WebMapServiceImageryProvider(optionsWMS);
    }
    return provider;
  };

  // Update layers when selection changes
  const updateLayers = (setName: string) => {
    if (!viewerRef.current) return;

    const set = config.sets.find(s => s.name === setName);
    if (!set) return;

    // Update the selected layer set state first
    setSelectedLayerSet(setName);
    setLegend(set.legend || null);

    // Check if data is available for the current date
    const currentDate = viewerRef.current.clock.currentTime;
    
    // Check if all layers in the set have data for the current date
    const allLayersAvailable = set.layers.every(layerId => {
      const layer = config.layers[layerId as keyof typeof config.layers];
      if (!('startDate' in layer) || !layer.startDate) {
        return true; // Static layers are always available
      }
      const jsDate = Cesium.JulianDate.toDate(currentDate);
      return jsDate >= layer.startDate;
    });

    // If data is not available, find the next available date
    if (!allLayersAvailable) {
      let earliestAvailableDate: Date | null = null;
      const currentJsDate = Cesium.JulianDate.toDate(currentDate);

      set.layers.forEach(layerId => {
        const layer = config.layers[layerId as keyof typeof config.layers];
        if ('startDate' in layer && layer.startDate) {
          if (layer.startDate > currentJsDate) {
            if (!earliestAvailableDate || layer.startDate < earliestAvailableDate) {
              earliestAvailableDate = layer.startDate;
            }
          }
        }
      });

      // Jump to the next available date
      if (earliestAvailableDate) {
        viewerRef.current.clock.currentTime = Cesium.JulianDate.fromDate(earliestAvailableDate);
      }
    }

    // Now load the layers
    const layers = viewerRef.current.scene.imageryLayers;
    layers.removeAll();
    
    set.layers.forEach((layerId) => {
      layers.addImageryProvider(createProvider(layerId));
    });
  };

  // Check if data is available for a given date and layer
  const isDataAvailableForDate = (layerId: string, date: Cesium.JulianDate): boolean => {
    const layer = config.layers[layerId as keyof typeof config.layers];
    if (!('startDate' in layer) || !layer.startDate) {
      return true; // Static layers are always available
    }
    
    const jsDate = Cesium.JulianDate.toDate(date);
    return jsDate >= layer.startDate;
  };

  // Find next available date for current layer set
  const findNextAvailableDate = (currentDate: Cesium.JulianDate): Cesium.JulianDate | null => {
    if (!viewerRef.current || !selectedLayerSet) return null;

    const set = config.sets.find(s => s.name === selectedLayerSet);
    if (!set) return null;

    // Check if all layers in the set have data for the current date
    const allLayersAvailable = set.layers.every(layerId => 
      isDataAvailableForDate(layerId, currentDate)
    );

    if (allLayersAvailable) return currentDate;

    // Find the earliest start date among all layers in the set
    let earliestAvailableDate: Date | null = null;
    const currentJsDate = Cesium.JulianDate.toDate(currentDate);

    set.layers.forEach(layerId => {
      const layer = config.layers[layerId as keyof typeof config.layers];
      if ('startDate' in layer && layer.startDate) {
        if (layer.startDate > currentJsDate) {
          if (!earliestAvailableDate || layer.startDate < earliestAvailableDate) {
            earliestAvailableDate = layer.startDate;
          }
        }
      }
    });

    return earliestAvailableDate ? Cesium.JulianDate.fromDate(earliestAvailableDate) : currentDate;
  };

  // Add a ref to track if we're currently updating to prevent infinite loops
  const isUpdatingRef = useRef(false);

  // Refresh layers when timeline changes
  const refreshLayers = () => {
    if (!viewerRef.current || !selectedLayerSet || isUpdatingRef.current) return;

    const set = config.sets.find(s => s.name === selectedLayerSet);
    if (!set) return;

    // Check if data is available for the current date
    const currentDate = viewerRef.current.clock.currentTime;
    const availableDate = findNextAvailableDate(currentDate);

    // If we need to skip to a different date, update the clock
    if (availableDate && !Cesium.JulianDate.equals(currentDate, availableDate)) {
      isUpdatingRef.current = true;
      viewerRef.current.clock.currentTime = availableDate;
      // Wait a bit then reset the flag and refresh
      setTimeout(() => {
        isUpdatingRef.current = false;
        refreshLayers();
      }, 300);
      return;
    }

    const layers = viewerRef.current.scene.imageryLayers;
    
    // Add new layers first (they will load in background)
    const newLayers: Cesium.ImageryLayer[] = [];
    set.layers.forEach((layerId) => {
      const provider = createProvider(layerId);
      const newLayer = layers.addImageryProvider(provider);
      newLayers.push(newLayer);
    });
    
    // Remove old layers after a short delay to allow new ones to start loading
    setTimeout(() => {
      if (!viewerRef.current) return;
      
      // Remove all layers except the newly added ones
      const currentLayers = viewerRef.current.scene.imageryLayers;
      for (let i = currentLayers.length - 1; i >= 0; i--) {
        const layer = currentLayers.get(i);
        if (!newLayers.includes(layer)) {
          currentLayers.remove(layer);
        }
      }
    }, 100);
  };

  // Handle date changes from custom timeline
  const handleTimelineChange = (date: Date) => {
    refreshLayers();
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Cesium Container */}
      <div id="cesiumContainer" className="w-full h-full" />
      
      {/* Layers Sidebar */}
      <LayersSidebar 
        config={config}
        selectedLayerSet={selectedLayerSet}
        onLayerSetChange={updateLayers}
      />

      {/* Custom Timeline */}
      <CustomTimeline 
        viewer={viewerRef.current}
        onDateChange={handleTimelineChange}
      />

      {/* Legend Panel */}
      {legend && (
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg mb-32">
          <div className="text-sm">
            <div className="font-bold mb-2">{legend.title}</div>
            {legend.type === 'scale' && (
              <div>
                <img 
                  src={legend.colorbar} 
                  alt="Colorbar" 
                  className="w-32 h-4 border border-gray-400 mb-1"
                />
                <div className="flex justify-between text-xs">
                  <span>{legend.min}</span>
                  <span>{legend.max}</span>
                </div>
              </div>
            )}
            {legend.type === 'single' && (
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 border border-gray-400 mr-2"
                  style={{ backgroundColor: legend.color }}
                />
                <span>{legend.title}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
