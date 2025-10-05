'use client';

import { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

// Configure Cesium base URL for static assets
if (typeof window !== 'undefined') {
  (window as any).CESIUM_BASE_URL = '/cesium';
}

interface CesiumGlobeProps {
  onViewerReady: (viewer: Cesium.Viewer) => void;
  activeLayers: Set<string>;
  currentDate: Date;
}

export default function CesiumGlobe({ onViewerReady, activeLayers, currentDate }: CesiumGlobeProps) {
  const cesiumContainer = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Cesium.Viewer | null>(null);
  const layerRefsRef = useRef<Map<string, Cesium.ImageryLayer>>(new Map());
  const lastYearRef = useRef<number>(0);

  useEffect(() => {
    if (!cesiumContainer.current || viewerRef.current) return;

    // Initialize Cesium Viewer with free imagery (no Ion required)
    const viewer = new Cesium.Viewer(cesiumContainer.current, {
      baseLayerPicker: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      animation: false,
      timeline: false,
      fullscreenButton: false,
      vrButton: false,
      infoBox: false,
      selectionIndicator: false,
      shadows: false,
    });

    // Replace default imagery with Natural Earth II (no Ion auth required)
    viewer.imageryLayers.removeAll();
    const naturalEarthUrl = Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII');
    Cesium.TileMapServiceImageryProvider.fromUrl(naturalEarthUrl).then((provider) => {
      // Check if viewer is still valid before adding imagery
      if (viewer && !viewer.isDestroyed()) {
        viewer.imageryLayers.addImageryProvider(provider);
      }
    }).catch((error) => {
      console.error('Failed to load Natural Earth II imagery:', error);
    });

    // Configure the viewer for Terra mission timespan (2000-2025)
    const startTime = Cesium.JulianDate.fromDate(new Date('2023-01-01T00:00:00Z')); // Start from 2023 for better data availability
    const stopTime = Cesium.JulianDate.fromDate(new Date('2024-12-31T23:59:59Z'));
    
    viewer.clock.startTime = startTime.clone();
    viewer.clock.stopTime = stopTime.clone();
    viewer.clock.currentTime = startTime.clone();
    viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
    viewer.clock.multiplier = 86400; // 1 day per second

    // Set initial camera position - view of Earth from space
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(-75.0, 40.0, 15000000),
      orientation: {
        heading: 0.0,
        pitch: -Cesium.Math.PI_OVER_TWO,
        roll: 0.0,
      },
    });

    // Enable lighting and configure globe
    try {
      viewer.scene.globe.show = true;
    viewer.scene.globe.enableLighting = true;
      if (viewer.scene.skyAtmosphere) {
        viewer.scene.skyAtmosphere.show = true;
      }
      console.log('Cesium viewer initialized with Natural Earth II imagery');
    } catch (error) {
      console.error('Error configuring globe scene:', error);
    }

    viewerRef.current = viewer;
    onViewerReady(viewer);

    // Cleanup
    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [onViewerReady]);

  // Update active layers
  useEffect(() => {
    if (!viewerRef.current) return;

    const viewer = viewerRef.current;
    const layerRefs = layerRefsRef.current;

    // Helper function to create NASA GIBS provider with proper configuration
    // Based on NASA GIBS web examples: https://github.com/nasa-gibs/gibs-web-examples
    const createGibsProvider = (layerId: string, layerName: string, tileMatrixSet: string, maxLevel: number, year: number) => {
      // Format date for the specific year (use mid-year for best coverage)
      const dateStr = `${year}-07-15`; // July 15th for mid-year coverage
      
      // Use the proper WMTS URL format as shown in NASA examples
      const baseUrl = 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best';
      const url = `${baseUrl}/${layerId}/default/${dateStr}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png`;
      
      return new Cesium.WebMapTileServiceImageryProvider({
        url: url,
        layer: layerId,
        style: 'default',
        format: 'image/png',
        tileMatrixSetID: tileMatrixSet,
        maximumLevel: maxLevel,
        credit: new Cesium.Credit('NASA GIBS'),
      });
    };

    // Helper function to check if data is available for a specific year
    const isDataAvailable = (layerDef: any, year: number): boolean => {
      if (!layerDef.availableFrom) return true;
      
      const availableFromYear = new Date(layerDef.availableFrom).getFullYear();
      const currentYear = new Date().getFullYear();
      
      return year >= availableFromYear && year <= currentYear;
    };

    // Helper function to create yearly fallback data
    const createYearlyFallbackProvider = (layerName: string, year: number, color: string) => {
      // Use a simple colored overlay as fallback
      // Create a data URL for a simple colored square
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Simple colored pixel
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
      }
      
      const dataURL = canvas.toDataURL();
      
      return new Cesium.SingleTileImageryProvider({
        url: dataURL,
        rectangle: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
        credit: new Cesium.Credit(`Demo ${layerName} Data - ${year}`),
      });
    };

    // Helper function to create fallback demo provider
    const createDemoProvider = (layerName: string, color: string) => {
      // Create a simple colored overlay for demonstration
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Create a semi-transparent colored overlay
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, 512, 512);
        
        // Add some pattern for visual interest
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          const size = Math.random() * 10 + 5;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
      
      const dataURL = canvas.toDataURL();
      
      return new Cesium.SingleTileImageryProvider({
        url: dataURL,
        rectangle: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
        credit: new Cesium.Credit(`Demo ${layerName} Data`),
      });
    };

    // Get current year from the timeline
    const currentYear = currentDate.getFullYear();
    
    // Define available NASA GIBS data layers with proper configuration
    // Based on NASA GIBS web examples: https://github.com/nasa-gibs/gibs-web-examples
    const layerDefinitions: Record<string, any> = {
      fires: {
        name: 'MODIS Thermal Anomalies / Fire',
        layerId: 'MODIS_Terra_Thermal_Anomalies_All',
        tileMatrixSet: '250m',
        maxLevel: 8,
        color: 'rgba(255, 100, 0, 0.7)',
        // Available from 2000-12-18 to present
        availableFrom: '2000-12-18',
        createProvider: () => {
          console.log(`Loading Fire Detection data for year ${currentYear}`);
          try {
            // Try NASA GIBS first
            return createGibsProvider('MODIS_Terra_Thermal_Anomalies_All', 'Fire Detection', '250m', 8, currentYear);
          } catch (error) {
            console.warn(`NASA GIBS unavailable for fires ${currentYear}, using yearly fallback`);
            return createYearlyFallbackProvider('Fire Detection', currentYear, 'rgba(255, 100, 0, 0.7)');
          }
        },
      },
      co: {
        name: 'MOPITT Carbon Monoxide',
        layerId: 'MOPITT_CO_Total_Column_Day',
        tileMatrixSet: '2km',
        maxLevel: 5,
        color: 'rgba(255, 200, 0, 0.6)',
        // Available from 2000-03-03 to present
        availableFrom: '2000-03-03',
        createProvider: () => {
          console.log(`Loading Carbon Monoxide data for year ${currentYear}`);
          try {
            // Try NASA GIBS first
            return createGibsProvider('MOPITT_CO_Total_Column_Day', 'Carbon Monoxide', '2km', 5, currentYear);
          } catch (error) {
            console.warn(`NASA GIBS unavailable for CO ${currentYear}, using yearly fallback`);
            return createYearlyFallbackProvider('Carbon Monoxide', currentYear, 'rgba(255, 200, 0, 0.6)');
          }
        },
      },
      lights: {
        name: 'VIIRS Nighttime Lights',
        layerId: 'VIIRS_SNPP_DayNightBand_ENCC',
        tileMatrixSet: '500m',
        maxLevel: 8,
        color: 'rgba(255, 255, 200, 0.8)',
        // Available from 2016-11-30 to present (VIIRS data starts later)
        availableFrom: '2016-11-30',
        createProvider: () => {
          console.log(`Loading Nighttime Lights data for year ${currentYear}`);
          try {
            // Try NASA GIBS first
            return createGibsProvider('VIIRS_SNPP_DayNightBand_ENCC', 'Nighttime Lights', '500m', 8, currentYear);
          } catch (error) {
            console.warn(`NASA GIBS unavailable for lights ${currentYear}, using yearly fallback`);
            return createYearlyFallbackProvider('Nighttime Lights', currentYear, 'rgba(255, 255, 200, 0.8)');
          }
        },
      },
      aerosol: {
        name: 'MODIS Aerosol Optical Depth',
        layerId: 'MODIS_Terra_Aerosol_Optical_Depth',
        tileMatrixSet: '2km',
        maxLevel: 5,
        color: 'rgba(150, 150, 255, 0.5)',
        // Available from 2000-02-24 to present
        availableFrom: '2000-02-24',
        createProvider: () => {
          console.log(`Loading Aerosol Pollution data for year ${currentYear}`);
          try {
            // Try NASA GIBS first
            return createGibsProvider('MODIS_Terra_Aerosol_Optical_Depth', 'Aerosol Pollution', '2km', 5, currentYear);
          } catch (error) {
            console.warn(`NASA GIBS unavailable for aerosol ${currentYear}, using yearly fallback`);
            return createYearlyFallbackProvider('Aerosol Pollution', currentYear, 'rgba(150, 150, 255, 0.5)');
          }
        },
      },
    };

    // Helper function to get fallback colors for demo data
    const getFallbackColor = (layerKey: string): string => {
      const colors: Record<string, string> = {
        fires: 'rgba(255, 100, 0, 0.7)',
        co: 'rgba(255, 200, 0, 0.6)',
        lights: 'rgba(255, 255, 200, 0.8)',
        aerosol: 'rgba(150, 150, 255, 0.5)',
      };
      return colors[layerKey] || 'rgba(128, 128, 128, 0.5)';
    };

    // Add new layers and update existing ones for year changes
    activeLayers.forEach((layerKey) => {
      if (layerKey === 'base') return;

      const layerDef = layerDefinitions[layerKey];
      if (!layerDef) return;

      // Check if we need to update the layer (year change or new layer)
      const existingLayer = layerRefs.get(layerKey);
      const yearChanged = lastYearRef.current !== currentYear;
      const needsUpdate = !existingLayer || yearChanged;

      if (needsUpdate) {
        // Remove existing layer if it exists
        if (existingLayer) {
          viewer.imageryLayers.remove(existingLayer);
          layerRefs.delete(layerKey);
        }

        console.log(`Loading layer: ${layerDef.name} for year ${currentYear}`);
        
        const loadLayer = async () => {
          // Check if data is available for this year
          const dataAvailable = isDataAvailable(layerDef, currentYear);
          
          if (!dataAvailable) {
            console.log(`Data not available for ${layerDef.name} in ${currentYear}, using fallback`);
            // Use fallback data immediately
            try {
              const fallbackProvider = createYearlyFallbackProvider(
                layerDef.name, 
                currentYear, 
                layerDef.color
              );
              const imageryLayer = viewer.imageryLayers.addImageryProvider(fallbackProvider);
          imageryLayer.alpha = 0.7;
          layerRefs.set(layerKey, imageryLayer);
              console.log(`Successfully loaded fallback data for ${layerDef.name} - ${currentYear} (data not available)`);
            } catch (fallbackError) {
              console.error(`Failed to load fallback for ${layerKey}:`, fallbackError);
            }
            return;
          }
          
          // For NASA GIBS layers, we'll try the real data first, then fallback
          // Since WebMapTileServiceImageryProvider doesn't throw synchronous errors,
          // we'll implement a timeout-based fallback approach
          
          try {
            const provider = layerDef.createProvider();
            
            // Add the layer to the viewer
            const imageryLayer = viewer.imageryLayers.addImageryProvider(provider);
            imageryLayer.alpha = 0.7; // Semi-transparent for overlay
            layerRefs.set(layerKey, imageryLayer);
            console.log(`Successfully loaded: ${layerDef.name} for ${currentYear}`);
            
            // Set up a fallback timer - if no tiles load within 5 seconds, use fallback
            const fallbackTimer = setTimeout(() => {
              console.log(`NASA GIBS timeout for ${layerKey} - ${currentYear}, switching to fallback`);
              
              // Remove the NASA GIBS layer
              viewer.imageryLayers.remove(imageryLayer);
              layerRefs.delete(layerKey);
              
              // Add fallback layer
              try {
                const fallbackProvider = createYearlyFallbackProvider(
                  layerDef.name, 
                  currentYear, 
                  layerDef.color
                );
                const fallbackLayer = viewer.imageryLayers.addImageryProvider(fallbackProvider);
                fallbackLayer.alpha = 0.7;
                layerRefs.set(layerKey, fallbackLayer);
                console.log(`Successfully loaded fallback data for ${layerDef.name} - ${currentYear}`);
              } catch (fallbackError) {
                console.error(`Failed to load fallback for ${layerKey}:`, fallbackError);
              }
            }, 5000); // 5 second timeout for better reliability
            
            // Clear the timer if tiles start loading successfully
            const checkTilesLoaded = () => {
              // Check if any tiles have loaded by looking at the imagery layer's ready state
              if (imageryLayer.ready) {
                clearTimeout(fallbackTimer);
                console.log(`NASA GIBS tiles loaded successfully for ${layerKey} - ${currentYear}`);
              } else {
                // Check again in 500ms
                setTimeout(checkTilesLoaded, 500);
              }
            };
            
            // Start checking for successful tile loading
            setTimeout(checkTilesLoaded, 1000);
            
        } catch (error) {
            console.error(`Failed to create provider for ${layerKey} for ${currentYear}:`, error);
            
            // Try fallback data immediately
            try {
              console.log(`Attempting immediate fallback data for ${layerKey} - ${currentYear}`);
              const fallbackProvider = createYearlyFallbackProvider(
                layerDef.name, 
                currentYear, 
                layerDef.color
              );
              const imageryLayer = viewer.imageryLayers.addImageryProvider(fallbackProvider);
              imageryLayer.alpha = 0.7;
              layerRefs.set(layerKey, imageryLayer);
              console.log(`Successfully loaded fallback data for ${layerDef.name} - ${currentYear}`);
            } catch (fallbackError) {
              console.error(`Failed to load both NASA GIBS and fallback for ${layerKey}:`, fallbackError);
            }
          }
        };

        loadLayer();
      }
    });

    // Remove inactive layers
    layerRefs.forEach((layer: Cesium.ImageryLayer, layerKey: string) => {
      if (!activeLayers.has(layerKey)) {
        viewer.imageryLayers.remove(layer);
        layerRefs.delete(layerKey);
        console.log(`Removed layer: ${layerKey}`);
      }
    });

    // Update the last year reference
    lastYearRef.current = currentYear;
  }, [activeLayers, currentDate]);

  // Update current date
  useEffect(() => {
    if (!viewerRef.current) return;

    const julianDate = Cesium.JulianDate.fromDate(currentDate);
    viewerRef.current.clock.currentTime = julianDate;
  }, [currentDate]);

  return <div ref={cesiumContainer} style={{ width: '100%', height: '100%' }} />;
}

