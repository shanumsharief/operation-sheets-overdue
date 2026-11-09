
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

type Screen =
  | 'opening'
  | 'profile'
  | 'hub'
  | 'levelOne'
  | 'levelTwo'
  | 'levelThree'
  | 'reward';

type Progress = {
  levelOne: boolean;
  levelTwo: boolean;
  levelThree: boolean;
  rewardClaimed: boolean;
};

type MissionCardProps = {
  level: string;
  title: string;
  description: string;
  unlocked: boolean;
  complete: boolean;
  icon: React.ReactNode;
  onClick: () => void;
};

const initialProgress: Progress = {
  levelOne: false,
  levelTwo: false,
  levelThree: false,
  rewardClaimed: false,
};

const backgroundImage = '/assets/images/_-6.jpg';

function PixelButton({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'soft' | 'ghost';
  disabled?: boolean;
}) {
  return (
    <button
      className={`pixel-button ${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function SheetStatus() {
  return (
    <div className="sheet-status">
      <span className="status-dot" /> SHEET STATUS: <strong>OVERDUE</strong>
    </div>
  );
}

function GameFrame({
  children,
  screen,
  progress,
  onHome,
  inventory = [],
}: {
  children: React.ReactNode;
  screen: Screen;
  progress: Progress;
  onHome: () => void;
  inventory?: string[];
}) {
  const completed = [
    progress.levelOne,
    progress.levelTwo,
    progress.levelThree,
  ].filter(Boolean).length;

  return (
    <main className="game-shell">
      <div className="topbar">
        <button
          className="brand-mark"
          onClick={onHome}
          aria-label="Return to mission hub"
        >
          <span>OS</span>
          <b>
            OPERATION
            <br />
            <em>SHEETS OVERDUE</em>
          </b>
        </button>

        <div className="topbar-right">
          <div className="progress-count">
            <Trophy size={14} /> {completed}/3 MISSIONS
          </div>
          <SheetStatus />
        </div>
      </div>

      {screen !== 'opening' && screen !== 'profile' && (
        <div className="mission-strip">
          <span className="level-chip">
            {screen === 'hub'
              ? 'MISSION MAP'
              : screen === 'reward'
                ? 'OPERATION COMPLETE'
                : screen === 'levelOne'
                  ? 'LEVEL 01'
                  : screen === 'levelTwo'
                    ? 'LEVEL 02'
                    : 'LEVEL 03'}
          </span>

          <span>
            {screen === 'hub'
              ? 'Choose your next assignment'
              : screen === 'reward'
                ? 'Birthday reward unlocked'
                : screen === 'levelOne'
                  ? 'The Missing Photocards'
                  : screen === 'levelTwo'
                    ? 'The Lost Lyrics'
                    : 'The Final Model'}
          </span>

          <div className="inventory">
            <Backpack size={14} />
            {inventory.length ? inventory.join(' · ') : 'INVENTORY EMPTY'}
          </div>
        </div>
      )}

      {children}
    </main>
  );
}

function PixelShahla({
  celebrating = false,
  confused = false,
}: {
  celebrating?: boolean;
  confused?: boolean;
}) {
  const pose = celebrating
    ? 'celebrating'
    : confused
      ? 'confused'
      : 'idle';

  return (
    <div className={`shahla shahla-${pose}`}>
      <img
        src="/assets/images/shahla_sprite_sheet.png"
        alt="Shahla"
        className="shahla-sprite"
      />
    </div>
  );
}

function Opening({ onStart }: { onStart: () => void }) {
  return (
    <div
      className="opening-screen"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(23, 29, 48, .08), rgba(31, 25, 42, .64)), url("${backgroundImage}")`,
      }}
    >
      <div className="opening-cloud cloud-one">
        <Cloud />
      </div>

      <div className="opening-cloud cloud-two">
        <Cloud />
      </div>

      <div className="opening-content">
        <div className="eyebrow">
          <span /> A PERSONAL BIRTHDAY QUEST <span />
        </div>

        <h1>
          OPERATION:
          <br />
          <strong>SHEETS</strong> OVERDUE
        </h1>

        <p className="tagline">
          One girl. Three missions. One very overdue sheet.
        </p>

        <div className="title-character">
          <PixelShahla />

          <div className="alert-card">
            <span className="alert-label">SYSTEM ALERT</span>
            <b>
              SHAHLA HAS AN
              <br />
              OVERDUE SHEET.
            </b>
            <small>
              LOCATION: UNKNOWN
              <br />
              MISSION STATUS: UNASSIGNED
            </small>
          </div>
        </div>

        <PixelButton onClick={onStart}>
          <Play size={16} fill="currentColor" /> START OPERATION
        </PixelButton>

        <p className="opening-note">
          <Sparkles size={13} /> A tiny adventure made especially for Shahla
        </p>
      </div>
    </div>
  );
}

