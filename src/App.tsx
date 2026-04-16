import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Zap, Skull, Radio, Globe, Database, Cpu, Eye, Activity, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';
import './App.css';

const newsItems = [
  "WARNING: VEIL INSTABILITY INCREASING IN SECTOR 7",
  "BLACK-OUT ALERT: KYBIAN-ALPHA RESERVES AT 14%",
  "DIRECTORATE DECLARES MARTIAL LAW ON CORE STATIONS",
  "THE BLACK SIGNAL: ARCHIVES DECLASSIFIED BY UNKNOWN SOURCE",
  "SHIMMER-SKIN OUTBREAK REPORTED IN THE SHARD-YARD",
];

const factions = [
  { id: 'mandate', name: 'SOVEREIGN MANDATE', icon: Shield, url: 'https://mandate.kybian.com', description: 'The old empire, fighting to maintain order.' },
  { id: 'directorate', name: 'THE DIRECTORATE', icon: Zap, url: 'https://directorate.kybian.com', description: 'The iron fist of the Mandate.' },
  { id: 'axium', name: 'AXIUM COALITION', icon: Radio, url: 'https://axium.kybian.com', description: 'Freedom-loving scavengers of the Outer Rim.' },
  { id: 'echo', name: 'KYBIAN ECHO', icon: Eye, url: 'https://echo.kybian.com', description: 'Covert scientists guarding the galaxy.' },
  { id: 'azc', name: 'ASTRA ZEMPARI CORP', icon: Globe, url: 'https://azc.kybian.com', description: 'The corporate giants of Kybian refining.' },
  { id: 'siradinari', name: 'SIRA DINARI', icon: Database, url: 'https://siradinari.kybian.com', description: 'Ancient scholars and warriors of the Deep.' },
  { id: 'sidian', name: 'SIDIAN CONSORTIUM', icon: Cpu, url: 'https://sidian.kybian.com', description: 'Industrial lords of the Shard-Yard.' },
  { id: 'redledger', name: 'THE RED LEDGER', icon: Activity, url: 'https://redledger.kybian.com', description: 'Brokers of information and debt.' },
  { id: 'obsidiandusk', name: 'OBSIDIAN DUSK', icon: Terminal, url: 'https://obsidiandusk.kybian.com', description: 'Ghosts of the radioactive clouds.' },
  { id: 'shroud', name: 'SHROUD ASCENDANT', icon: Skull, url: 'https://shroud.kybian.com', description: 'A cult seeking transcendence through the Veil.' },
];

function App() {
  const [booted, setBooted] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>(['RELAY LINK ESTABLISHED...', 'TYPE "HELP" FOR COMMANDS.']);
  const terminalEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const cmd = command.toLowerCase().trim();
    let response = `UNKNOWN COMMAND: ${cmd}`;

    if (cmd === 'help') {
      response = 'AVAILABLE COMMANDS: HELP, CLEAR, STATUS, WHOIS [FACTION], RELAY [FACTION], SCAN';
    } else if (cmd === 'clear') {
      setHistory([]);
      setCommand('');
      return;
    } else if (cmd === 'status') {
      response = `VEIL STABILITY: 52% | ALPHA RESERVES: 14.2% | CONNECTED RELAYS: 11`;
    } else if (cmd.startsWith('whois ')) {
      const target = cmd.split(' ')[1];
      const faction = factions.find(f => f.id === target || f.name.toLowerCase().includes(target));
      response = faction ? `${faction.name}: ${faction.description}` : `FACTION NOT FOUND: ${target}`;
    } else if (cmd === 'scan') {
      response = 'SCANNING... DETECTING VEIL-STORM IN SECTOR 4. RADIOLOGICAL SPIKE CONFIRMED.';
    } else if (cmd.startsWith('relay ')) {
      const target = cmd.split(' ')[1];
      const faction = factions.find(f => f.id === target || f.name.toLowerCase().includes(target));
      if (faction) {
        window.location.href = faction.url;
        response = `REDIRECTING TO ${faction.name} RELAY...`;
      } else {
        response = `RELAY TARGET NOT FOUND: ${target}`;
      }
    }

    setHistory(prev => [...prev, `> ${command}`, response]);
    setCommand('');
  };

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
      <div className="background-overlay" />
      
      <header className="terminal-header">
        <div className="logo-section">
          <Terminal className="header-icon" size={24} />
          <h1>KYBIAN TERMINAL v1.0.4</h1>
        </div>
        <div className="status-bars">
          <div className="bar">
            <span>VEIL STABILITY:</span>
            <div className="meter"><div className="fill" style={{ width: '52%' }}></div></div>
          </div>
          <div className="bar warning">
            <span>ALPHA RESERVES:</span>
            <div className="meter"><div className="fill warning" style={{ width: '14%' }}></div></div>
          </div>
        </div>
      </header>

      <div className="news-ticker">
        <div className="ticker-label"><AlertCircle size={14} /> NEWS:</div>
        <AnimatePresence mode="wait">
          <motion.div 
            key={tickerIndex}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="ticker-item"
          >
            {newsItems[tickerIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <main className="terminal-main">
        <div className="side-panel">
          <section className="market-panel">
            <h3><RefreshCw size={16} /> ISOTOPE MARKET</h3>
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
          </section>

          <section className="terminal-console">
            <h3>SYSTEM CONSOLE</h3>
            <div className="console-history">
              {history.map((line, i) => (
                <div key={i} className="console-line">{line}</div>
              ))}
              <div ref={terminalEndRef} />
            </div>
            <form onSubmit={handleCommand} className="console-input">
              <ChevronRight size={16} />
              <input 
                autoFocus
                type="text" 
                value={command} 
                onChange={(e) => setCommand(e.target.value)}
                placeholder="ENTER COMMAND..."
              />
            </form>
          </section>
        </div>

        <div className="faction-directory">
          <h3>GALACTIC RELAYS</h3>
          <div className="relay-grid">
            {factions.map((faction) => (
              <a key={faction.id} href={faction.url} className="relay-card">
                <faction.icon size={24} />
                <div className="relay-info">
                  <span className="relay-name">{faction.name}</span>
                  <span className="relay-status">STABLE</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      <footer className="terminal-footer">
        <div className="footer-left">SYS_REF: 0x8F4A...F21</div>
        <div className="footer-right">CONNECTED TO KYBIAN.COM RELAY // [ ACCESS_LEVEL: GUEST ]</div>
      </footer>
    </div>
  );
}

export default App;

