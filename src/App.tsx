import { useState, useEffect, useRef } from 'react';
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

const bootSequence = [
  { msg: "[ SYSTEM BOOT INITIATED ]", delay: 200 },
  { msg: "[ KERNEL_v6.4.2 LOADING... ]", delay: 300 },
  { msg: "[ MEMORY CHECK: 128TB OK ]", delay: 150 },
  { msg: "[ CONNECTING TO SECTOR RELAYS... ]", delay: 400 },
  { msg: "[ DETECTING FRACTURE INSTABILITY... ]", delay: 200 },
  { msg: "[ WARNING: RADIOLOGICAL INTERFERENCE DETECTED ]", delay: 150, type: 'warning' },
  { msg: "[ BYPASSING DIRECTORATE FIREWALLS... ]", delay: 500 },
  { msg: "[ DECRYPTING VANGUARD_DATA_STREAM... ]", delay: 400 },
  { msg: "[ HUB CONNECTED ]", delay: 200 },
];

function BootScreen({ onFinish }: { onFinish: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < bootSequence.length) {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, bootSequence[currentIndex].msg]);
        setProgress(((currentIndex + 1) / bootSequence.length) * 100);
        setCurrentIndex((prev) => prev + 1);
      }, bootSequence[currentIndex].delay);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => onFinish(), 500);
      return () => clearTimeout(finishTimer);
    }
  }, [currentIndex, onFinish]);

  return (
    <div className="boot-screen">
      <div className="background-overlay" />
      <div className="crt-vignette" />
      
      <div className="boot-content">
        <div className="boot-scanner">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="scanner-hex">
              {Math.random().toString(16).substr(2, 12).toUpperCase()}
            </div>
          ))}
        </div>

        <div className="boot-logo" style={{ marginBottom: '30px', opacity: 0.8 }}>
          <pre style={{ fontSize: '0.6rem', lineHeight: '1', color: 'var(--terminal-green)' }}>
{`
   __  __ ___ ___ ___ ___ _  _   _  _ _   _ ___ 
  |  \/  | __/ __| __| _ \ || | | || | | | | _ )
  | |\/| | _| (__| _||   / \_, | | __ | |_| | _ \\
  |_|  |_|___\___|___|_|_|   |_| |_||_|\___/|___/
                                                 
          [ SECURE TERMINAL ACCESS ]
`}
          </pre>
        </div>

        <div className="boot-logs">
          {logs.map((log, i) => (
            <div key={i} className={`log-line ${log.includes('WARNING') ? 'warning' : ''}`}>
              {log}
            </div>
          ))}
          <motion.span 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="cursor"
            style={{ display: 'inline-block', width: '10px', height: '15px', background: 'var(--terminal-green)' }}
          >_</motion.span>
        </div>
        
        <div className="boot-progress-wrap">
          <div className="progress-label">KERNEL_BOOT_SEQUENCE: {Math.round(progress)}%</div>
          <div className="boot-progress-bar">
            <motion.div 
              className="boot-progress-fill" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [booted, setBooted] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>(['RELAY LINK ESTABLISHED...', 'TYPE "HELP" FOR COMMANDS.']);
  const [marketData, setMarketData] = useState({
    alpha: 842.12,
    x: 1244.00,
    glass: 12.45
  });
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tickerTimer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(tickerTimer);
  }, []);

  useEffect(() => {
    const marketInterval = setInterval(() => {
      setMarketData(prev => ({
        alpha: prev.alpha + (Math.random() - 0.5) * 2,
        x: prev.x + (Math.random() - 0.5) * 5,
        glass: prev.glass + (Math.random() - 0.5) * 0.1
      }));
    }, 3000);
    return () => clearInterval(marketInterval);
  }, []);

  useEffect(() => {
    if (booted) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, booted]);

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
    return <BootScreen onFinish={() => setBooted(true)} />;
  }

  return (
    <div className="terminal-container">
      <div className="background-overlay" />
      <div className="crt-vignette" />
      
      <header className="terminal-header">
        <div className="logo-section">
          <Terminal className="header-icon" size={24} />
          <h1>KYBIAN_HUB // SECURE_RELAY</h1>
        </div>
        <div className="status-bars">
          <div className="bar">
            <span>VEIL STABILITY [L_5]:</span>
            <div className="meter"><div className="fill" style={{ width: '52%' }}></div></div>
          </div>
          <div className="bar warning">
            <span>ALPHA RESERVES [CRITICAL]:</span>
            <div className="meter"><div className="fill warning" style={{ width: '14%' }}></div></div>
          </div>
        </div>
      </header>

      <div className="news-ticker">
        <div className="ticker-label"><AlertCircle size={14} /> SIGNAL_INCOMING:</div>
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
            <h3><RefreshCw size={16} /> ISOTOPE MARKET [LIVE]</h3>
            <div className="market-grid">
              <div className="market-row">
                <span>KYBIAN-ALPHA:</span>
                <span className={marketData.alpha > 842.12 ? 'price-up' : 'price-down'}>
                  {marketData.alpha.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
                  {marketData.alpha > 842.12 ? ' ▲' : ' ▼'}
                </span>
              </div>
              <div className="market-row">
                <span>KYBIAN-X:</span>
                <span className={marketData.x > 1244.00 ? 'price-up' : 'price-down'}>
                  {marketData.x.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  {marketData.x > 1244.00 ? ' ▲' : ' ▼'}
                </span>
              </div>
              <div className="market-row">
                <span>DULL-GLASS:</span>
                <span className={marketData.glass > 12.45 ? 'price-up' : 'price-down'}>
                  {marketData.glass.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  {marketData.glass > 12.45 ? ' ▲' : ' ▼'}
                </span>
              </div>
            </div>
          </section>

          <section className="terminal-console">
            <h3>SYSTEM_CONSOLE</h3>
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
          <h3>GALACTIC_RELAY_GRID</h3>
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
        <div className="footer-left">SYS_REF: 0x8F4A...F21 // NODE: SECTOR_7</div>
        <div className="footer-right">KYBIAN.UNIVERSE // [ AUTH_LEVEL: GUEST ]</div>
      </footer>
    </div>
  );
}

export default App;