function Profile({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="profile-screen">
      <div className="profile-orbit orbit-one" />
      <div className="profile-orbit orbit-two" />

      <div className="profile-heading">
        <span className="eyebrow">PLAYER PROFILE // 001</span>
        <h2>
          MEET <strong>SHAHLA</strong>
        </h2>
        <p>Every great operation begins with the right person.</p>
      </div>

      <div className="profile-card">
        <div className="profile-art">
          <div className="profile-grid" />
          <PixelShahla confused />
          <div className="profile-stamp">
            PLAYER
            <br />
            VERIFIED
          </div>
        </div>

        <div className="profile-copy">
          <div className="profile-line">
            <span>PLAYER</span>
            <strong>SHAHLA</strong>
          </div>

          <div className="profile-line">
            <span>CLASS</span>
            <strong>PROFESSIONAL SHEET COMPLETER</strong>
          </div>

          <div className="profile-line">
            <span>SPECIAL ABILITY</span>
            <strong>CAN TALK ABOUT SHEETS ANYWHERE</strong>
          </div>

          <div className="profile-line">
            <span>WEAKNESS</span>
            <strong>UNFINISHED SHEETS</strong>
          </div>

          <div className="profile-line">
            <span>CURRENT STATUS</span>
            <strong className="pink-text">SLIGHTLY OVERDUE</strong>
          </div>

          <div className="profile-dialogue">
            “She has one simple responsibility: finish her sheet.
            <br />
            Unfortunately, the sheet has followed her everywhere.”
          </div>

          <PixelButton onClick={onAccept}>
            ACCEPT MISSION <ChevronRight size={16} />
          </PixelButton>
        </div>
      </div>
    </div>
  );
}

function PathMission({
  level,
  title,
  description,
  unlocked,
  complete,
  icon,
  side,
  onClick,
}: MissionCardProps & { side: 'left' | 'right' }) {
  return (
    <button
      className={`path-mission ${side} ${unlocked ? 'unlocked' : 'locked'} ${complete ? 'complete' : ''}`}
      onClick={onClick}
      disabled={!unlocked}
    >
      <div className="path-mission-icon">
        {complete ? (
          <Check size={22} />
        ) : unlocked ? (
          icon
        ) : (
          <Lock size={20} />
        )}
      </div>

      <div className="path-mission-content">
        <span className="path-mission-level">{level}</span>
        <h3>{title}</h3>
        <p>
          {unlocked
            ? description
            : 'Complete the previous mission to unlock.'}
        </p>
        <span className="path-mission-status">
          {complete
            ? '✓ MISSION COMPLETE'
            : unlocked
              ? '▶ BEGIN MISSION'
              : '🔒 LOCKED'}
        </span>
      </div>
    </button>
  );
}

function Hub({
  progress,
  onLevel,
}: {
  progress: Progress;
  onLevel: (level: 1 | 2 | 3) => void;
}) {
  return (
    <div className="hub-screen">
      <div className="hub-scene">
        <div className="sun" />
        <div className="hub-cloud c1" />
        <div className="hub-cloud c2" />
        <div className="distant-hills" />

        <div className="hub-building building-left">
          <div className="roof" />
          <div className="window-row">
            <i />
            <i />
            <i />
          </div>
          <div className="door" />
        </div>

        <div className="hub-building building-right">
          <div className="roof" />
          <div className="balcony" />
          <div className="window-row">
            <i />
            <i />
          </div>
        </div>

        <div className="fountain">
          <div className="water" />
          <div className="fountain-base" />
        </div>

        <div className="path" />
        <div className="tree tree-left" />
        <div className="tree tree-right" />
        <div className="hub-player">
          <PixelShahla />
        </div>

        <div className="hub-sign">
          <Map size={14} /> MISSION BOARD
        </div>
      </div>

      <div className="hub-panel path-hub-panel">
        <div className="path-heading">
          <span className="eyebrow">THE OPERATIONS HQ</span>
          <h2>
            Your next <strong>adventure</strong>
          </h2>
          <p>Three missions stand between you and the birthday surprise.</p>
        </div>

        <div className="mission-path">
          <div className="path-line" />

          <PathMission
            level="LEVEL 01"
            title="THE MISSING PHOTOCARDS"
            description="Sort 18 idols into their correct K-pop groups."
            unlocked={true}
            complete={progress.levelOne}
            icon={<House size={22} />}
            side="left"
            onClick={() => onLevel(1)}
          />

          <PathMission
            level="LEVEL 02"
            title="THE LOST LYRICS"
            description="Match BABYMONSTER songs to their albums."
            unlocked={progress.levelOne}
            complete={progress.levelTwo}
            icon={<Music size={22} />}
            side="right"
            onClick={() => onLevel(2)}
          />

          <PathMission
            level="LEVEL 03"
            title="THE FINAL MODEL"
            description="Assemble the model and finish the operation."
            unlocked={progress.levelTwo}
            complete={progress.levelThree}
            icon={<Sparkles size={22} />}
            side="left"
            onClick={() => onLevel(3)}
          />
        </div>

        <div className="path-footer">
          <Star size={14} />
          COMPLETE ALL THREE TO UNLOCK YOUR BIRTHDAY REWARD
          <Star size={14} />
        </div>
      </div>
    </div>
  );
}

function MissionIntro({
  title,
  text,
  onContinue,
}: {
  title: string;
  text: string;
  onContinue: () => void;
}) {
  return (
    <div className="mission-intro">
      <div className="intro-panel">
        <span className="eyebrow">INCOMING TRANSMISSION</span>
        <h2>{title}</h2>
        <p>{text}</p>
        <PixelButton onClick={onContinue}>
          BEGIN OBJECTIVE <ChevronRight size={16} />
        </PixelButton>
      </div>
    </div>
  );
}

