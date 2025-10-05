'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import ChatBot from './components/ChatBot';
import Navbar from './components/Navbar';

// Dynamically import NASA GIBS Viewer to avoid SSR issues
const NASAGibsViewer = dynamic(() => import('./components/NASAGibsViewer'), {
  ssr: false,
});

export default function Home() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set(['base']));
  const [showMap, setShowMap] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Initialize with default layers
    setActiveLayers(new Set(['base']));
  }, []);

  const handleVideoEnded = () => {
    setShowMap(true);
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  const handleSkipVideo = () => {
    setShowMap(true);
  };

  // Show video first, then map after video ends
  if (!showMap) {
    return (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#000',
        position: 'relative'
      }}>
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          onLoadedData={handleVideoLoaded}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
           <source src="/rupert2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {!isVideoLoaded && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#4dabf7',
            fontSize: '18px',
            textAlign: 'center',
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '10px 20px',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)'
          }}>
            Loading Rupert's Adventure...
          </div>
        )}
        
        {/* Skip Button */}
        <button
          onClick={handleSkipVideo}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            background: 'rgba(77, 171, 247, 0.9)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 16px rgba(77, 171, 247, 0.3)',
            transition: 'all 0.3s ease',
            zIndex: 1000
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(77, 171, 247, 1)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(77, 171, 247, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(77, 171, 247, 0.9)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(77, 171, 247, 0.3)';
          }}
        >
          Skip
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Overlay Navbar for Earth page */}
      <Navbar />
      
      {/* NASA GIBS Viewer */}
      <NASAGibsViewer className="w-full h-full" />

      {/* Rupert AI Chatbot */}
      <ChatBot 
        activeLayers={activeLayers}
        currentDate={currentDate}
      />
    </div>
  );
}

