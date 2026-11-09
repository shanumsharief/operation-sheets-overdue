import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Backpack,
  Check,
  ChevronRight,
  CircleHelp,
  Cloud,
  Gift,
  House,
  Lock,
  Map,
  Music,
  Play,
  RotateCcw,
  Sparkles,
  Star,
  Trophy,
} from 'lucide-react';

type Screen = 'opening' | 'profile' | 'hub' | 'levelOne' | 'levelTwo' | 'levelThree' | 'reward';
type Progress = { levelOne: boolean; levelTwo: boolean; levelThree: boolean; rewardClaimed: boolean };

type MissionCardProps = {
  level: string;
  title: string;
  description: string;
  unlocked: boolean;
  complete: boolean;
  icon: React.ReactNode;
  onClick: () => void;
};

const initialProgress: Progress = { levelOne: false, levelTwo: false, levelThree: false, rewardClaimed: false };
const backgroundImage = '/assets/images/_-6.jpg';

function PixelButton({ children, onClick, variant = 'primary', disabled = false }: { children: React.ReactNode; onClick: () => void; variant?: 'primary' | 'soft' | 'ghost'; disabled?: boolean }) {
  return (
    <button className={`pixel-button ${variant}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function SheetStatus() {
  return <div className="sheet-status"><span className="status-dot" /> SHEET STATUS: <strong>OVERDUE</strong></div>;
}

function GameFrame({ children, screen, progress, onHome, inventory = [] }: { children: React.ReactNode; screen: Screen; progress: Progress; onHome: () => void; inventory?: string[] }) {
  const completed = [progress.levelOne, progress.levelTwo, progress.levelThree].filter(Boolean).length;
  return (
    <main className="game-shell">
      <div className="topbar">
        <button className="brand-mark" onClick={onHome} aria-label="Return to mission hub"><span>OS</span><b>OPERATION<br /><em>SHEETS OVERDUE</em></b></button>
        <div className="topbar-right"><div className="progress-count"><Trophy size={14} /> {completed}/3 MISSIONS</div><SheetStatus /></div>
      </div>
      {screen !== 'opening' && screen !== 'profile' && <div className="mission-strip"><span className="level-chip">{screen === 'hub' ? 'MISSION MAP' : screen === 'reward' ? 'OPERATION COMPLETE' : screen === 'levelOne' ? 'LEVEL 01' : screen === 'levelTwo' ? 'LEVEL 02' : 'LEVEL 03'}</span><span>{screen === 'hub' ? 'Choose your next assignment' : screen === 'reward' ? 'Birthday reward unlocked' : screen === 'levelOne' ? 'The Missing Sheet' : screen === 'levelTwo' ? 'Backstage Chaos' : 'The Final Model'}</span><div className="inventory"><Backpack size={14} /> {inventory.length ? inventory.join(' · ') : 'INVENTORY EMPTY'}</div></div>}
      {children}
    </main>
  );
}

function PixelShahla({ celebrating = false, confused = false }: { celebrating?: boolean; confused?: boolean }) {
  return <div className={`shahla ${celebrating ? 'celebrating' : ''} ${confused ? 'confused' : ''}`}><div className="sparkle s1">✦</div><div className="sparkle s2">✦</div><div className="hair" /><div className="face"><span className="eye left" /><span className="eye right" /><span className="mouth" /></div><div className="outfit"><span className="collar" /><span className="bag" /><span className="sheet-paper">S</span></div><div className="legs"><span /><span /></div></div>;
}

function Opening({ onStart }: { onStart: () => void }) {
  return <div className="opening-screen" style={{ backgroundImage: `linear-gradient(180deg, rgba(23, 29, 48, .08), rgba(31, 25, 42, .64)), url("${backgroundImage}")` }}><div className="opening-cloud cloud-one"><Cloud /></div><div className="opening-cloud cloud-two"><Cloud /></div><div className="opening-content"><div className="eyebrow"><span /> A PERSONAL BIRTHDAY QUEST <span /></div><h1>OPERATION:<br /><strong>SHEETS</strong> OVERDUE</h1><p className="tagline">One girl. Three missions. One very overdue sheet.</p><div className="title-character"><PixelShahla /><div className="alert-card"><span className="alert-label">SYSTEM ALERT</span><b>SHAHLA HAS AN<br />OVERDUE SHEET.</b><small>LOCATION: UNKNOWN<br />MISSION STATUS: UNASSIGNED</small></div></div><PixelButton onClick={onStart}><Play size={16} fill="currentColor" /> START OPERATION</PixelButton><p className="opening-note"><Sparkles size={13} /> A tiny adventure made especially for Shahla</p></div></div>;
}

function Profile({ onAccept }: { onAccept: () => void }) {
  return <div className="profile-screen"><div className="profile-orbit orbit-one" /><div className="profile-orbit orbit-two" /><div className="profile-heading"><span className="eyebrow">PLAYER PROFILE // 001</span><h2>MEET <strong>SHAHLA</strong></h2><p>Every great operation begins with the right person.</p></div><div className="profile-card"><div className="profile-art"><div className="profile-grid" /><PixelShahla confused /><div className="profile-stamp">PLAYER<br />VERIFIED</div></div><div className="profile-copy"><div className="profile-line"><span>PLAYER</span><strong>SHAHLA</strong></div><div className="profile-line"><span>CLASS</span><strong>PROFESSIONAL SHEET COMPLETER</strong></div><div className="profile-line"><span>SPECIAL ABILITY</span><strong>CAN COMPLETE SHEETS ANYWHERE</strong></div><div className="profile-line"><span>WEAKNESS</span><strong>UNFINISHED ASSIGNMENTS</strong></div><div className="profile-line"><span>CURRENT STATUS</span><strong className="pink-text">SLIGHTLY OVERDUE</strong></div><div className="profile-dialogue">“She has one simple responsibility: finish her sheet.<br />Unfortunately, the sheet has followed her everywhere.”</div><PixelButton onClick={onAccept}>ACCEPT MISSION <ChevronRight size={16} /></PixelButton></div></div></div>;
}

function MissionCard({ level, title, description, unlocked, complete, icon, onClick }: MissionCardProps) {
  return <button className={`mission-card ${unlocked ? 'unlocked' : 'locked'} ${complete ? 'complete' : ''}`} onClick={onClick} disabled={!unlocked}><div className="mission-card-top"><span className="mission-number">{level}</span><span className="mission-icon">{complete ? <Check size={21} /> : unlocked ? icon : <Lock size={18} />}</span></div><h3>{title}</h3><p>{unlocked ? description : 'Complete the previous mission to unlock.'}</p><div className="mission-card-footer"><span>{complete ? 'MISSION COMPLETE' : unlocked ? 'BEGIN MISSION' : 'LOCKED'}</span>{complete ? <Check size={14} /> : unlocked ? <ArrowRight size={14} /> : <Lock size={13} />}</div></button>;
}

function Hub({ progress, onLevel }: { progress: Progress; onLevel: (level: 1 | 2 | 3) => void }) {
  return <div className="hub-screen"><div className="hub-scene"><div className="sun" /><div className="hub-cloud c1" /><div className="hub-cloud c2" /><div className="distant-hills" /><div className="hub-building building-left"><div className="roof" /><div className="window-row"><i /><i /><i /></div><div className="door" /></div><div className="hub-building building-right"><div className="roof" /><div className="balcony" /><div className="window-row"><i /><i /></div></div><div className="fountain"><div className="water" /><div className="fountain-base" /></div><div className="path" /><div className="tree tree-left" /><div className="tree tree-right" /><div className="hub-player"><PixelShahla /></div><div className="hub-sign"><Map size={14} /> MISSION BOARD</div></div><div className="hub-panel"><div><span className="eyebrow">THE OPERATIONS HQ</span><h2>Choose your <strong>mission</strong></h2><p>The organisation is watching. The sheet is waiting.</p></div><div className="mission-grid"><MissionCard level="LEVEL 01" title="THE MISSING SHEET" description="Find three pieces hidden around the quiet town." unlocked onClick={() => onLevel(1)} complete={progress.levelOne} icon={<House size={20} />} /><MissionCard level="LEVEL 02" title="BACKSTAGE CHAOS" description="Recover the sheet before the performance begins." unlocked={progress.levelOne} onClick={() => onLevel(2)} complete={progress.levelTwo} icon={<Music size={20} />} /><MissionCard level="LEVEL 03" title="THE FINAL MODEL" description="Assemble the model and finish the operation." unlocked={progress.levelTwo} onClick={() => onLevel(3)} complete={progress.levelThree} icon={<Sparkles size={20} />} /></div></div></div>;
}

function MissionIntro({ title, text, onContinue }: { title: string; text: string; onContinue: () => void }) {
  return <div className="mission-intro"><div className="intro-panel"><span className="eyebrow">INCOMING TRANSMISSION</span><h2>{title}</h2><p>{text}</p><PixelButton onClick={onContinue}>BEGIN OBJECTIVE <ChevronRight size={16} /></PixelButton></div></div>;
}

function LevelOne({ onComplete }: { onComplete: () => void }) {
  const [found, setFound] = useState<string[]>([]); const [started, setStarted] = useState(false); const items = ['GARDEN FRAGMENT', 'LIBRARY FRAGMENT', 'STAIRCASE FRAGMENT'];
  if (!started) return <MissionIntro title="THE MISSING SHEET" text="Your sheet has gone missing. Find the three fragments before the deadline catches up." onContinue={() => setStarted(true)} />;
  return <div className="level-screen level-one"><div className="level-art town-art"><div className="level-sky" /><div className="level-moon" /><div className="cozy-house"><div className="house-roof" /><div className="house-wall" /><div className="house-window" /><div className="house-door" /></div><div className="library"><div className="library-roof" /><div className="library-window" /><div className="library-door" /></div><div className="stairs"><i /><i /><i /><i /><i /></div><div className="bench" /><div className="flower-patch" /><div className="level-shahla"><PixelShahla confused={found.length < 3} /></div>{items.map((item, index) => <button key={item} className={`search-object object-${index + 1} ${found.includes(item) ? 'collected' : ''}`} onClick={() => setFound((current) => current.includes(item) ? current : [...current, item])} disabled={found.includes(item)}><span>{found.includes(item) ? <Check size={15} /> : 'S'}</span><small>{found.includes(item) ? 'FOUND' : item.split(' ')[0]}</small></button>)}</div><div className="objective-panel"><div className="objective-title"><span className="level-chip">OBJECTIVE</span><strong>RECOVER THE SHEET</strong><span className="objective-count">{found.length}/3</span></div><div className="fragment-list">{items.map((item) => <span className={found.includes(item) ? 'found' : ''} key={item}>{found.includes(item) && <Check size={13} />}{item}</span>)}</div>{found.length === 3 ? <div className="success-box"><Sparkles size={17} /><div><strong>ALL PIECES RECOVERED!</strong><small>The sheet has been located. Obviously.</small></div><PixelButton onClick={onComplete}>ASSEMBLE SHEET <ArrowRight size={15} /></PixelButton></div> : <p className="hint"><CircleHelp size={14} /> Look for the glowing paper fragments around town.</p>}</div></div>;
}

function LevelTwo({ onComplete }: { onComplete: () => void }) {
  const [found, setFound] = useState<string[]>([]); const [started, setStarted] = useState(false); const [song, setSong] = useState<string | null>(null); const items = ['CONCERT PASS', 'PLAYLIST CARD', 'OVERDUE SHEET'];
  if (!started) return <MissionIntro title="BABYMONSTER: BACKSTAGE CHAOS" text="You made it backstage. Recover three items, then choose the right music card to unlock the final room." onContinue={() => setStarted(true)} />;
  const complete = found.length === 3 && song === 'SHEESH';
  return <div className="level-screen level-two"><div className="concert-art"><div className="concert-header"><span>BACKSTAGE // 20:45</span><strong>BABY<br /><em>MONSTER</em></strong><span>ACCESS: SHAHL∆</span></div><div className="stage-lights"><i /><i /><i /><i /><i /></div><div className="led-screen"><span>MAKE<br />SOME<br />NOISE</span></div><div className="speaker speaker-left" /><div className="speaker speaker-right" /><div className="stage-floor" /><div className="locker-row"><div /><div /><div /><div /></div><div className="backstage-shahla"><PixelShahla /></div>{items.map((item, index) => <button key={item} className={`search-object concert-object concert-${index + 1} ${found.includes(item) ? 'collected' : ''}`} onClick={() => setFound((current) => current.includes(item) ? current : [...current, item])} disabled={found.includes(item)}><span>{found.includes(item) ? <Check size={15} /> : index === 0 ? 'P' : index === 1 ? '♪' : 'S'}</span><small>{found.includes(item) ? 'FOUND' : item.split(' ')[0]}</small></button>)}</div><div className="objective-panel concert-panel"><div className="objective-title"><span className="level-chip burgundy">OBJECTIVE</span><strong>FIND THE BACKSTAGE ITEMS</strong><span className="objective-count">{found.length}/3</span></div><div className="fragment-list">{items.map((item) => <span className={found.includes(item) ? 'found' : ''} key={item}>{found.includes(item) && <Check size={13} />}{item}</span>)}</div><div className="music-challenge"><div><span className="eyebrow">FINAL CHECK // SELECT THE SIGNAL</span><strong>Which track opens the backstage door?</strong></div><div className="music-cards"><button className={song === 'SHEESH' ? 'selected' : ''} onClick={() => setSong('SHEESH')}><Play size={13} /> SHEESH <small>BABYMONSTER</small></button><button className={song === 'DREAM' ? 'selected' : ''} onClick={() => setSong('DREAM')}><Play size={13} /> DREAM <small>MISSION ARCHIVE</small></button><button className={song === 'RUSH' ? 'selected' : ''} onClick={() => setSong('RUSH')}><Play size={13} /> RUSH HOUR <small>MISSION ARCHIVE</small></button></div></div>{complete ? <div className="success-box burgundy-box"><Sparkles size={17} /><div><strong>BACKSTAGE ACCESS GRANTED.</strong><small>Even BABYMONSTER can't save you from the deadline.</small></div><PixelButton onClick={onComplete}>CLEAR STAGE <ArrowRight size={15} /></PixelButton></div> : <p className="hint"><CircleHelp size={14} /> Check the speaker, merch table and locker room.</p>}</div></div>;
}

function LevelThree({ onComplete }: { onComplete: () => void }) {
  const [placed, setPlaced] = useState<string[]>([]); const [started, setStarted] = useState(false); const parts = ['FOUNDATION', 'STRUCTURE', 'ROOF'];
  if (!started) return <MissionIntro title="THE FINAL MODEL" text="One last mission stands between you and your birthday reward. Place each piece on the drafting table." onContinue={() => setStarted(true)} />;
  const complete = placed.length === 3;
  return <div className="level-screen level-three"><div className="studio-art"><div className="studio-window"><div /><div /><div /></div><div className="studio-sunbeam" /><div className="shelf"><i /><i /><i /><i /></div><div className="studio-table"><div className="tabletop" /><div className="table-leg left-leg" /><div className="table-leg right-leg" /><div className="model-slots"><button className={placed.includes('FOUNDATION') ? 'placed' : ''} onClick={() => setPlaced((p) => p.includes('FOUNDATION') ? p : [...p, 'FOUNDATION'])}><span>01</span>{placed.includes('FOUNDATION') ? <Check size={18} /> : 'FOUNDATION'}</button><button className={placed.includes('STRUCTURE') ? 'placed' : ''} onClick={() => setPlaced((p) => p.includes('STRUCTURE') ? p : [...p, 'STRUCTURE'])}><span>02</span>{placed.includes('STRUCTURE') ? <Check size={18} /> : 'STRUCTURE'}</button><button className={placed.includes('ROOF') ? 'placed' : ''} onClick={() => setPlaced((p) => p.includes('ROOF') ? p : [...p, 'ROOF'])}><span>03</span>{placed.includes('ROOF') ? <Check size={18} /> : 'ROOF'}</button></div></div><div className="lamp" /><div className="studio-balcony" /><div className="studio-shahla"><PixelShahla /></div><div className="floating-paper paper-one">ELEVATION<br />SHEET</div><div className="floating-paper paper-two">SCALE<br />1:100</div></div><div className="objective-panel studio-panel"><div className="objective-title"><span className="level-chip blue">OBJECTIVE</span><strong>ASSEMBLE THE MODEL</strong><span className="objective-count">{placed.length}/3</span></div><p className="studio-instruction">Click each outlined component on the drafting table to place it in the correct position.</p><div className="assembly-list">{parts.map((part, index) => <div className={placed.includes(part) ? 'assembled' : ''} key={part}><span>0{index + 1}</span>{part}{placed.includes(part) && <Check size={14} />}</div>)}</div>{complete ? <div className="success-box blue-box"><Sparkles size={17} /><div><strong>THE MODEL IS FINALLY DONE.</strong><small>That took longer than expected.</small></div><PixelButton onClick={onComplete}>REVEAL REWARD <ArrowRight size={15} /></PixelButton></div> : <p className="hint"><CircleHelp size={14} /> Foundation first, structure second, roof last.</p>}</div></div>;
}

function Reward({ claimed, onClaim, onReplay }: { claimed: boolean; onClaim: () => void; onReplay: () => void }) {
  return <div className="reward-screen"><div className="confetti confetti-one" /><div className="confetti confetti-two" /><div className="confetti confetti-three" /><div className="reward-intro"><span className="eyebrow"><Trophy size={14} /> ALL THREE MISSIONS COMPLETE</span><h2>HAPPY BIRTHDAY,<br /><strong>SHAHLA!</strong></h2><p>Operation: Sheets Overdue — success.</p></div><div className="reward-stage"><div className="reward-rays" /><PixelShahla celebrating /><div className="gift-box"><div className="gift-lid" /><div className="gift-ribbon" /><div className="gift-body" /></div><div className="reward-stars"><Star /><Star /><Star /></div></div><div className="reward-card"><div className="card-corner top-left" /><div className="card-corner bottom-right" /><div className="reward-card-head"><Gift size={17} /><span>BIRTHDAY REWARD UNLOCKED</span><Gift size={17} /></div><div className="reward-message">I'LL GET THE<br />MODEL DONE FOR YOU.</div><p>Because you've completed enough sheets already.</p><div className="reward-details"><span><small>REWARD</small>ONE MODEL, ON ME.</span><span><small>UNLOCKED BY</small>SHAHLA</span><span><small>STATUS</small>CLAIMED</span></div>{claimed ? <div className="claimed-message"><Check size={16} /> REWARD SUCCESSFULLY CLAIMED!<small>Your model is officially my responsibility now.</small></div> : <PixelButton onClick={onClaim}>CLAIM YOUR GIFT <Gift size={15} /></PixelButton>}</div><div className="reward-footer">THREE MISSIONS <span /> THREE COMPLETED OBJECTIVES <span /> ONE VERY OVERDUE SHEET {claimed && <button onClick={onReplay}><RotateCcw size={13} /> REPLAY</button>}</div></div>;
}

function App() {
  const [screen, setScreen] = useState<Screen>('opening');
  const [progress, setProgress] = useState<Progress>(() => { try { return { ...initialProgress, ...JSON.parse(localStorage.getItem('shahla-operation-progress') || '{}') }; } catch { return initialProgress; } });
  const inventory = useMemo(() => [progress.levelOne ? 'FRAGMENTS ×3' : '', progress.levelTwo ? 'BACKSTAGE PASS' : '', progress.levelThree ? 'MODEL COMPLETE' : ''].filter(Boolean), [progress]);
  useEffect(() => { localStorage.setItem('shahla-operation-progress', JSON.stringify(progress)); }, [progress]);
  const completeLevel = (level: 'levelOne' | 'levelTwo' | 'levelThree') => { setProgress((current) => ({ ...current, [level]: true })); setScreen(level === 'levelOne' ? 'hub' : level === 'levelTwo' ? 'hub' : 'reward'); };
  const reset = () => { setProgress(initialProgress); setScreen('opening'); };
  if (screen === 'opening') return <Opening onStart={() => setScreen('profile')} />;
  if (screen === 'profile') return <Profile onAccept={() => setScreen('hub')} />;
  return <GameFrame screen={screen} progress={progress} inventory={inventory} onHome={() => setScreen('hub')}>{screen === 'hub' && <Hub progress={progress} onLevel={(level) => setScreen(level === 1 ? 'levelOne' : level === 2 ? 'levelTwo' : 'levelThree')} />}{screen === 'levelOne' && <LevelOne onComplete={() => completeLevel('levelOne')} />}{screen === 'levelTwo' && <LevelTwo onComplete={() => completeLevel('levelTwo')} />}{screen === 'levelThree' && <LevelThree onComplete={() => completeLevel('levelThree')} />}{screen === 'reward' && <Reward claimed={progress.rewardClaimed} onClaim={() => setProgress((current) => ({ ...current, rewardClaimed: true }))} onReplay={reset} />}</GameFrame>;
}

export default App;