/* LEVEL 01 — PHOTOCARD SORTING */

type KpopGroup = 'TXT' | 'BABYMONSTER' | 'ENHYPEN' | 'SEVENTEEN';

const photocards: {
  name: string;
  group: KpopGroup;
  image: string;
}[] = [
  { name: 'Ahyeon', group: 'BABYMONSTER', image: '/assets/photocards/ahyeon.jpg' },
  { name: 'Yeonjun', group: 'TXT', image: '/assets/photocards/yeonjun.jpg' },
  { name: 'Jungwon', group: 'ENHYPEN', image: '/assets/photocards/jungwon.jpg' },
  { name: 'Jeonghan', group: 'SEVENTEEN', image: '/assets/photocards/jeonghan.jpg' },
  { name: 'Ruka', group: 'BABYMONSTER', image: '/assets/photocards/ruka.jpg' },
  { name: 'Mingyu', group: 'SEVENTEEN', image: '/assets/photocards/mingyu.jpg' },
  { name: 'Soobin', group: 'TXT', image: '/assets/photocards/soobin.jpg' },
  { name: 'Jay', group: 'ENHYPEN', image: '/assets/photocards/jay.jpg' },
  { name: 'Pharita', group: 'BABYMONSTER', image: '/assets/photocards/pharita.jpg' },
  { name: 'Hoshi', group: 'SEVENTEEN', image: '/assets/photocards/hoshi.jpg' },
  { name: 'Beomgyu', group: 'TXT', image: '/assets/photocards/beomgyu.jpg' },
  { name: 'Sunghoon', group: 'ENHYPEN', image: '/assets/photocards/sunghoon.jpg' },
  { name: 'Rami', group: 'BABYMONSTER', image: '/assets/photocards/rami.jpg' },
  { name: 'Taehyun', group: 'TXT', image: '/assets/photocards/taehyun.jpg' },
  { name: 'Wonwoo', group: 'SEVENTEEN', image: '/assets/photocards/wonwoo.jpg' },
  { name: 'Ni-Ki', group: 'ENHYPEN', image: '/assets/photocards/niki.jpg' },
  { name: 'Chiquita', group: 'BABYMONSTER', image: '/assets/photocards/chiquita.jpg' },
  { name: 'Huening Kai', group: 'TXT', image: '/assets/photocards/hueningkai.jpg' },
];

