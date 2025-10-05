'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ChatBotProps {
  activeLayers: Set<string>;
  currentDate: Date;
  activeSetName?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatBot({ activeLayers, currentDate, activeSetName }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Rupert 🦔, your armadillo guide! I've been searching for a safe home for 25 years while watching Earth change through NASA's Terra satellite. Ask me what you're seeing on the globe, or how we can help protect our planet!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [useGemini, setUseGemini] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderBoldHTML = (text: string) => {
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const withBold = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    return { __html: withBold } as const;
  };

  const getContextAwareResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    const activeLayersList = Array.from(activeLayers).filter(l => l !== 'base');
    const year = currentDate.getFullYear();

    // Context about what's being displayed
    if (lowerMessage.includes('what') && (lowerMessage.includes('see') || lowerMessage.includes('show'))) {
      if (activeLayersList.length === 0) {
        return `Right now, you're viewing Earth's base map from ${year}. Try turning on some data layers from the control panel on the right to see environmental changes! I recommend starting with the Active Fires layer to see thermal hotspots.`;
      }
      
      let response = `You're viewing data from ${year}. Currently active layers:\n\n`;
      
      if (activeLayers.has('fires')) {
        response += `🔥 **Active Fires**: These bright spots show thermal anomalies detected by NASA's MODIS instrument. They represent wildfires, agricultural burns, and volcanic activity. Over 25 years, we've seen fire patterns change dramatically with climate shifts.\n\n`;
      }
      if (activeLayers.has('co')) {
        response += `💨 **Carbon Monoxide**: This shows CO concentrations from MOPITT. CO is a tracer for pollution and incomplete combustion. Higher concentrations appear in industrial regions and areas with active fires.\n\n`;
      }
      if (activeLayers.has('lights')) {
        response += `💡 **Light Pollution**: VIIRS nighttime imagery shows artificial lighting. This reveals urbanization patterns and how cities have grown over the decades. Bright areas indicate heavy development.\n\n`;
      }
      if (activeLayers.has('aerosol')) {
        response += `🌫️ **Aerosol Optical Depth**: This layer shows atmospheric particles from pollution, dust, and smoke. It's our proxy for overall air quality and environmental stress.\n\n`;
      }
      
      return response + "What would you like to explore next?";
    }

    // Questions about solutions
    if (lowerMessage.includes('fix') || lowerMessage.includes('help') || lowerMessage.includes('solution') || lowerMessage.includes('do')) {
      return `Great question! Here's how we can help:\n\n🌱 **For Fires**: Support sustainable forest management, create firebreaks, and address climate change. Report wildfires early!\n\n🏭 **For Pollution**: Transition to clean energy, use public transit, support emissions regulations, and promote green technology.\n\n💡 **For Light Pollution**: Use shielded outdoor lighting, support dark sky initiatives, turn off unnecessary lights, and use motion sensors.\n\n🌍 **Overall**: Support conservation efforts, reduce your carbon footprint, advocate for environmental policies, and spread awareness using data like what you're seeing here!\n\nEvery small action helps create the world where armadillos like me can find a safe home! 🦔`;
    }

    // About Rupert's story
    if (lowerMessage.includes('who') || lowerMessage.includes('you') || lowerMessage.includes('rupert') || lowerMessage.includes('story')) {
      return `I'm Rupert, an armadillo who's been traveling the world for 25 years looking for a safe place to call home. As I've journeyed across continents, I've witnessed incredible changes—some beautiful, but many worrying. 🦔\n\nUsing NASA's Terra satellite data, I can show you what I've seen: spreading fires, growing cities with their glowing lights, increasing air pollution, and changing landscapes.\n\nMy dream is to find a place where nature thrives and the air is clean. By exploring this data together, maybe we can work towards making more places like that! Will you help me?`;
    }

    // Timeline/date questions
    if (lowerMessage.includes('when') || lowerMessage.includes('year') || lowerMessage.includes('time')) {
      return `We're currently viewing data from ${currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}. The Terra satellite has been collecting this data since December 1999, giving us 25 years of Earth observations!\n\nUse the timeline at the bottom to travel through time and see how our planet has changed. Some dramatic events to look for: the 2003 European heatwave, the 2010 Russian wildfires, and the rapid urbanization in Asia.`;
    }

    // General questions about layers
    if (lowerMessage.includes('fire')) {
      return `The fire data comes from MODIS (Moderate Resolution Imaging Spectroradiometer) on the Terra satellite. It detects thermal anomalies—hot spots that indicate active fires.\n\n🔥 Wildfires have become more frequent and intense due to climate change. You can see seasonal patterns: fires in Australia during their summer (Dec-Feb), California in late summer/fall, and the Amazon during the dry season.\n\nFires aren't always bad—some ecosystems need them—but the increasing frequency is concerning for biodiversity and air quality.`;
    }

    if (lowerMessage.includes('co') || lowerMessage.includes('carbon') || lowerMessage.includes('pollution')) {
      return `Carbon Monoxide (CO) data comes from MOPITT instrument on Terra. CO is produced by incomplete combustion and is a key pollution indicator.\n\n💨 High CO levels are found near:\n- Industrial centers\n- Urban areas with heavy traffic\n- Regions with active fires\n- Agricultural burning areas\n\nCO doesn't stay local—it travels with wind patterns, which is why you might see plumes extending far from their sources. It's harmful to breathe and contributes to air quality problems.`;
    }

    if (lowerMessage.includes('light') || lowerMessage.includes('city') || lowerMessage.includes('urban')) {
      return `The nighttime lights data shows artificial illumination captured by VIIRS instruments. This isn't just pretty—it reveals profound changes!\n\n💡 Over 25 years, you can see:\n- Cities expanding outward\n- New developments in previously dark areas\n- Increasing light pollution affecting wildlife\n- Economic development patterns\n\nFor a small armadillo like me, all these lights can be disorienting and make it hard to find natural habitats. Many animals rely on darkness for navigation and survival.`;
    }

    // Default helpful response
    return `I'm here to help you understand the environmental changes shown in NASA's Terra satellite data! You can ask me about:\n\n🔍 What you're currently seeing on the globe\n🌍 How to interpret different data layers\n📊 Environmental trends over the 25 years\n💡 What can be done to address these issues\n🦔 My story and journey\n\nTry asking: "What am I seeing?" or "How can we fix these problems?" or explore the timeline to see changes over time!`;
  };

  const captureCesiumScreenshot = (): string | null => {
    try {
      const container = document.getElementById('cesiumContainer');
      if (!container) return null;
      const canvas = container.querySelector('canvas') as HTMLCanvasElement | null;
      if (!canvas) return null;
      return canvas.toDataURL('image/png');
    } catch {
      return null;
    }
  };

  const callGemini = async (userPrompt: string): Promise<string | null> => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) return null;

    const dataUrl = captureCesiumScreenshot();
    const base64Image = dataUrl ? dataUrl.split(',')[1] : undefined;

    const contextText = `You are Rupert, an assistant describing a 3D Cesium globe with NASA GIBS layers.\n` +
      `Current UTC date: ${currentDate.toISOString()}.\n` +
      `Active layer IDs: ${Array.from(activeLayers).join(', ') || 'none'}.\n` +
      `Active layer set: ${activeSetName || 'unknown'}.\n` +
      `Explain what is visible and answer the user. Be concise and specific to the imagery.`;

    const parts: any[] = [];
    if (base64Image) {
      parts.push({ inline_data: { mime_type: 'image/png', data: base64Image } });
    }
    parts.push({ text: contextText });
    parts.push({ text: userPrompt });

    const body: any = {
      contents: [
        {
          role: 'user',
          parts
        }
      ]
    };

    try {
      const resp = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify(body)
      });
      if (!resp.ok) {
        console.error('Gemini HTTP error', resp.status, await resp.text());
        return null;
      }
      const json = await resp.json();
      const parts = json?.candidates?.[0]?.content?.parts || [];
      const text = parts.map((p: any) => p?.text).filter(Boolean).join('\n').trim();
      return text || null;
    } catch (e) {
      console.error('Gemini call failed', e);
      return null;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Try Gemini first (with screenshot context), fall back to local rules
    try {
      let responseText: string | null = null;
      if (useGemini) {
        responseText = await callGemini(input);
      }
      if (!responseText) {
        responseText = getContextAwareResponse(input);
      }
      const assistantMessage: Message = { role: 'assistant', content: responseText };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button className="chatbot-toggle" onClick={() => setIsOpen(true)} aria-label="Open Rupert AI Chat">
        <Image 
          src="/rupertus-logo.png" 
          alt="Rupert" 
          width={48} 
          height={48}
          className="rounded-full"
        />
      </button>
    );
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <div className="chatbot-avatar">
            <Image 
              src="/rupertus-logo.png" 
              alt="Rupert" 
              width={40} 
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="chatbot-title-text">
            <h3>Rupert AI Assistant</h3>
            <p>Your Earth Data Guide</p>
          </div>
        </div>
        <div className="mr-2 text-xs text-gray-300">
          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="checkbox" checked={useGemini} onChange={(e) => setUseGemini(e.target.checked)} />
            Gemini
          </label>
        </div>
        <button 
          className="chatbot-minimize" 
          onClick={() => setIsOpen(false)}
          aria-label="Minimize chat"
        >
          ➖
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chatbot-message ${message.role}`}>
            <div className="message-avatar">
              {message.role === 'assistant' ? (
                <Image 
                  src="/rupertus-logo.png" 
                  alt="Rupert" 
                  width={32} 
                  height={32}
                  className="rounded-full"
                />
              ) : '👤'}
            </div>
            <div className="message-content">
              {message.content.split('\n').map((line, i) => (
                <p key={i} style={{ marginBottom: line ? '8px' : '0' }} dangerouslySetInnerHTML={renderBoldHTML(line)} />
              ))}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="chatbot-message assistant">
            <div className="message-avatar">
              <Image 
                src="/rupertus-logo.png" 
                alt="Rupert" 
                width={32} 
                height={32}
                className="rounded-full"
              />
            </div>
            <div className="message-content">
              <div className="loading-indicator">
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input-container">
        <input
          type="text"
          className="chatbot-input"
          placeholder="Ask Rupert anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="chatbot-send" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

