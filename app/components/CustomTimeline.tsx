'use client';

import { useState, useEffect } from 'react';
import * as Cesium from 'cesium';

interface CustomTimelineProps {
  viewer: Cesium.Viewer | null;
  onDateChange?: (date: Date) => void;
}

export default function CustomTimeline({ viewer, onDateChange }: CustomTimelineProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState('1x');
  const [sliderValue, setSliderValue] = useState(0);

  const startDate = new Date(Date.UTC(2000, 0, 1)); // Jan 1, 2000
  const endDate = new Date(); // Today

  // Year jump buttons - all years from 1999 to 2025
  const yearButtons = [
    { label: 'Terra Launch', year: 1999 },
    ...Array.from({ length: 26 }, (_, i) => ({ 
      label: (2000 + i).toString(), 
      year: 2000 + i 
    }))
  ];

  // Update current date from viewer clock
  useEffect(() => {
    if (!viewer) return;

    let lastUpdateTime = 0;
    const updateInterval = 1000; // Update layers every 1 second during animation

    const updateDate = () => {
      const julianDate = viewer.clock.currentTime;
      const jsDate = Cesium.JulianDate.toDate(julianDate);
      setCurrentDate(jsDate);
      
      // Update slider value
      const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      const currentDays = (jsDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      setSliderValue((currentDays / totalDays) * 100);

      // Trigger layer update during animation (throttled to every 1 second)
      const now = Date.now();
      if (viewer.clock.shouldAnimate && onDateChange && (now - lastUpdateTime) >= updateInterval) {
        onDateChange(jsDate);
        lastUpdateTime = now;
      }
    };

    // Initial update
    updateDate();

    // Listen for clock tick
    const removeListener = viewer.clock.onTick.addEventListener(updateDate);

    return () => {
      removeListener();
    };
  }, [viewer, onDateChange]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!viewer) return;

    const value = parseFloat(e.target.value);
    setSliderValue(value);

    // Calculate date from slider value
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const targetDays = (value / 100) * totalDays;
    const targetDate = new Date(startDate.getTime() + targetDays * 24 * 60 * 60 * 1000);

    // Update viewer clock
    viewer.clock.currentTime = Cesium.JulianDate.fromDate(targetDate);
    
    if (onDateChange) {
      onDateChange(targetDate);
    }
  };

  const handleYearJump = (year: number) => {
    if (!viewer) return;

    const targetDate = year === endDate.getFullYear() 
      ? endDate 
      : new Date(Date.UTC(year, 11, 31)); // Dec 31 of that year

    viewer.clock.currentTime = Cesium.JulianDate.fromDate(targetDate);
    
    if (onDateChange) {
      onDateChange(targetDate);
    }
  };

  const handlePlayPause = () => {
    if (!viewer) return;

    if (isPlaying) {
      viewer.clock.shouldAnimate = false;
      viewer.clock.multiplier = 0;
      setIsPlaying(false);
    } else {
      // Set clock to animate
      viewer.clock.shouldAnimate = true;
      viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
      
      // Set speed - use days per real-time second for smooth animation
      const speedMultipliers: { [key: string]: number } = {
        '1x': 86400, // 1 day per second
        '2x': 86400 * 2, // 2 days per second  
        '4x': 86400 * 4  // 4 days per second
      };
      viewer.clock.multiplier = speedMultipliers[speed] || 86400;
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    if (!viewer) return;

    const today = new Date();
    viewer.clock.currentTime = Cesium.JulianDate.fromDate(today);
    viewer.clock.multiplier = 0;
    setIsPlaying(false);
    
    if (onDateChange) {
      onDateChange(today);
    }
  };

  const handleSpeedChange = (newSpeed: string) => {
    setSpeed(newSpeed);
    
    if (viewer && isPlaying) {
      const speedMultipliers: { [key: string]: number } = {
        '1x': 86400,
        '2x': 86400 * 2,
        '4x': 86400 * 4
      };
      viewer.clock.multiplier = speedMultipliers[newSpeed] || 86400;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="custom-timeline-container">
      {/* Timeline Header with Controls - Centered */}
      <div className="custom-timeline-header">
        <div className="flex items-center justify-center gap-3 w-full">
          <span className="text-blue-400 text-lg">📅</span>
          <span className="font-semibold">Terra Mission Timeline (2000-2025)</span>
          
          <button
            onClick={handleReset}
            className="timeline-button-compact"
            title="Reset to today"
          >
            🔄 Reset
          </button>
          
          <button
            onClick={handlePlayPause}
            className="timeline-button-compact timeline-button-primary"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          <select
            value={speed}
            onChange={(e) => handleSpeedChange(e.target.value)}
            className="timeline-speed-select-compact"
          >
            <option value="1x">1x</option>
            <option value="2x">2x</option>
            <option value="4x">4x</option>
          </select>
          
          <span className="text-base font-bold ml-4">{formatDate(currentDate)}</span>
        </div>
      </div>

      {/* Timeline Slider */}
      <div className="custom-timeline-slider-container">
        <input
          type="range"
          min="0"
          max="100"
          step="0.01"
          value={sliderValue}
          onChange={handleSliderChange}
          className="custom-timeline-slider"
        />
      </div>

      {/* Year Jump Buttons */}
      <div className="custom-timeline-year-buttons">
        {yearButtons.map((btn) => (
          <button
            key={btn.year}
            onClick={() => handleYearJump(btn.year)}
            className="timeline-year-button"
            title={`Jump to ${btn.label}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