function LevelOne({ onComplete }: { onComplete: () => void }) {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sorted, setSorted] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [finished, setFinished] = useState(false);

  const currentCard = photocards[currentIndex];

  const groups: KpopGroup[] = [
    'TXT',
    'BABYMONSTER',
    'ENHYPEN',
    'SEVENTEEN',
  ];

  const chooseGroup = (group: KpopGroup) => {
    if (feedback === 'correct' || finished) return;

    if (group === currentCard.group) {
      setFeedback('correct');
      setSorted((previous) => previous + 1);
    } else {
      setFeedback('wrong');
    }
  };

  const nextCard = () => {
    if (currentIndex === photocards.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentIndex((previous) => previous + 1);
    setFeedback(null);
  };

  if (!started) {
    return (
      <MissionIntro
        title="THE MISSING PHOTOCARDS"
        text="The dressing room is a mess! Eighteen photocards have been mixed up. Sort every idol into the right group before the show begins."
        onContinue={() => setStarted(true)}
      />
    );
  }

  if (finished) {
    return (
      <div className="level-screen level-one">
        <div className="sorting-complete">
          <div className="complete-stars">✦ ✧ ✦</div>
          <h2>ALL SORTED!</h2>
          <p>18 photocards. 4 groups. Not a single one misplaced.</p>
          <div className="complete-count">18 / 18</div>
          <button className="sorting-next" onClick={onComplete}>
            BACK TO THE MAP →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="level-screen level-one">
      <div className="dressing-room">
        <div className="dressing-room-sign">
          BACKSTAGE · DRESSING ROOM
        </div>

        <div className="vanity-area">
          <div className="vanity-mirror">
            <div className="mirror-label">GET READY!</div>
            <div className="mirror-face">✦</div>
          </div>

          <div className="vanity-table">
            <span>♡</span>
            <span>✿</span>
            <span>♫</span>
          </div>
        </div>

        <div className="clothing-rack">
          <div className="rack-bar" />
          <div className="rack-clothes">
            <span>👕</span>
            <span>🎀</span>
            <span>👗</span>
            <span>🧥</span>
          </div>
        </div>

        <div className="sorting-station">
          <div className="station-heading">PHOTOCARD SORTING</div>

          <div className="sorting-progress">
            <span>{sorted} SORTED</span>
            <span>{currentIndex + 1} / 18</span>
          </div>

          <div className="sorting-progress-track">
            <div
              className="sorting-progress-fill"
              style={{ width: `${(sorted / 18) * 100}%` }}
            />
          </div>

          <div className="photocard-display">
            <div className="photocard-number">
              NO. {String(currentIndex + 1).padStart(2, '0')}
            </div>

            <div className="photocard">
              <div className="photo-placeholder">
                <span>{currentCard.name.slice(0, 1)}</span>
                <small>{currentCard.name}</small>
              </div>

              <img
                src={currentCard.image}
                alt={`${currentCard.name} photocard`}
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />

              <div className="photocard-caption">
                {currentCard.name.toUpperCase()}
              </div>
            </div>

            <p className="sorting-question">
              WHICH GROUP DOES THIS CARD BELONG TO?
            </p>
          </div>

          <div className="group-folders">
            {groups.map((group) => (
              <button
                key={group}
                className={`group-folder ${
                  feedback === 'correct' && group === currentCard.group
                    ? 'folder-correct'
                    : ''
                }`}
                onClick={() => chooseGroup(group)}
                disabled={feedback === 'correct'}
              >
                <span className="folder-icon">▤</span>
                <span>{group}</span>
              </button>
            ))}
          </div>

          {feedback === 'wrong' && (
            <div className="sorting-feedback wrong-feedback">
              NOT QUITE! TRY ANOTHER GROUP.
            </div>
          )}

          {feedback === 'correct' && (
            <div className="sorting-feedback correct-feedback">
              <span>
                ✓ CORRECT! {currentCard.name.toUpperCase()} IS IN THE RIGHT
                FOLDER.
              </span>

              <button onClick={nextCard}>
                {currentIndex === 17 ? 'FINISH SORTING →' : 'NEXT CARD →'}
              </button>
            </div>
          )}
        </div>

        <div className="dressing-room-floor" />
      </div>
    </div>
  );
}

/* LEVEL 02 — THE LOST LYRICS */

type AlbumId = 'babymons7er' | 'drip' | 'we-go-up' | 'choom';

const albums: {
  id: AlbumId;
  title: string;
  subtitle: string;
}[] = [
  {
    id: 'babymons7er',
    title: 'BABYMONS7ER',
    subtitle: '1ST MINI ALBUM',
  },
  {
    id: 'drip',
    title: 'DRIP',
    subtitle: '1ST FULL ALBUM',
  },
  {
    id: 'we-go-up',
    title: 'WE GO UP',
    subtitle: '2ND MINI ALBUM',
  },
  {
    id: 'choom',
    title: 'CHOOM',
    subtitle: '3RD MINI ALBUM',
  },
];

const lyricCards: {
  id: string;
  clue: string;
  song: string;
  album: AlbumId;
}[] = [
  {
    id: 'lyric-1',
    clue: 'A fierce hip-hop anthem with a dramatic, chant-like hook.',
    song: 'SHEESH',
    album: 'babymons7er',
  },
  {
    id: 'lyric-2',
    clue: 'A dreamy song about holding onto hope and believing in your dreams.',
    song: 'DREAM',
    album: 'babymons7er',
  },
  {
    id: 'lyric-3',
    clue: 'A confident, stylish track with sharp rap delivery and a minimal beat.',
    song: 'CLIK CLAK',
    album: 'drip',
  },
  {
    id: 'lyric-4',
    clue: 'A bright, feel-good pop song celebrating love and togetherness.',
    song: 'LOVE IN MY HEART',
    album: 'drip',
  },
  {
    id: 'lyric-5',
    clue: 'A high-energy anthem about rising higher and never slowing down.',
    song: 'WE GO UP',
    album: 'we-go-up',
  },
  {
    id: 'lyric-6',
    clue: 'A powerful mix of hip-hop, dance and rock with an intense attitude.',
    song: 'PSYCHO',
    album: 'we-go-up',
  },
  {
    id: 'lyric-7',
    clue: 'A bass-heavy dance track that invites everyone onto one dance floor.',
    song: 'CHOOM',
    album: 'choom',
  },
  {
    id: 'lyric-8',
    clue: 'A dreamy, atmospheric track with a moonlit R&B mood.',
    song: 'MOON',
    album: 'choom',
  },
];

function LevelTwo({ onComplete }: { onComplete: () => void }) {
  const [started, setStarted] = useState(false);

  const [cards] = useState(() => {
    const shuffled = [...lyricCards];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  });

  const [matched, setMatched] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  const currentCard = cards.find(
    (card) => !matched.includes(card.id)
  );

  const complete = matched.length === cards.length;

  function matchAlbum(albumId: AlbumId, cardId?: string) {
    const activeCardId = cardId || selectedId;

    if (!activeCardId) {
      setFeedback('PICK UP THE LYRIC CARD FIRST!');
      return;
    }

    const card = cards.find((item) => item.id === activeCardId);

    if (!card || matched.includes(card.id)) return;

    const album = albums.find((item) => item.id === albumId);

    if (card.album === albumId) {
      setMatched((current) => [...current, card.id]);
      setFeedback(`✓ CORRECT! ${card.song} → ${album?.title}`);
      setSelectedId(null);
    } else {
      setFeedback('✕ WRONG ALBUM! TRY AGAIN.');
      setSelectedId(null);
    }
  }

  if (!started) {
    return (
      <MissionIntro
        title="BABYMONSTER: THE LOST LYRICS"
        text="The music archive is a mess! Match eight song clues to their correct BABYMONSTER albums. Let's see how well you know your music."
        onContinue={() => setStarted(true)}
      />
    );
  }

  if (complete) {
    return (
      <div className="level-screen lyric-level-two">
        <div className="lyric-finish">
          <div className="dvd-disc finished-disc">
            <div className="disc-inner">
              <span>BM</span>
            </div>
          </div>

          <span className="eyebrow">
            BABYMONSTER MUSIC ARCHIVE
          </span>

          <h2>ALL TRACKS IDENTIFIED!</h2>

          <p>
            Every song found its album. You really know your BABYMONSTER!
          </p>

          <div className="finish-score">
            08 / 08 MATCHES
          </div>

          <PixelButton onClick={onComplete}>
            BACK TO THE MAP <ArrowRight size={15} />
          </PixelButton>
        </div>
      </div>
    );
  }

  return (
    <div className="level-screen lyric-level-two">
      <div className="lyric-room">

        <header className="lyric-header">
          <span>MISSION 02 // MUSIC ARCHIVE</span>
          <strong>BABYMONSTER</strong>
          <span>{matched.length}/8 MATCHED</span>
        </header>

        {/* DVD PLAYER */}

        <div className="dvd-section">
          <div className="dvd-player">

            <div className="dvd-label">
              <span>RETRO DISC PLAYER</span>
              <span>BM-018</span>
            </div>

            <div className="dvd-screen">

              <div className="dvd-disc">
                <div className="disc-inner">
                  <span>BM</span>
                </div>
              </div>

              <div className="dvd-screen-text">
                <span>NOW PLAYING</span>
                <strong>LYRIC ARCHIVE</strong>
                <small>
                  TRACK {String(matched.length + 1).padStart(2, '0')}
                </small>
              </div>

            </div>

            <div className="dvd-controls">
              <span>◀◀</span>
              <span className="play-symbol">▶</span>
              <span>■</span>
              <span>▶▶</span>
              <small>DISC SPINNING...</small>
            </div>

          </div>
        </div>

        {/* LYRIC CARD */}

        <div className="lyric-instruction">
          <span className="eyebrow">YOUR CURRENT CLUE</span>

          <h2>WHICH ALBUM DOES THIS SONG BELONG TO?</h2>

          {currentCard && (
            <div
              className={`lyric-card ${
                selectedId === currentCard.id ? 'lyric-selected' : ''
              }`}
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData('text/plain', currentCard.id);
                event.dataTransfer.effectAllowed = 'move';
              }}
              onClick={() => {
                setSelectedId(currentCard.id);
                setFeedback('');
              }}
            >
              <span className="lyric-card-number">
                CLUE #{matched.length + 1}
              </span>

              <strong>{currentCard.clue}</strong>

              <small>DRAG ME TO AN ALBUM ↓</small>
            </div>
          )}

          <p className="drag-hint">
            Drag the clue onto an album, or tap the clue and then tap an album.
          </p>

          {feedback && (
            <div
              className={`lyric-feedback ${
                feedback.startsWith('✓') ? 'right' : 'wrong'
              }`}
            >
              {feedback}
            </div>
          )}
        </div>

        {/* ALBUM DROP ZONES */}

        <div className="album-section">

          <div className="album-section-title">
            <span>YOUR ALBUM COLLECTION</span>
            <span>DROP ZONES ↓</span>
          </div>

          <div className="album-grid">

            {albums.map((album) => {
              const albumMatches = matched.filter(
                (id) =>
                  cards.find((card) => card.id === id)?.album === album.id
              ).length;

              return (
                <button
                  type="button"
                  key={album.id}
                  className={`album-drop album-${album.id}`}
                  onDragOver={(event) => {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = 'move';
                  }}
                  onDrop={(event) => {
                    event.preventDefault();

                    const cardId =
                      event.dataTransfer.getData('text/plain');

                    matchAlbum(album.id, cardId || undefined);
                  }}
                  onClick={() => matchAlbum(album.id)}
                >

                  <div className="album-art">
                    <span className="album-art-symbol">✦</span>
                    <strong>{album.title}</strong>
                    <small>BABYMONSTER</small>
                  </div>

                  <span className="album-name">
                    {album.title}
                  </span>

                  <small className="album-subtitle">
                    {album.subtitle}
                  </small>

                  <span className="album-progress">
                    {albumMatches}/2 MATCHED
                  </span>

                </button>
              );
            })}

          </div>
        </div>

        <div className="lyric-bottom">
          <span>OPERATION: LOST LYRICS</span>
          <span>KEEP THE MUSIC PLAYING ♪</span>
        </div>

      </div>
    </div>
  );
}


