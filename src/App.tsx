import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Zap, Skull, Radio, Globe, Database, Cpu, Eye, Activity } from 'lucide-react';
import './App.css';

const newsItems = [
  "WARNING: VEIL INSTABILITY INCREASING IN SECTOR 7",
  "BLACK-OUT ALERT: KYBIAN-ALPHA RESERVES AT 14%",
  "DIRECTORATE DECLARES MARTIAL LAW ON CORE STATIONS",
  "THE BLACK SIGNAL: ARCHIVES DECLASSIFIED BY UNKNOWN SOURCE",
  "SHIMMER-SKIN OUTBREAK REPORTED IN THE SHARD-YARD",
];

const factions = [
  { id: 'mandate', name: 'SOVEREIGN MANDATE', icon: Shield, url: 'https://mandate.kybian.com' },
  { id: 'directorate', name: 'THE DIRECTORATE', icon: Zap, url: 'https://directorate.kybian.com' },
  { id: 'axium', name: 'AXIUM COALITION', icon: Radio, url: 'https://axium.kybian.com' },
  { id: 'echo', name: 'KYBIAN ECHO', icon: Eye, url: 'https://echo.kybian.com' },
  { id: 'azc', name: 'ASTRA ZEMPARI CORP', icon: Globe, url: 'https://azc.kybian.com' },
  { id: 'siradinari', name: 'SIRA DINARI', icon: Database, url: 'https://siradinari.kybian.com' },
  { id: 'sidian', name: 'SIDIAN CONSORTIUM', icon: Cpu, url: 'https://sidian.kybian.com' },
  { id: 'redledger', name: 'THE RED LEDGER', icon: Activity, url: 'https://redledger.kybian.com' },
  { id: 'obsidiandusk', name: 'OBSIDIAN DUSK', icon: Terminal, url: 'https://obsidiandusk.kybian.com' },
  { id: 'shroud', name: 'SHROUD ASCENDANT', icon: Skull, url: 'https://shroud.kybian.com' },
];

function App() {
  const [booted, setBooted] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const tickerTimer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(tickerTimer);
  }, []);

  if (!booted) {
    return (
      <div className="boot-screen">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="boot-text"
        >
          [ SYSTEM BOOT INITIATED ]<br/>
          [ LOADING SECTOR RELAYS... ]<br/>
          [ DECRYPTING FRACTURE DATA... ]<br/>
          [ HUB CONNECTED ]
        </motion.div>
      </div>
    );
  }

  return (
    <div className="terminal-container">
      <div className="background-overlay" style={{ backgroundImage: `url('/images/hub-bg.png')` }} />
      
      <header className="terminal-header">
        <div className="logo-section">
          <img src="/images/hub-logo.png" alt="Relay Logo" className="header-logo" />
          <h1>KYBIAN TERMINAL v1.0.4</h1>
        </div>
        <div className="status-bars">
          <div className="bar">VEIL STABILITY: [|||||-----] 52%</div>
          <div className="bar">ALPHA RESERVES: CRITICAL</div>
        </div>
      </header>

      <div className="news-ticker">
        <div className="ticker-label">NEWS:</div>
        <AnimatePresence mode="wait">
          <motion.div 
            key={tickerIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="ticker-item"
          >
            {newsItems[tickerIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <main className="terminal-main">
        <div className="market-panel">
          <h3>ISOTOPE MARKET</h3>
          <div className="market-grid">
            <div className="market-row">
              <span>KYBIAN-ALPHA:</span>
              <span className="price-up">842.12 ▲</span>
            </div>
            <div className="market-row">
              <span>KYBIAN-X:</span>
              <span className="price-down">1,244.00 ▼</span>
            </div>
            <div className="market-row">
              <span>DULL-GLASS:</span>
              <span>12.45 -</span>
            </div>
          </div>
          <div className="fracture-stability">
            <div className="stability-meter">
               <div className="stability-fill" style={{ width: '52%' }}></div>
            </div>
          </div>
        </div>

        <div className="faction-directory">
          <h3>GALACTIC RELAYS</h3>
          <div className="relay-grid">
            {factions.map((faction) => (
              <a key={faction.id} href={faction.url} className="relay-card">
                <faction.icon size={20} />
                <span>{faction.name}</span>
              </a>
            ))}
          </div>
        </div>
      </main>

      <footer className="terminal-footer">
        <div className="footer-left">SYS_REF: 0x8F4A...F21</div>
        <div className="footer-right">CONNECTED TO KYBIAN.COM RELAY</div>
      </footer>
    </div>
  );
}

export default App;
