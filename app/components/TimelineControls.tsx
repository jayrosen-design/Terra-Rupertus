'use client';

import { useState, useEffect } from 'react';

interface TimelineControlsProps {
  viewer: any;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function TimelineControls({
  viewer,
  currentDate,
  setCurrentDate,
  isPlaying,
  setIsPlaying,
}: TimelineControlsProps) {
  const startDate = new Date('2000-01-01');
  const endDate = new Date('2025-01-01');
  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const [sliderValue, setSliderValue] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Key milestones in the 25-year Terra mission
  const MILESTONES = [
    { date: new Date('2000-01-01'), label: 'Terra Launch' },
    { date: new Date('2002-01-01'), label: '2002' },
    { date: new Date('2005-01-01'), label: '2005' },
    { date: new Date('2008-01-01'), label: '2008' },
    { date: new Date('2011-01-01'), label: '2011' },
    { date: new Date('2014-01-01'), label: '2014' },
    { date: new Date('2017-01-01'), label: '2017' },
    { date: new Date('2020-01-01'), label: '2020' },
    { date: new Date('2023-01-01'), label: '2023' },
    { date: new Date('2025-01-01'), label: 'Present' },
  ];

  useEffect(() => {
    const days = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    setSliderValue(days);
  }, [currentDate, startDate]);

  useEffect(() => {
    if (!isPlaying || !viewer) return;

    const interval = setInterval(() => {
      const newValue = sliderValue + playbackSpeed;
      if (newValue >= totalDays) {
        setIsPlaying(false);
        setSliderValue(totalDays);
        return;
      }
      setSliderValue(newValue);
      const newDate = new Date(startDate.getTime() + newValue * 24 * 60 * 60 * 1000);
      setCurrentDate(newDate);
    }, 100); // Update every 100ms

    return () => clearInterval(interval);
  }, [isPlaying, sliderValue, playbackSpeed, totalDays, viewer, startDate, setCurrentDate, setIsPlaying]);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    const newDate = new Date(startDate.getTime() + value * 24 * 60 * 60 * 1000);
    setCurrentDate(newDate);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setSliderValue(0);
    setCurrentDate(startDate);
  };

  const jumpToMilestone = (milestone: Date) => {
    const days = Math.floor((milestone.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    setSliderValue(days);
    setCurrentDate(milestone);
    setIsPlaying(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="timeline-controls">
      <div className="timeline-header">
        <h3>📅 Terra Mission Timeline (2000-2025)</h3>
        <div className="timeline-date">{formatDate(currentDate)}</div>
      </div>

      <div className="timeline-slider-container">
        <input
          type="range"
          min="0"
          max={totalDays}
          value={sliderValue}
          onChange={(e) => handleSliderChange(parseInt(e.target.value))}
          className="timeline-slider"
        />
      </div>

      <div className="timeline-controls-buttons">
        <button className="timeline-button" onClick={handleReset}>
          ⏮️ Reset
        </button>
        <button 
          className={`timeline-button ${isPlaying ? 'active' : ''}`}
          onClick={handlePlayPause}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>

        <div className="speed-control">
          <span>Speed:</span>
          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid #4dabf7',
              borderRadius: '4px',
              color: '#4dabf7',
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            <option value={1}>1x</option>
            <option value={5}>5x</option>
            <option value={10}>10x</option>
            <option value={30}>30x</option>
            <option value={100}>100x</option>
          </select>
        </div>
      </div>

      <div style={{ 
        marginTop: '15px', 
        paddingTop: '15px', 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {MILESTONES.map((milestone, index) => (
          <button
            key={index}
            onClick={() => jumpToMilestone(milestone.date)}
            style={{
              background: 'rgba(77, 171, 247, 0.1)',
              border: '1px solid rgba(77, 171, 247, 0.3)',
              color: '#4dabf7',
              padding: '5px 10px',
              borderRadius: '4px',
              fontSize: '11px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(77, 171, 247, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(77, 171, 247, 0.1)';
            }}
          >
            {milestone.label}
          </button>
        ))}
      </div>
    </div>
  );
}