/* LEVEL 03 — THE FINAL MODEL */

type ModelPart =
  | 'foundation'
  | 'columns'
  | 'round-arch'
  | 'pointed-arch'
  | 'horseshoe-arch'
  | 'roof';

type ModelSlot = 'foundation' | 'columns' | 'arch' | 'roof';

function LevelThree({ onComplete }: { onComplete: () => void }) {
  const [started, setStarted] = useState(false);
  const [placed, setPlaced] = useState<ModelSlot[]>([]);
  const [selectedPart, setSelectedPart] = useState<ModelPart | null>(null);
  const [feedback, setFeedback] = useState('');

  const complete = placed.length === 4;

  const pieces: {
    id: ModelPart;
    label: string;
    number: string;
  }[] = [
    { id: 'foundation', label: 'FOUNDATION', number: '01' },
    { id: 'columns', label: 'COLUMNS', number: '02' },
    { id: 'pointed-arch', label: 'POINTED ARCH', number: '03' },
    { id: 'round-arch', label: 'ROUND ARCH', number: '04' },
    { id: 'horseshoe-arch', label: 'HORSESHOE ARCH', number: '05' },
    { id: 'roof', label: 'ROOF', number: '06' },
  ];

  const order: ModelSlot[] = [
    'foundation',
    'columns',
    'arch',
    'roof',
  ];

  const requiredPieces: Record<ModelSlot, ModelPart> = {
    foundation: 'foundation',
    columns: 'columns',
    arch: 'round-arch',
    roof: 'roof',
  };

  const remainingPieces = pieces.filter((piece) => {
    if (piece.id === 'foundation' && placed.includes('foundation')) return false;
    if (piece.id === 'columns' && placed.includes('columns')) return false;
    if (
      ['round-arch', 'pointed-arch', 'horseshoe-arch'].includes(piece.id) &&
      placed.includes('arch')
    ) return false;
    if (piece.id === 'roof' && placed.includes('roof')) return false;

    return true;
  });

  function placePart(slot: ModelSlot, part: ModelPart | null) {
    if (!part || complete || placed.includes(slot)) return;

    const nextSlot = order[placed.length];

    if (slot !== nextSlot) {
      setFeedback('FOLLOW THE BLUEPRINT. BUILD FROM THE BOTTOM UP!');
      setSelectedPart(null);
      return;
    }

    if (requiredPieces[slot] !== part) {
      setFeedback(
        slot === 'arch'
          ? 'NOT THIS ONE! CHECK THE ARCH SHAPE ON THE BLUEPRINT.'
          : 'THAT PIECE DOES NOT FIT HERE. TRY AGAIN!'
      );
      setSelectedPart(null);
      return;
    }

    setPlaced((current) => [...current, slot]);
    setSelectedPart(null);

    const messages: Record<ModelSlot, string> = {
      foundation: '✓ FOUNDATION PLACED!',
      columns: '✓ COLUMNS ARE IN PLACE!',
      arch: '✓ ROUND ARCH COMPLETED! ARCH-IEVED!',
      roof: '✓ ROOF PLACED! THE MODEL IS COMPLETE!',
    };

    setFeedback(messages[slot]);
  }

  function handleDrop(
    event: React.DragEvent<HTMLButtonElement>,
    slot: ModelSlot
  ) {
    event.preventDefault();

    const part = event.dataTransfer.getData('text/plain') as ModelPart;

    placePart(slot, part || selectedPart);
  }

  function slotProps(slot: ModelSlot) {
    return {
      onDragOver: (event: React.DragEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
      },
      onDrop: (event: React.DragEvent<HTMLButtonElement>) =>
        handleDrop(event, slot),
      onClick: () => placePart(slot, selectedPart),
    };
  }

  if (!started) {
    return (
      <MissionIntro
        title="THE FINAL MODEL"
        text="The blueprint is ready, but the building is unfinished. Drag the construction pieces into place, complete the arch challenge and finish the model!"
        onContinue={() => setStarted(true)}
      />
    );
  }

  if (complete) {
    return (
      <div className="level-screen level-three">
        <div className="model-complete-screen">
          <div className="completed-building">
            <div className="completed-roof" />
            <div className="completed-arch">
              <div className="completed-arch-opening" />
            </div>
            <div className="completed-columns">
              <i />
              <i />
            </div>
            <div className="completed-foundation" />
          </div>

          <span className="eyebrow">FINAL INSPECTION // PASSED</span>

          <h2>MODEL COMPLETE!</h2>

          <p>
            All components assembled. Structural integrity: 100%.
          </p>

          <div className="model-complete-stamp">
            <Check size={16} /> ALL COMPONENTS PLACED
          </div>

          <PixelButton onClick={onComplete}>
            REVEAL REWARD <ArrowRight size={15} />
          </PixelButton>
        </div>
      </div>
    );
  }

  return (
    <div className="level-screen level-three">
      <div className="architecture-game">

        {/* HEADER */}

        <div className="architecture-header">
          <span>MISSION 03 // ARCHITECTURE STUDIO</span>
          <strong>THE FINAL MODEL</strong>
          <span>{placed.length}/4 COMPONENTS</span>
        </div>

        {/* BLUEPRINT AND MODEL */}

        <div className="blueprint-section">

          <div className="blueprint-heading">
            <span>PROJECT 018 — MINIATURE STRUCTURE</span>
            <span>ASSEMBLY VIEW</span>
          </div>

          <div className="model-canvas">

            <div className="blueprint-grid" />

            <div className="blueprint-note note-top">
              FRONT ELEVATION
            </div>

            <div className="blueprint-note note-side">
              SCALE 1:100
            </div>

            {/* ROOF SLOT */}

            <button
              className={`model-slot roof-slot ${
                placed.includes('roof') ? 'slot-filled' : ''
              }`}
              {...slotProps('roof')}
            >
              {placed.includes('roof') ? (
                <div className="building-roof">
                  <span />
                </div>
              ) : (
                <span className="slot-label">04 · ROOF</span>
              )}
            </button>

            {/* ARCH SLOT */}

            <button
              className={`model-slot arch-slot ${
                placed.includes('arch') ? 'slot-filled' : ''
              }`}
              {...slotProps('arch')}
            >
              {placed.includes('arch') ? (
                <div className="building-arch">
                  <div className="arch-opening" />
                  <div className="arch-keystone" />
                </div>
              ) : (
                <span className="slot-label">03 · ARCH</span>
              )}
            </button>

            {/* COLUMNS SLOT */}

            <button
              className={`model-slot columns-slot ${
                placed.includes('columns') ? 'slot-filled' : ''
              }`}
              {...slotProps('columns')}
            >
              {placed.includes('columns') ? (
                <div className="building-columns">
                  <i />
                  <i />
                </div>
              ) : (
                <span className="slot-label">02 · COLUMNS</span>
              )}
            </button>

            {/* FOUNDATION SLOT */}

            <button
              className={`model-slot foundation-slot ${
                placed.includes('foundation') ? 'slot-filled' : ''
              }`}
              {...slotProps('foundation')}
            >
              {placed.includes('foundation') ? (
                <div className="building-foundation">
                  <span>MODEL BASE</span>
                </div>
              ) : (
                <span className="slot-label">01 · FOUNDATION</span>
              )}
            </button>

            <div className="blueprint-measurement">
              ───── 120 mm ─────
            </div>

          </div>

          <div className="blueprint-status">
            <span>STRUCTURAL INTEGRITY</span>
            <strong>{placed.length * 25}%</strong>

            <div className="integrity-track">
              <div
                className="integrity-fill"
                style={{ width: `${placed.length * 25}%` }}
              />
            </div>
          </div>
        </div>

        {/* ARCHITECTURE PUZZLE INSTRUCTION */}

        <div className="architecture-instruction">
          <span className="eyebrow">
            {placed.length === 0
              ? 'STEP 01'
              : placed.length === 1
                ? 'STEP 02'
                : placed.length === 2
                  ? 'STEP 03 — ARCH CHALLENGE'
                  : 'STEP 04'}
          </span>

          <h2>
            {placed.length === 0
              ? 'START WITH THE FOUNDATION'
              : placed.length === 1
                ? 'ADD THE SUPPORTING COLUMNS'
                : placed.length === 2
                  ? 'WHICH ARCH BELONGS HERE?'
                  : 'FINISH IT WITH THE ROOF'}
          </h2>

          <p>
            {placed.length === 0
              ? 'Drag the base piece onto the bottom of your blueprint.'
              : placed.length === 1
                ? 'The foundation is ready. Place the two supporting columns.'
                : placed.length === 2
                  ? 'The blueprint calls for a semicircular arch. Choose the correct shape.'
                  : 'One final piece! Place the roof to complete your model.'}
          </p>

          {placed.length === 2 && (
            <div className="arch-reference">
              <span>BLUEPRINT DETAIL</span>
              <div className="reference-round-arch">
                <div />
              </div>
              <strong>SEMICIRCULAR ARCH REQUIRED</strong>
            </div>
          )}
        </div>

        {/* CONSTRUCTION PIECES */}

        <div className="construction-tray">

          <div className="tray-heading">
            <span>CONSTRUCTION MATERIALS</span>
            <small>DRAG A PIECE TO THE BLUEPRINT</small>
          </div>

          <div className="construction-pieces">
            {remainingPieces.map((piece) => (
              <button
                key={piece.id}
                draggable
                className={`construction-piece piece-${piece.id} ${
                  selectedPart === piece.id ? 'piece-selected' : ''
                }`}
                onDragStart={(event) => {
                  event.dataTransfer.setData('text/plain', piece.id);
                  event.dataTransfer.effectAllowed = 'move';
                  setSelectedPart(piece.id);
                  setFeedback('');
                }}
                onDragEnd={() => setSelectedPart(null)}
                onClick={() => {
                  setSelectedPart(piece.id);
                  setFeedback(`SELECTED: ${piece.label}. NOW TAP ITS SLOT.`);
                }}
              >
                <span className="piece-number">{piece.number}</span>

                <span className={`piece-illustration illustration-${piece.id}`}>
                  {piece.id === 'foundation' && (
                    <span className="mini-foundation" />
                  )}

                  {piece.id === 'columns' && (
                    <span className="mini-columns">
                      <i />
                      <i />
                    </span>
                  )}

                  {piece.id === 'round-arch' && (
                    <span className="mini-arch round" />
                  )}

                  {piece.id === 'pointed-arch' && (
                    <span className="mini-arch pointed" />
                  )}

                  {piece.id === 'horseshoe-arch' && (
                    <span className="mini-arch horseshoe" />
                  )}

                  {piece.id === 'roof' && (
                    <span className="mini-roof" />
                  )}
                </span>

                <strong>{piece.label}</strong>
              </button>
            ))}
          </div>
        </div>

        {/* FEEDBACK */}

        {feedback && (
          <div
            className={`architecture-feedback ${
              feedback.startsWith('✓') ? 'feedback-correct' : ''
            }`}
          >
            {feedback}
          </div>
        )}

        <div className="architecture-footer">
          <span>ARCHITECTURE STUDIO</span>
          <span>ONE PIECE AT A TIME ✦</span>
        </div>

      </div>
    </div>
  );
}

/* BIRTHDAY REWARD */

function Reward({
  claimed,
  onClaim,
  onReplay,
}: {
  claimed: boolean;
  onClaim: () => void;
  onReplay: () => void;
}) {
  return (
    <div className="reward-screen">
      <div className="confetti confetti-one" />
      <div className="confetti confetti-two" />
      <div className="confetti confetti-three" />

      <div className="reward-intro">
        <span className="eyebrow">
          <Trophy size={14} /> ALL THREE MISSIONS COMPLETE
        </span>

        <h2>
          HAPPY BIRTHDAY,
          <br />
          <strong>SHAHLA!</strong>
        </h2>

        <p>Operation: Sheets Overdue — success.</p>
      </div>

      <div className="reward-stage">
        <div className="reward-rays" />
        <PixelShahla celebrating />

        <div className="gift-box">
          <div className="gift-lid" />
          <div className="gift-ribbon" />
          <div className="gift-body" />
        </div>

        <div className="reward-stars">
          <Star />
          <Star />
          <Star />
        </div>
      </div>

      <div className="reward-card">
        <div className="card-corner top-left" />
        <div className="card-corner bottom-right" />

        <div className="reward-card-head">
          <Gift size={17} />
          <span>BIRTHDAY REWARD UNLOCKED</span>
          <Gift size={17} />
        </div>

        <div className="reward-message">
          I'LL GET THE
          <br />
          MODEL DONE FOR YOU.
          <br /> 
          (+ ONE MORE ASSIGNMENT WHENEVER YOU WANT ME TO.)
        </div>

        <p>Because you've completed enough sheets already.</p>

        <div className="reward-details">
          <span>
            <small>REWARD</small>
            ONE MODEL, ON ME.
          </span>

          <span>
            <small>UNLOCKED BY</small>
            SHAHLA
          </span>

          <span>
            <small>STATUS</small>
            CLAIMED
          </span>
        </div>

        {claimed ? (
          <div className="claimed-message">
            <Check size={16} /> REWARD SUCCESSFULLY CLAIMED!
            <small>Your model is officially my responsibility now.</small>
          </div>
        ) : (
          <PixelButton onClick={onClaim}>
            CLAIM YOUR GIFT <Gift size={15} />
          </PixelButton>
        )}
      </div>

      <div className="reward-footer">
        THREE MISSIONS <span /> THREE COMPLETED OBJECTIVES <span /> ONE VERY
        OVERDUE SHEET

        {claimed && (
          <button onClick={onReplay}>
            <RotateCcw size={13} /> REPLAY
          </button>
        )}
      </div>
    </div>
  );
}

/* MAIN APP */

function App() {
  const [screen, setScreen] = useState<Screen>('opening');

  const [progress, setProgress] = useState<Progress>(() => {
    try {
      return {
        ...initialProgress,
        ...JSON.parse(
          localStorage.getItem('shahla-operation-progress') || '{}'
        ),
      };
    } catch {
      return initialProgress;
    }
  });

  const inventory = useMemo(
    () =>
      [
        progress.levelOne ? 'PHOTOCARDS SORTED' : '',
        progress.levelTwo ? 'MUSIC ARCHIVE' : '',
        progress.levelThree ? 'MODEL COMPLETE' : '',
      ].filter(Boolean),
    [progress]
  );

  useEffect(() => {
    localStorage.setItem(
      'shahla-operation-progress',
      JSON.stringify(progress)
    );
  }, [progress]);

  const completeLevel = (
    level: 'levelOne' | 'levelTwo' | 'levelThree'
  ) => {
    setProgress((current) => ({
      ...current,
      [level]: true,
    }));

    setScreen(
      level === 'levelThree' ? 'reward' : 'hub'
    );
  };

  const reset = () => {
    setProgress(initialProgress);
    setScreen('opening');
  };

  if (screen === 'opening') {
    return <Opening onStart={() => setScreen('profile')} />;
  }

  if (screen === 'profile') {
    return <Profile onAccept={() => setScreen('hub')} />;
  }

  return (
    <GameFrame
      screen={screen}
      progress={progress}
      inventory={inventory}
      onHome={() => setScreen('hub')}
    >
      {screen === 'hub' && (
        <Hub
          progress={progress}
          onLevel={(level) =>
            setScreen(
              level === 1
                ? 'levelOne'
                : level === 2
                  ? 'levelTwo'
                  : 'levelThree'
            )
          }
        />
      )}

      {screen === 'levelOne' && (
        <LevelOne
          onComplete={() => completeLevel('levelOne')}
        />
      )}

      {screen === 'levelTwo' && (
        <LevelTwo
          onComplete={() => completeLevel('levelTwo')}
        />
      )}

      {screen === 'levelThree' && (
        <LevelThree
          onComplete={() => completeLevel('levelThree')}
        />
      )}

      {screen === 'reward' && (
        <Reward
          claimed={progress.rewardClaimed}
          onClaim={() =>
            setProgress((current) => ({
              ...current,
              rewardClaimed: true,
            }))
          }
          onReplay={reset}
        />
      )}
    </GameFrame>
  );
}

export default App;
