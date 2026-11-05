/**
 * ============================================================================
 * PROJECT NEBULA: LAST STAND 🚀
 * Major Expansion: 100 Levels • Space Currency • Ship Collection • Epic Victory
 * Pure HTML5 Canvas + Web Audio API Procedural Synthesizer
 * ============================================================================
 */

'use strict';

/* ============================================================================
   1. SECTOR DEFINITIONS (10 SECTORS, 100 LEVELS)
   ============================================================================ */
const SECTORS_DATA = [
  {
    id: 1,
    name: 'SOLAR FRONTIER',
    description: 'Outer solar rim defenses. Light drone squadrons and swift skirmishers.',
    palette: { primary: '#00f0ff', secondary: '#facc15', nebula: 'rgba(234, 179, 8, 0.12)', star: '#fef08a', dust: '#00f0ff' },
    bossName: 'HELIOS VANGUARD',
    bossId: 1
  },
  {
    id: 2,
    name: 'CRIMSON NEBULA',
    description: 'Volatile red gas clouds concealing aggressive needle-wing interceptors.',
    palette: { primary: '#f43f5e', secondary: '#fb923c', nebula: 'rgba(244, 63, 94, 0.15)', star: '#fecdd3', dust: '#f43f5e' },
    bossName: 'ARES DREADNOUGHT',
    bossId: 2
  },
  {
    id: 3,
    name: 'FROZEN EXPANSE',
    description: 'Sub-zero asteroid fields and heavily armored cryogenic battleships.',
    palette: { primary: '#38bdf8', secondary: '#e0f2fe', nebula: 'rgba(56, 189, 248, 0.14)', star: '#e0f2fe', dust: '#38bdf8' },
    bossName: 'GLACIAL BEHEMOTH',
    bossId: 3
  },
  {
    id: 4,
    name: 'DARK MATTER ZONE',
    description: 'Gravitational anomalies and cloaked phantom raiders navigating the void.',
    palette: { primary: '#a855f7', secondary: '#ec4899', nebula: 'rgba(168, 85, 247, 0.16)', star: '#f5d0fe', dust: '#a855f7' },
    bossName: 'NULL SINGULARITY',
    bossId: 4
  },
  {
    id: 5,
    name: 'PHANTOM GALAXY',
    description: 'Spectral bio-mechanical swarms emitting tracking energy torpedoes.',
    palette: { primary: '#2dd4bf', secondary: '#a7f3d0', nebula: 'rgba(45, 212, 191, 0.14)', star: '#ccfbf1', dust: '#2dd4bf' },
    bossName: 'SPECTER LEVIATHAN',
    bossId: 5
  },
  {
    id: 6,
    name: 'ABYSSAL RIFT',
    description: 'Torn spacetime fissures harboring ancient dreadnought carriers.',
    palette: { primary: '#6366f1', secondary: '#818cf8', nebula: 'rgba(99, 102, 241, 0.16)', star: '#e0e7ff', dust: '#6366f1' },
    bossName: 'ABYSS CONQUEROR',
    bossId: 6
  },
  {
    id: 7,
    name: 'CELESTIAL WASTELAND',
    description: 'Scorched graveyard of fallen star fleets with deadly automated defensive turrets.',
    palette: { primary: '#f59e0b', secondary: '#ef4444', nebula: 'rgba(245, 158, 11, 0.15)', star: '#fef3c7', dust: '#f59e0b' },
    bossName: 'NOVA ARCHON',
    bossId: 7
  },
  {
    id: 8,
    name: 'QUANTUM STORM',
    description: 'High-frequency ion lightning storms accelerating enemy attack vectors.',
    palette: { primary: '#06b6d4', secondary: '#3b82f6', nebula: 'rgba(6, 182, 212, 0.18)', star: '#cffafe', dust: '#06b6d4' },
    bossName: 'TACHYON OVERLORD',
    bossId: 8
  },
  {
    id: 9,
    name: 'VOID DOMINION',
    description: 'Core empire territory dominated by elite multi-phase war armadas.',
    palette: { primary: '#ec4899', secondary: '#8b5cf6', nebula: 'rgba(236, 72, 153, 0.18)', star: '#fce7f3', dust: '#ec4899' },
    bossName: 'OBLIVION SOVEREIGN',
    bossId: 9
  },
  {
    id: 10,
    name: 'OMEGA TERRITORY',
    description: 'The final citadel. Apocalypse-class flagship defending the galactic nexus.',
    palette: { primary: '#ef4444', secondary: '#fbbf24', nebula: 'rgba(239, 68, 68, 0.22)', star: '#fee2e2', dust: '#fbbf24' },
    bossName: 'OMEGA PROTOCOL: THE APOCALYPSE',
    bossId: 10
  }
];

/* ============================================================================
   2. SPACESHIP ROSTER (10 UNIQUE CRAFT)
   ============================================================================ */
const SHIPS_DATA = [
  {
    id: 'starfang',
    name: 'STARFANG',
    className: 'TACTICAL INTERCEPTOR',
    price: 0,
    desc: 'Standard starfleet interceptor. Balanced handling with dual plasma lasers.',
    damage: 1.0,
    fireRate: 1.0,
    speed: 1.0,
    defense: 1.0,
    engineColor: '#00f0ff',
    laserColor: '#00f0ff',
    abilityName: 'MICRO-MISSILE VOLLEY',
    abilityDesc: 'Fires a rapid spread of 6 tracking micro-missiles that seek out nearby hostiles.',
    cooldown: 12.0
  },
  {
    id: 'phantom_x',
    name: 'PHANTOM-X',
    className: 'STEALTH RAZOR DELTA',
    price: 1500,
    desc: 'Hyper-agile stealth delta fighter. Unrivaled maneuverability and stinger lasers.',
    damage: 0.9,
    fireRate: 1.2,
    speed: 1.35,
    defense: 0.8,
    engineColor: '#c084fc',
    laserColor: '#c084fc',
    abilityName: 'PHASE SHIFT',
    abilityDesc: 'Cloaks ship for 3.5s, granting complete invulnerability and +40% flight speed.',
    cooldown: 14.0
  },
  {
    id: 'nova_striker',
    name: 'NOVA STRIKER',
    className: 'HEAVY ASSAULT SHIP',
    price: 3500,
    desc: 'Reinforced assault fighter equipped with high-impact crimson plasma cannons.',
    damage: 1.35,
    fireRate: 0.9,
    speed: 0.95,
    defense: 1.2,
    engineColor: '#f43f5e',
    laserColor: '#f43f5e',
    abilityName: 'CLUSTER BOMB BARRAGE',
    abilityDesc: 'Launches heavy warheads that detonate into 10 high-damage fiery shrapnel fragments.',
    cooldown: 13.0
  },
  {
    id: 'void_reaper',
    name: 'VOID REAPER',
    className: 'SCYTHE HUNTER',
    price: 6000,
    desc: 'Curved obsidian scythe wings firing concentrated high-velocity violet bolts.',
    damage: 1.25,
    fireRate: 1.15,
    speed: 1.1,
    defense: 1.0,
    engineColor: '#a855f7',
    laserColor: '#a855f7',
    abilityName: 'GRAVITON VORTEX',
    abilityDesc: 'Spawns a miniature black hole singularity that pulls in and tears apart hostiles.',
    cooldown: 15.0
  },
  {
    id: 'titan_guardian',
    name: 'TITAN GUARDIAN',
    className: 'ARMORED FORTRESS',
    price: 9000,
    desc: 'Heavily plated dreadnought fighter built to withstand overwhelming punishment.',
    damage: 1.1,
    fireRate: 0.85,
    speed: 0.8,
    defense: 1.8,
    engineColor: '#fbbf24',
    laserColor: '#fbbf24',
    abilityName: 'AEGIS FORTRESS',
    abilityDesc: 'Instantly recharges full shields and emits a defensive radial concussive blast.',
    cooldown: 16.0
  },
  {
    id: 'nebula_viper',
    name: 'NEBULA VIPER',
    className: 'RAPID NEEDLE STRIKER',
    price: 13000,
    desc: 'Needle-thin aerodynamic hull fitted with dual rotary emerald gatling cannons.',
    damage: 0.85,
    fireRate: 1.7,
    speed: 1.2,
    defense: 0.9,
    engineColor: '#10b981',
    laserColor: '#10b981',
    abilityName: 'GATLING OVERDRIVE',
    abilityDesc: 'Eliminates all laser cooldowns for 6.0 seconds for extreme bullet velocity.',
    cooldown: 12.0
  },
  {
    id: 'solaris',
    name: 'SOLARIS',
    className: 'RADIANT SOLAR CRUISER',
    price: 18000,
    desc: 'Harnesses solar radiation to fire piercing continuous golden energy bolts.',
    damage: 1.45,
    fireRate: 1.1,
    speed: 1.05,
    defense: 1.25,
    engineColor: '#facc15',
    laserColor: '#facc15',
    abilityName: 'SOLAR FLARE EMP',
    abilityDesc: 'Unleashes a screen-clearing coronal flash that wipes out all enemy bullets.',
    cooldown: 14.0
  },
  {
    id: 'dark_matter',
    name: 'DARK MATTER',
    className: 'ANOMALY BIO-CRAFT',
    price: 24000,
    desc: 'Living alien biometal hull utilizing antimatter projectiles with splash damage.',
    damage: 1.5,
    fireRate: 1.0,
    speed: 1.15,
    defense: 1.3,
    engineColor: '#38bdf8',
    laserColor: '#38bdf8',
    abilityName: 'SINGULARITY RIFT',
    abilityDesc: 'Opens a dimensional rift dealing 250 damage to all active hostiles on screen.',
    cooldown: 15.0
  },
  {
    id: 'omega_prime',
    name: 'OMEGA PRIME',
    className: 'COMMAND DREADNOUGHT',
    price: 32000,
    desc: 'Elite starfleet flagship boasting quad synchronized plasma accelerators.',
    damage: 1.65,
    fireRate: 1.3,
    speed: 1.1,
    defense: 1.5,
    engineColor: '#f43f5e',
    laserColor: '#00f0ff',
    abilityName: 'HYPER RESONANCE',
    abilityDesc: 'Engages quad overdrive cannons and +50% weapon damage for 8.0 seconds.',
    cooldown: 16.0
  },
  {
    id: 'celestial_destroyer',
    name: 'CELESTIAL DESTROYER',
    className: 'LEGENDARY FLAGSHIP',
    price: 50000,
    desc: 'Mythical ancient vessel of godlike cosmic power with prismatic death rays.',
    damage: 2.0,
    fireRate: 1.4,
    speed: 1.25,
    defense: 1.8,
    engineColor: '#e0f2fe',
    laserColor: '#ffffff',
    abilityName: 'APOCALYPSE SUPER BEAM',
    abilityDesc: 'Fires a titanic disintegrator ray sweeping the screen for 4.0 seconds.',
    cooldown: 18.0
  }
];

/* ============================================================================
   3. UPGRADES DATA (7 TRACKS, 10 TIERS EACH)
   ============================================================================ */
const UPGRADE_TRACKS = [
  { id: 'damage', name: 'Weapon Damage', desc: '+10% laser firepower per tier', baseCost: 200, multiplier: 0.10 },
  { id: 'fireRate', name: 'Shooting Speed', desc: '+6% laser fire rate per tier', baseCost: 250, multiplier: 0.06 },
  { id: 'speed', name: 'Flight Speed', desc: '+5% maneuvering velocity per tier', baseCost: 180, multiplier: 0.05 },
  { id: 'health', name: 'Hull Integrity', desc: '+15 maximum ship health per tier', baseCost: 220, multiplier: 15 },
  { id: 'shield', name: 'Shield Strength', desc: '+15 max shield & faster regen per tier', baseCost: 240, multiplier: 15 },
  { id: 'beam', name: 'Hyper Beam Power', desc: '+12% Hyper Beam damage & charge speed', baseCost: 300, multiplier: 0.12 },
  { id: 'special', name: 'Special Cooldown', desc: '-8% cooldown time for ship abilities', baseCost: 280, multiplier: 0.08 }
];

/* ============================================================================
   4. ACHIEVEMENTS DATA
   ============================================================================ */
const ACHIEVEMENTS_DATA = [
  { id: 'first_blood', name: 'First Blood', desc: 'Destroy your first enemy starship.', reward: 250 },
  { id: 'combo_master', name: 'Combo Master', desc: 'Reach a combo multiplier of x4.0 or higher.', reward: 500 },
  { id: 'boss_hunter_1', name: 'Boss Hunter I', desc: 'Defeat your first Sector Boss.', reward: 1000 },
  { id: 'boss_hunter_5', name: 'Boss Hunter V', desc: 'Defeat 5 Sector Bosses.', reward: 3000 },
  { id: 'fleet_collector', name: 'Fleet Collector', desc: 'Unlock 3 unique spaceships in the Garage.', reward: 2000 },
  { id: 'armada_admiral', name: 'Armada Admiral', desc: 'Unlock 6 unique spaceships in the Garage.', reward: 5000 },
  { id: 'millionaire', name: 'Galactic Millionaire', desc: 'Accumulate a total of 25,000 Galactic Credits.', reward: 4000 },
  { id: 'galaxy_defender', name: 'Galaxy Defender', desc: 'Complete Sector 5 (Level 50).', reward: 5000 },
  { id: 'ultimate_legend', name: 'Ultimate Pilot', desc: 'Complete all 100 levels and save the cosmos.', reward: 15000 }
];

/* ============================================================================
   5. AUDIO ENGINE (PROCEDURAL SYNTHESIZER & MUSIC SEQUENCER)
   ============================================================================ */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.musicGain = null;
    this.compressor = null;

    this.isMuted = false;
    this.masterVol = 0.8;
    this.musicVol = 0.7;
    this.sfxVol = 0.85;

    this.isInitialized = false;
    this.musicPlaying = false;
    this.musicTrack = 'menu'; // 'menu', 'combat', 'boss'
    this.sequencerTimer = null;
    this.currentStep = 0;
    this.bpm = 126;
  }

  init() {
    if (this.isInitialized) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Compressor for punchy, distortion-free sound
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(12, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(6, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.2, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();
      this.musicGain = this.ctx.createGain();

      this.updateVolumes();

      this.sfxGain.connect(this.masterGain);
      this.musicGain.connect(this.masterGain);
      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);

      this.isInitialized = true;
      console.log('Nebula Sound Engine initialized successfully.');
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  resume() {
    if (!this.isInitialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  updateVolumes() {
    if (!this.masterGain) return;
    const now = this.ctx ? this.ctx.currentTime : 0;
    const effectiveMaster = this.isMuted ? 0 : this.masterVol;
    this.masterGain.gain.setValueAtTime(effectiveMaster, now);
    this.musicGain.gain.setValueAtTime(this.musicVol * 0.45, now);
    this.sfxGain.gain.setValueAtTime(this.sfxVol * 0.65, now);
  }

  setMute(mute) {
    this.isMuted = mute;
    this.updateVolumes();
  }

  createNoiseBuffer(duration = 1.0) {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  /* ---------------- SOUND EFFECTS ---------------- */

  playLaser(type = 'normal') {
    if (!this.isInitialized || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.sfxGain);

    if (type === 'normal') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(860, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'rapid') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'triple') {
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(190, now + 0.14);
      osc2.frequency.setValueAtTime(780, now);
      osc2.frequency.exponentialRampToValueAtTime(200, now + 0.14);
      osc2.connect(gain);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.start(now);
      osc2.start(now);
      osc.stop(now + 0.14);
      osc2.stop(now + 0.14);
    } else if (type === 'enemy') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.16);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'boss_orb') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.28);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.start(now);
      osc.stop(now + 0.28);
    }
  }

  playExplosion(intensity = 'medium') {
    if (!this.isInitialized || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    let duration = 0.45;
    let filterFreq = 650;
    let subFreq = 95;
    let volume = 0.45;

    if (intensity === 'small') {
      duration = 0.25; filterFreq = 900; subFreq = 120; volume = 0.25;
    } else if (intensity === 'large') {
      duration = 0.8; filterFreq = 480; subFreq = 65; volume = 0.55;
    } else if (intensity === 'boss') {
      duration = 1.6; filterFreq = 380; subFreq = 45; volume = 0.8;
    }

    const noiseBuffer = this.createNoiseBuffer(duration);
    if (noiseBuffer) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(filterFreq * 2, now);
      filter.frequency.exponentialRampToValueAtTime(60, now + duration);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(volume, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);

      noise.start(now);
      noise.stop(now + duration);
    }

    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(subFreq, now);
    subOsc.frequency.exponentialRampToValueAtTime(25, now + duration);
    subGain.gain.setValueAtTime(volume * 0.75, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);
    subOsc.start(now);
    subOsc.stop(now + duration);
  }

  /* CRITICAL FIX: The previously missing playBossDeath method! */
  playBossDeath() {
    if (!this.isInitialized || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    // 1. Massive deep sub-drop
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(160, now);
    subOsc.frequency.exponentialRampToValueAtTime(25, now + 2.5);

    subGain.gain.setValueAtTime(0.7, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.6);

    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);
    subOsc.start(now);
    subOsc.stop(now + 2.6);

    // 2. Heavy filtered rumbling explosion
    const noiseBuffer = this.createNoiseBuffer(2.2);
    if (noiseBuffer) {
      const src = this.ctx.createBufferSource();
      src.buffer = noiseBuffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(35, now + 2.2);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      src.start(now);
      src.stop(now + 2.2);
    }
  }

  playCreditEarn() {
    if (!this.isInitialized || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(1320, now); // E6
    osc2.frequency.setValueAtTime(1760, now + 0.04); // A6

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(now);
    osc2.start(now + 0.04);
    osc1.stop(now + 0.15);
    osc2.stop(now + 0.15);
  }

  playPurchase() {
    if (!this.isInitialized || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const notes = [587.33, 880, 1174.66]; // D5, A5, D6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);

      gain.gain.setValueAtTime(0.25, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.16);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.16);
    });
  }

  playUpgrade() {
    if (!this.isInitialized || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  playPlayerHit() {
    if (!this.isInitialized || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.3);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.3);
    this.playExplosion('small');
  }

  playShieldHit() {
    if (!this.isInitialized || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(950, now);
    osc.frequency.exponentialRampToValueAtTime(480, now + 0.22);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  playPowerUp() {
    if (!this.isInitialized || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.setValueAtTime(0.28, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.18);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.18);
    });
  }

  playBossWarning() {
    if (!this.isInitialized || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const t = now + i * 0.45;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(540, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.35);
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.35);
    }
  }

  playHyperBeam() {
    if (!this.isInitialized || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(260, now + 1.2);

    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(18, now);
    lfoGain.gain.setValueAtTime(35, now);

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    lfo.start(now);
    osc.start(now);
    lfo.stop(now + 1.6);
    osc.stop(now + 1.6);
  }

  playEmpBlast() {
    if (!this.isInitialized || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.7);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.7);
  }

  playUiBeep(tone = 'low') {
    if (!this.isInitialized || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const freq = tone === 'high' ? 880 : 540;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  playGameOver() {
    if (!this.isInitialized || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const notes = [293.66, 261.63, 220.0, 146.83];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.28);
      gain.gain.setValueAtTime(0.25, now + idx * 0.28);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.28 + 0.55);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now + idx * 0.28);
      osc.stop(now + idx * 0.28 + 0.55);
    });
  }

  playVictoryFanfare() {
    if (!this.isInitialized || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const chords = [
      [261.63, 329.63, 392.0], // C
      [293.66, 369.99, 440.0], // D
      [329.63, 415.30, 493.88], // E
      [523.25, 659.25, 783.99] // High C
    ];

    chords.forEach((chord, i) => {
      const t = now + i * 0.25;
      chord.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + (i === 3 ? 1.2 : 0.35));
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + (i === 3 ? 1.2 : 0.35));
      });
    });
  }

  /* ---------------- PROCEDURAL SYNTHWAVE MUSIC SEQUENCER ---------------- */

  startMusic(track = 'menu') {
    this.musicTrack = track;
    this.resume();
    if (this.musicPlaying) return;

    this.musicPlaying = true;
    this.currentStep = 0;
    this.scheduleMusicStep();
  }

  setTrack(track) {
    this.musicTrack = track;
  }

  stopMusic() {
    this.musicPlaying = false;
    if (this.sequencerTimer) {
      clearTimeout(this.sequencerTimer);
      this.sequencerTimer = null;
    }
  }

  scheduleMusicStep() {
    if (!this.musicPlaying || !this.ctx) return;

    const stepDuration = 60 / this.bpm / 4;
    const now = this.ctx.currentTime;

    this.playSequencerBeat(this.currentStep, now);

    this.currentStep = (this.currentStep + 1) % 16;
    this.sequencerTimer = setTimeout(() => {
      this.scheduleMusicStep();
    }, stepDuration * 1000);
  }

  playSequencerBeat(step, time) {
    if (this.isMuted || !this.ctx) return;

    const bassScale = [73.42, 73.42, 87.31, 98.0, 110.0, 130.81, 73.42, 87.31];
    const leadScale = [293.66, 349.23, 392.0, 440.0, 523.25, 587.33];

    // Kick Drum
    if (this.musicTrack !== 'menu') {
      if (step % 4 === 0 || (this.musicTrack === 'boss' && (step === 2 || step === 10))) {
        const kickOsc = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kickOsc.type = 'sine';
        kickOsc.frequency.setValueAtTime(140, time);
        kickOsc.frequency.exponentialRampToValueAtTime(32, time + 0.12);
        kickGain.gain.setValueAtTime(0.55, time);
        kickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);
        kickOsc.connect(kickGain);
        kickGain.connect(this.musicGain);
        kickOsc.start(time);
        kickOsc.stop(time + 0.14);
      }

      // Snare on beats 4 and 12
      if (step === 4 || step === 12) {
        const snareNoise = this.createNoiseBuffer(0.15);
        if (snareNoise) {
          const src = this.ctx.createBufferSource();
          src.buffer = snareNoise;
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'highpass';
          filter.frequency.setValueAtTime(800, time);

          const snareGain = this.ctx.createGain();
          snareGain.gain.setValueAtTime(0.3, time);
          snareGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

          src.connect(filter);
          filter.connect(snareGain);
          snareGain.connect(this.musicGain);
          src.start(time);
          src.stop(time + 0.15);
        }
      }

      // Hi-hats
      if (step % 2 === 0) {
        const hatNoise = this.createNoiseBuffer(0.04);
        if (hatNoise) {
          const src = this.ctx.createBufferSource();
          src.buffer = hatNoise;
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'highpass';
          filter.frequency.setValueAtTime(7000, time);

          const hatGain = this.ctx.createGain();
          hatGain.gain.setValueAtTime(0.12, time);
          hatGain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

          src.connect(filter);
          filter.connect(hatGain);
          hatGain.connect(this.musicGain);
          src.start(time);
          src.stop(time + 0.04);
        }
      }
    }

    // Rolling Synth Bassline
    const bassFreq = bassScale[(Math.floor(step / 2)) % bassScale.length] * (this.musicTrack === 'boss' ? 1.5 : 1.0);
    const bassOsc = this.ctx.createOscillator();
    const bassFilter = this.ctx.createBiquadFilter();
    const bassGain = this.ctx.createGain();

    bassOsc.type = this.musicTrack === 'menu' ? 'sine' : 'sawtooth';
    bassOsc.frequency.setValueAtTime(bassFreq, time);

    bassFilter.type = 'lowpass';
    const cutoff = this.musicTrack === 'boss' ? 1200 : (this.musicTrack === 'combat' ? 850 : 380);
    bassFilter.frequency.setValueAtTime(cutoff, time);
    bassFilter.frequency.exponentialRampToValueAtTime(140, time + 0.12);

    const bassVol = this.musicTrack === 'menu' ? 0.22 : 0.35;
    bassGain.gain.setValueAtTime(bassVol, time);
    bassGain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    bassOsc.connect(bassFilter);
    bassFilter.connect(bassGain);
    bassGain.connect(this.musicGain);
    bassOsc.start(time);
    bassOsc.stop(time + 0.12);

    // Arpeggiator Lead
    if (step % 2 === 0 || this.musicTrack === 'boss') {
      const leadNote = leadScale[(step * 3) % leadScale.length];
      const leadOsc = this.ctx.createOscillator();
      const leadGain = this.ctx.createGain();
      leadOsc.type = 'triangle';
      leadOsc.frequency.setValueAtTime(leadNote, time);

      leadGain.gain.setValueAtTime(0.14, time);
      leadGain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

      leadOsc.connect(leadGain);
      leadGain.connect(this.musicGain);
      leadOsc.start(time);
      leadOsc.stop(time + 0.18);
    }
  }
}

/* ============================================================================
   6. COSMIC ENVIRONMENT (SECTOR-THEMED PARALLAX STARS & PLANETS)
   ============================================================================ */
class SpaceEnvironment {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.planets = [];
    this.cosmicDust = [];
    this.nebulaOrbs = [];
    this.warpSpeed = 1.0;
    this.targetWarp = 1.0;
    this.sectorPalette = SECTORS_DATA[0].palette;

    this.init();
  }

  setSector(sectorId) {
    const sData = SECTORS_DATA[(sectorId - 1) % SECTORS_DATA.length];
    this.sectorPalette = sData.palette;
    this.init();
  }

  init() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const pal = this.sectorPalette;

    // Layered Starfield
    this.stars = [];
    for (let i = 0; i < 160; i++) {
      this.stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 3 + 0.5,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        color: Math.random() > 0.4 ? pal.star : '#ffffff'
      });
    }

    // Distant Sector Planets
    this.planets = [
      {
        x: w * 0.82,
        y: h * 0.22,
        radius: 65,
        baseColor: pal.secondary,
        glowColor: pal.primary,
        ring: true,
        vy: 0.08
      },
      {
        x: w * 0.18,
        y: h * 0.78,
        radius: 40,
        baseColor: pal.primary,
        glowColor: pal.secondary,
        ring: false,
        vy: 0.12
      }
    ];

    // Cosmic Dust
    this.cosmicDust = [];
    for (let i = 0; i < 40; i++) {
      this.cosmicDust.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vy: Math.random() * 0.6 + 0.2,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.1,
        color: pal.dust
      });
    }

    // Nebula Orbs
    this.nebulaOrbs = [
      { x: w * 0.3, y: h * 0.3, r: 240, color: pal.nebula, vy: 0.04 },
      { x: w * 0.7, y: h * 0.65, r: 280, color: pal.nebula, vy: 0.05 }
    ];
  }

  resize() {
    this.init();
  }

  setWarp(multiplier) {
    this.targetWarp = multiplier;
  }

  update(dt) {
    const h = this.canvas.height;
    const w = this.canvas.width;

    this.warpSpeed += (this.targetWarp - this.warpSpeed) * 0.05;

    for (const s of this.stars) {
      s.y += s.z * 1.8 * this.warpSpeed;
      s.alpha += Math.sin(Date.now() * s.twinkleSpeed) * 0.015;
      if (s.y > h) {
        s.y = 0;
        s.x = Math.random() * w;
      }
    }

    for (const p of this.planets) {
      p.y += p.vy * this.warpSpeed;
      if (p.y - p.radius > h) {
        p.y = -p.radius * 2;
        p.x = Math.random() * (w - 200) + 100;
      }
    }

    for (const d of this.cosmicDust) {
      d.y += d.vy * this.warpSpeed;
      if (d.y > h) {
        d.y = 0;
        d.x = Math.random() * w;
      }
    }

    for (const n of this.nebulaOrbs) {
      n.y += n.vy * this.warpSpeed;
      if (n.y - n.r > h) {
        n.y = -n.r;
        n.x = Math.random() * w;
      }
    }
  }

  render() {
    const ctx = this.ctx;

    // Nebulas
    for (const n of this.nebulaOrbs) {
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      grad.addColorStop(0, n.color);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Planets
    for (const p of this.planets) {
      const glowGrad = ctx.createRadialGradient(p.x, p.y, p.radius * 0.7, p.x, p.y, p.radius * 1.4);
      glowGrad.addColorStop(0, p.glowColor);
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      const sphereGrad = ctx.createRadialGradient(
        p.x - p.radius * 0.35, p.y - p.radius * 0.35, p.radius * 0.1,
        p.x, p.y, p.radius
      );
      sphereGrad.addColorStop(0, '#f8fafc');
      sphereGrad.addColorStop(0.3, p.baseColor);
      sphereGrad.addColorStop(1, '#020617');

      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      if (p.ring) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(-0.35);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.radius * 1.8, p.radius * 0.45, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.restore();
      }
    }

    // Cosmic Dust
    for (const d of this.cosmicDust) {
      ctx.fillStyle = d.color;
      ctx.globalAlpha = Math.max(0, d.alpha);
      ctx.fillRect(d.x, d.y, d.size, d.size);
    }

    // Stars
    for (const s of this.stars) {
      ctx.fillStyle = s.color;
      ctx.globalAlpha = Math.max(0.2, Math.min(1.0, s.alpha));
      if (this.warpSpeed > 1.8) {
        const streakLen = s.z * 12 * (this.warpSpeed / 2);
        ctx.fillRect(s.x, s.y, s.size * 0.8, streakLen);
      } else {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1.0;
  }
}

/* ============================================================================
   7. PARTICLE SYSTEM & VISUAL EFFECTS
   ============================================================================ */
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.floatingTexts = [];
    this.shockwaves = [];
    this.quality = 'high';
  }

  setQuality(q) {
    this.quality = q;
  }

  spawnThruster(x, y, vx, vy, color = '#00f0ff') {
    if (this.quality === 'low' && Math.random() > 0.4) return;
    this.particles.push({
      x: x + (Math.random() - 0.5) * 4,
      y: y,
      vx: vx + (Math.random() - 0.5) * 0.8,
      vy: vy + Math.random() * 2 + 3,
      size: Math.random() * 3 + 2,
      color: color,
      life: 0.35,
      maxLife: 0.35,
      type: 'thruster'
    });
  }

  spawnSparks(x, y, count = 12, color = '#fbbf24') {
    const actualCount = this.quality === 'low' ? Math.floor(count / 2) : count;
    for (let i = 0; i < actualCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1.5;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2.5 + 1.5,
        color: color,
        life: 0.45,
        maxLife: 0.45,
        type: 'spark'
      });
    }
  }

  spawnExplosion(x, y, intensity = 'medium', primaryColor = '#ff007f') {
    let count = 28;
    let maxSpeed = 6;
    let waveRadius = 45;

    if (intensity === 'small') {
      count = 14; maxSpeed = 3.5; waveRadius = 25;
    } else if (intensity === 'large') {
      count = 55; maxSpeed = 9; waveRadius = 80;
    } else if (intensity === 'boss') {
      count = 120; maxSpeed = 14; waveRadius = 180;
    }

    if (this.quality === 'low') count = Math.floor(count * 0.5);

    // Expanding Shockwave ring
    this.shockwaves.push({
      x: x,
      y: y,
      radius: 5,
      maxRadius: waveRadius,
      color: primaryColor,
      life: 0.5,
      maxLife: 0.5
    });

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * maxSpeed + 0.8;
      const colors = ['#ffffff', '#fbbf24', '#f97316', primaryColor];
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 0.5 + 0.35,
        maxLife: 0.85,
        type: 'explosion'
      });
    }
  }

  spawnFloatingText(x, y, text, color = '#00f0ff', scale = 1.0) {
    this.floatingTexts.push({
      x: x,
      y: y,
      text: text,
      color: color,
      scale: scale,
      vy: -1.2,
      life: 0.85,
      maxLife: 0.85
    });
  }

  update(dt) {
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.life -= dt;
      sw.radius += (sw.maxRadius - sw.radius) * 7 * dt;
      if (sw.life <= 0) this.shockwaves.splice(i, 1);
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      p.x += p.vx;
      p.y += p.vy;

      if (p.type === 'spark' || p.type === 'explosion') {
        p.vx *= 0.96;
        p.vy *= 0.96;
      }
      if (p.life <= 0) this.particles.splice(i, 1);
    }

    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.life -= dt;
      ft.y += ft.vy;
      if (ft.life <= 0) this.floatingTexts.splice(i, 1);
    }
  }

  render() {
    const ctx = this.ctx;

    for (const sw of this.shockwaves) {
      const progress = sw.life / sw.maxLife;
      ctx.save();
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = sw.color;
      ctx.globalAlpha = Math.max(0, progress);
      ctx.lineWidth = 3 * progress;
      ctx.shadowColor = sw.color;
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.restore();
    }

    for (const p of this.particles) {
      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const ft of this.floatingTexts) {
      const alpha = Math.max(0, ft.life / ft.maxLife);
      ctx.save();
      ctx.font = `bold ${Math.round(14 * ft.scale)}px 'Orbitron', monospace`;
      ctx.fillStyle = ft.color;
      ctx.globalAlpha = alpha;
      ctx.shadowColor = ft.color;
      ctx.shadowBlur = 8;
      ctx.textAlign = 'center';
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    }
    ctx.globalAlpha = 1.0;
  }
}

/* ============================================================================
   8. PLAYER STARFIGHTER (WITH 10 SHIP DESIGNS & ABILITIES)
   ============================================================================ */
class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.shipId = 'starfang';
    this.shipData = SHIPS_DATA[0];

    this.x = canvas.width / 2;
    this.y = canvas.height * 0.82;
    this.vx = 0;
    this.vy = 0;
    this.width = 44;
    this.height = 54;
    this.baseSpeed = 460;
    this.speed = 460;
    this.friction = 0.88;
    this.bankAngle = 0;

    // Attributes
    this.maxHealth = 100;
    this.health = 100;
    this.maxShield = 100;
    this.shield = 100;
    this.shieldRegenTimer = 0;

    // Combat
    this.fireTimer = 0;
    this.baseFireInterval = 0.17;
    this.rapidFire = false;
    this.rapidTimer = 0;
    this.tripleShot = false;
    this.tripleTimer = 0;

    // Hyper Beam
    this.beamCharge = 0;
    this.isFiringBeam = false;
    this.beamTimer = 0;

    // Ship Special Ability
    this.abilityTimer = 0;
    this.abilityDurationTimer = 0;
    this.isPhaseShifted = false;

    // Invincibility
    this.invincibleTimer = 0;
    this.isAlive = true;
  }

  setShip(shipId, upgrades = {}) {
    this.shipId = shipId;
    const found = SHIPS_DATA.find(s => s.id === shipId) || SHIPS_DATA[0];
    this.shipData = found;

    // Apply upgrade modifiers
    const upgHealth = (upgrades.health || 0) * 15;
    const upgShield = (upgrades.shield || 0) * 15;
    const upgSpeed = 1 + (upgrades.speed || 0) * 0.05;
    const upgFireRate = 1 + (upgrades.fireRate || 0) * 0.06;

    this.maxHealth = Math.round((100 * found.defense) + upgHealth);
    this.maxShield = Math.round((100 * found.defense) + upgShield);
    this.speed = this.baseSpeed * found.speed * upgSpeed;
    this.baseFireInterval = (0.17 / (found.fireRate * upgFireRate));
    this.health = this.maxHealth;
    this.shield = this.maxShield;
  }

  reset() {
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height * 0.82;
    this.vx = 0;
    this.vy = 0;
    this.health = this.maxHealth;
    this.shield = this.maxShield;
    this.rapidFire = false;
    this.tripleShot = false;
    this.rapidTimer = 0;
    this.tripleTimer = 0;
    this.beamCharge = 0;
    this.isFiringBeam = false;
    this.abilityTimer = 0;
    this.abilityDurationTimer = 0;
    this.isPhaseShifted = false;
    this.invincibleTimer = 0;
    this.isAlive = true;
  }

  takeDamage(amount) {
    if (this.invincibleTimer > 0 || this.isPhaseShifted || !this.isAlive) return false;

    if (this.shield > 0) {
      if (this.shield >= amount) {
        this.shield -= amount;
        amount = 0;
      } else {
        amount -= this.shield;
        this.shield = 0;
      }
    }

    if (amount > 0) {
      this.health = Math.max(0, this.health - amount);
    }

    this.invincibleTimer = 1.2;
    if (this.health <= 0) {
      this.isAlive = false;
    }
    return true;
  }

  heal(amount) {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }

  restoreShield() {
    this.shield = this.maxShield;
  }

  chargeBeam(amount, multiplier = 1.0) {
    this.beamCharge = Math.min(100, this.beamCharge + amount * multiplier);
  }

  canUseAbility() {
    return this.isAlive && this.abilityTimer <= 0;
  }

  triggerAbility(game) {
    if (!this.canUseAbility()) return;
    this.abilityTimer = this.shipData.cooldown;
    game.sound.playPowerUp();

    const id = this.shipId;
    if (id === 'starfang') {
      // Fire 6 micro-missiles
      for (let i = 0; i < 6; i++) {
        const vx = (i - 2.5) * 60;
        game.projectiles.push(new Projectile(this.x, this.y - 10, vx, -550, true, 'homing', 45));
      }
      game.particles.spawnFloatingText(this.x, this.y - 30, 'MICRO-MISSILES LAUNCHED!', '#00f0ff');
    } else if (id === 'phantom_x') {
      this.isPhaseShifted = true;
      this.abilityDurationTimer = 3.5;
      game.particles.spawnFloatingText(this.x, this.y - 30, 'PHASE SHIFT ENGAGED!', '#c084fc');
    } else if (id === 'nova_striker') {
      // Cluster bomb
      game.projectiles.push(new Projectile(this.x, this.y - 20, 0, -600, true, 'cluster', 180));
      game.particles.spawnFloatingText(this.x, this.y - 30, 'CLUSTER BOMB DEPLOYED!', '#f43f5e');
    } else if (id === 'void_reaper') {
      game.projectiles.push(new Projectile(this.x, this.y - 30, 0, -400, true, 'vortex', 220));
      game.particles.spawnFloatingText(this.x, this.y - 30, 'GRAVITON VORTEX!', '#a855f7');
    } else if (id === 'titan_guardian') {
      this.restoreShield();
      game.sound.playEmpBlast();
      game.triggerScreenShake(14, 0.5);
      game.particles.spawnFloatingText(this.x, this.y - 30, 'AEGIS FORTRESS PULSE!', '#fbbf24');
      for (const p of game.projectiles) {
        if (!p.isPlayer && Math.hypot(p.x - this.x, p.y - this.y) < 260) p.markedForDeletion = true;
      }
    } else if (id === 'nebula_viper') {
      this.rapidFire = true;
      this.rapidTimer = 6.0;
      game.particles.spawnFloatingText(this.x, this.y - 30, 'GATLING OVERDRIVE!', '#10b981');
    } else if (id === 'solaris') {
      game.sound.playEmpBlast();
      game.triggerScreenShake(20, 0.8);
      game.particles.spawnFloatingText(this.canvas.width / 2, this.canvas.height / 2, 'SOLAR FLARE EMP!', '#facc15', 1.8);
      for (const p of game.projectiles) if (!p.isPlayer) p.markedForDeletion = true;
      for (const e of game.enemies) e.takeDamage(150);
    } else if (id === 'dark_matter') {
      game.sound.playEmpBlast();
      game.particles.spawnFloatingText(this.x, this.y - 30, 'SINGULARITY RIFT!', '#38bdf8');
      for (const e of game.enemies) e.takeDamage(250);
    } else if (id === 'omega_prime') {
      this.tripleShot = true;
      this.tripleTimer = 8.0;
      this.rapidFire = true;
      this.rapidTimer = 8.0;
      game.particles.spawnFloatingText(this.x, this.y - 30, 'HYPER RESONANCE ACTIVE!', '#f43f5e');
    } else if (id === 'celestial_destroyer') {
      this.isFiringBeam = true;
      this.beamTimer = 4.0;
      game.sound.playHyperBeam();
      game.triggerScreenShake(25, 2.0);
      game.particles.spawnFloatingText(this.canvas.width / 2, this.canvas.height / 2, 'APOCALYPSE SUPER BEAM!', '#ffffff', 2.0);
    }
  }

  update(dt, input, particles) {
    if (!this.isAlive) return;

    if (this.invincibleTimer > 0) this.invincibleTimer -= dt;

    if (this.abilityTimer > 0) this.abilityTimer -= dt;
    if (this.abilityDurationTimer > 0) {
      this.abilityDurationTimer -= dt;
      if (this.abilityDurationTimer <= 0) {
        this.isPhaseShifted = false;
      }
    }

    // Shield slow recovery if not hit for 4s
    this.shieldRegenTimer += dt;
    if (this.shieldRegenTimer > 4.0 && this.shield < this.maxShield) {
      this.shield = Math.min(this.maxShield, this.shield + 10 * dt);
    }

    let moveX = 0;
    let moveY = 0;

    if (input.left) moveX -= 1;
    if (input.right) moveX += 1;
    if (input.up) moveY -= 1;
    if (input.down) moveY += 1;

    if (input.joyX !== 0 || input.joyY !== 0) {
      moveX = input.joyX;
      moveY = input.joyY;
    }

    if (input.mouseControl && input.mouseX !== null) {
      const dx = input.mouseX - this.x;
      const dy = input.mouseY - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 6) {
        moveX = (dx / dist) * Math.min(1.0, dist / 40);
        moveY = (dy / dist) * Math.min(1.0, dist / 40);
      }
    }

    const len = Math.hypot(moveX, moveY);
    if (len > 1) {
      moveX /= len;
      moveY /= len;
    }

    const activeSpeed = this.isPhaseShifted ? this.speed * 1.4 : this.speed;
    this.vx += moveX * activeSpeed * dt * 4;
    this.vy += moveY * activeSpeed * dt * 4;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    const margin = 28;
    this.x = Math.max(margin, Math.min(this.canvas.width - margin, this.x));
    this.y = Math.max(margin * 1.5, Math.min(this.canvas.height - margin * 1.5, this.y));

    const targetBank = Math.max(-1, Math.min(1, this.vx / 300));
    this.bankAngle += (targetBank - this.bankAngle) * 0.15;

    // Thrusters
    const engColor = this.shipData.engineColor;
    particles.spawnThruster(this.x - 12 + this.bankAngle * 4, this.y + 24, this.vx * 0.05, 4, engColor);
    particles.spawnThruster(this.x + 12 + this.bankAngle * 4, this.y + 24, this.vx * 0.05, 4, engColor);

    if (this.rapidFire) {
      this.rapidTimer -= dt;
      if (this.rapidTimer <= 0) this.rapidFire = false;
    }

    if (this.tripleShot) {
      this.tripleTimer -= dt;
      if (this.tripleTimer <= 0) this.tripleShot = false;
    }

    if (this.isFiringBeam) {
      this.beamTimer -= dt;
      if (this.beamTimer <= 0) this.isFiringBeam = false;
    }

    this.fireTimer -= dt;
  }

  canShoot() {
    return this.isAlive && this.fireTimer <= 0;
  }

  getFireInterval() {
    return this.rapidFire ? this.baseFireInterval * 0.45 : this.baseFireInterval;
  }

  resetFireTimer() {
    this.fireTimer = this.getFireInterval();
  }

  render(ctx) {
    if (!this.isAlive) return;

    if (this.invincibleTimer > 0 && Math.floor(Date.now() / 80) % 2 === 0) {
      return;
    }

    ctx.save();
    ctx.translate(this.x, this.y);

    if (this.isPhaseShifted) {
      ctx.globalAlpha = 0.4;
    }

    ctx.scale(1 - Math.abs(this.bankAngle) * 0.22, 1);
    ctx.rotate(this.bankAngle * 0.12);

    // Vector procedural rendering based on ship model
    Player.drawShipModel(ctx, this.shipId, this.shipData);

    ctx.restore();

    // Shield Bubble
    if (this.shield > 0) {
      const shieldRatio = this.shield / this.maxShield;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 240, 255, ${0.25 + shieldRatio * 0.45})`;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 12;
      ctx.stroke();

      ctx.beginPath();
      const arcAngle = (Date.now() * 0.003) % (Math.PI * 2);
      ctx.arc(0, 0, 36, arcAngle, arcAngle + 1.2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.stroke();
      ctx.restore();
    }
  }

  /* Static method to draw ship vector model on any context (Game canvas or Garage canvas) */
  static drawShipModel(ctx, shipId, data) {
    const col = data.engineColor || '#00f0ff';

    ctx.save();
    ctx.lineWidth = 2;
    ctx.shadowColor = col;
    ctx.shadowBlur = 12;

    if (shipId === 'starfang') {
      // Sleek interceptor
      ctx.fillStyle = '#0284c7';
      ctx.strokeStyle = '#00f0ff';
      ctx.beginPath();
      ctx.moveTo(-6, -6); ctx.lineTo(-26, 16); ctx.lineTo(-24, 24); ctx.lineTo(-8, 14); ctx.closePath();
      ctx.fill(); ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(6, -6); ctx.lineTo(26, 16); ctx.lineTo(24, 24); ctx.lineTo(8, 14); ctx.closePath();
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#0369a1';
      ctx.beginPath();
      ctx.moveTo(0, -28); ctx.lineTo(11, 4); ctx.lineTo(9, 24); ctx.lineTo(-9, 24); ctx.lineTo(-11, 4); ctx.closePath();
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.ellipse(0, -7, 4.5, 10, 0, 0, Math.PI * 2); ctx.fill();
    } else if (shipId === 'phantom_x') {
      // Angular stealth razor delta
      ctx.fillStyle = '#3b0764';
      ctx.strokeStyle = '#c084fc';
      ctx.beginPath();
      ctx.moveTo(0, -32); ctx.lineTo(28, 22); ctx.lineTo(10, 16); ctx.lineTo(0, 26); ctx.lineTo(-10, 16); ctx.lineTo(-28, 22); ctx.closePath();
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#c084fc';
      ctx.fillRect(-2, -14, 4, 18);
    } else if (shipId === 'nova_striker') {
      // Heavy trident assault
      ctx.fillStyle = '#7f1d1d';
      ctx.strokeStyle = '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(0, -30); ctx.lineTo(8, -10); ctx.lineTo(24, 10); ctx.lineTo(20, 26); ctx.lineTo(10, 20); ctx.lineTo(0, 28);
      ctx.lineTo(-10, 20); ctx.lineTo(-20, 26); ctx.lineTo(-24, 10); ctx.lineTo(-8, -10); ctx.closePath();
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(-14, 2, 4, 16);
      ctx.fillRect(10, 2, 4, 16);
    } else if (shipId === 'void_reaper') {
      // Curved crescent scythe
      ctx.fillStyle = '#1e1b4b';
      ctx.strokeStyle = '#a855f7';
      ctx.beginPath();
      ctx.moveTo(0, -26); ctx.lineTo(24, -10); ctx.lineTo(30, 20); ctx.lineTo(14, 12); ctx.lineTo(0, 22);
      ctx.lineTo(-14, 12); ctx.lineTo(-30, 20); ctx.lineTo(-24, -10); ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#e879f9';
      ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.fill();
    } else if (shipId === 'titan_guardian') {
      // Heavy armored tank
      ctx.fillStyle = '#1c1917';
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-12, -26); ctx.lineTo(12, -26); ctx.lineTo(26, -4); ctx.lineTo(26, 24); ctx.lineTo(-26, 24); ctx.lineTo(-26, -4); ctx.closePath();
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(-18, -14, 6, 28);
      ctx.fillRect(12, -14, 6, 28);
    } else if (shipId === 'nebula_viper') {
      // Needle-thin striker
      ctx.fillStyle = '#064e3b';
      ctx.strokeStyle = '#10b981';
      ctx.beginPath();
      ctx.moveTo(0, -34); ctx.lineTo(6, 4); ctx.lineTo(22, 22); ctx.lineTo(16, 26); ctx.lineTo(4, 18); ctx.lineTo(0, 28);
      ctx.lineTo(-4, 18); ctx.lineTo(-16, 26); ctx.lineTo(-22, 22); ctx.lineTo(-6, 4); ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#34d399';
      ctx.fillRect(-18, 6, 3, 14);
      ctx.fillRect(15, 6, 3, 14);
    } else if (shipId === 'solaris') {
      // Solar radiant cruiser
      ctx.fillStyle = '#713f12';
      ctx.strokeStyle = '#facc15';
      ctx.beginPath();
      ctx.moveTo(0, -30); ctx.lineTo(14, -8); ctx.lineTo(28, 14); ctx.lineTo(12, 24); ctx.lineTo(0, 18);
      ctx.lineTo(-12, 24); ctx.lineTo(-28, 14); ctx.lineTo(-14, -8); ctx.closePath();
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.fill();
    } else if (shipId === 'dark_matter') {
      // Alien biometal craft
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(0, -32); ctx.quadraticCurveTo(32, -6, 24, 26); ctx.lineTo(10, 16); ctx.lineTo(0, 24);
      ctx.lineTo(-10, 16); ctx.lineTo(-24, 26); ctx.quadraticCurveTo(-32, -6, 0, -32);
      ctx.fill(); ctx.stroke();
    } else if (shipId === 'omega_prime') {
      // Sovereign flagship with quad guns
      ctx.fillStyle = '#4c0519';
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -32); ctx.lineTo(16, -10); ctx.lineTo(32, 12); ctx.lineTo(24, 26); ctx.lineTo(10, 20); ctx.lineTo(0, 28);
      ctx.lineTo(-10, 20); ctx.lineTo(-24, 26); ctx.lineTo(-32, 12); ctx.lineTo(-16, -10); ctx.closePath();
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(-28, 0, 4, 18);
      ctx.fillRect(-18, -6, 4, 18);
      ctx.fillRect(14, -6, 4, 18);
      ctx.fillRect(24, 0, 4, 18);
    } else if (shipId === 'celestial_destroyer') {
      // Angelic cosmic flagship
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -36); ctx.lineTo(18, -12); ctx.lineTo(36, 6); ctx.lineTo(28, 28); ctx.lineTo(12, 18); ctx.lineTo(0, 30);
      ctx.lineTo(-12, 18); ctx.lineTo(-28, 28); ctx.lineTo(-36, 6); ctx.lineTo(-18, -12); ctx.closePath();
      ctx.fill(); ctx.stroke();

      const coreGrad = ctx.createRadialGradient(0, -4, 2, 0, -4, 12);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.5, '#00f0ff');
      coreGrad.addColorStop(1, '#ec4899');
      ctx.fillStyle = coreGrad;
      ctx.beginPath(); ctx.arc(0, -4, 10, 0, Math.PI * 2); ctx.fill();
    }

    ctx.restore();
  }
}

/* ============================================================================
   9. PROJECTILE CLASS
   ============================================================================ */
class Projectile {
  constructor(x, y, vx, vy, isPlayer = true, type = 'laser', damage = 20) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.isPlayer = isPlayer;
    this.type = type;
    this.damage = damage;
    this.radius = isPlayer ? 4 : 5;
    this.markedForDeletion = false;
  }

  update(dt, player, enemies) {
    if (this.type === 'homing') {
      // Track closest enemy if player projectile
      if (this.isPlayer && enemies && enemies.length > 0) {
        let closest = null;
        let minDist = 999999;
        for (const e of enemies) {
          if (!e.markedForDeletion) {
            const d = Math.hypot(e.x - this.x, e.y - this.y);
            if (d < minDist) { minDist = d; closest = e; }
          }
        }
        if (closest) {
          const angle = Math.atan2(closest.y - this.y, closest.x - this.x);
          this.vx += Math.cos(angle) * 380 * dt;
          this.vy += Math.sin(angle) * 380 * dt;
          const speed = Math.hypot(this.vx, this.vy);
          if (speed > 550) {
            this.vx = (this.vx / speed) * 550;
            this.vy = (this.vy / speed) * 550;
          }
        }
      } else if (!this.isPlayer && player && player.isAlive) {
        const angle = Math.atan2(player.y - this.y, player.x - this.x);
        this.vx += Math.cos(angle) * 140 * dt;
        this.vy += Math.sin(angle) * 140 * dt;
        const speed = Math.hypot(this.vx, this.vy);
        if (speed > 240) {
          this.vx = (this.vx / speed) * 240;
          this.vy = (this.vy / speed) * 240;
        }
      }
    }

    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  render(ctx) {
    ctx.save();
    if (this.isPlayer) {
      ctx.shadowBlur = 12;
      if (this.type === 'rapid') {
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#10b981';
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 10);
        ctx.lineTo(this.x, this.y + 10);
        ctx.stroke();
      } else if (this.type === 'homing') {
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#00f0ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00f0ff';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 14);
        ctx.lineTo(this.x, this.y + 14);
        ctx.stroke();
      }
    } else {
      if (this.type === 'boss_orb') {
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 16;
        ctx.fillStyle = '#f87171';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.shadowColor = '#ff007f';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#ff007f';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }
}

/* ============================================================================
   10. POWER-UPS CLASS
   ============================================================================ */
class PowerUp {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.vy = 85;
    this.radius = 16;
    this.markedForDeletion = false;
    this.angle = 0;
  }

  update(dt, player) {
    this.angle += 3 * dt;
    if (player && player.isAlive) {
      const dx = player.x - this.x;
      const dy = player.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 150) {
        this.x += (dx / dist) * 180 * dt;
        this.y += (dy / dist) * 180 * dt;
        return;
      }
    }
    this.y += this.vy * dt;
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    let color = '#00f0ff';
    let icon = '❖';

    if (this.type === 'rapid') { color = '#10b981'; icon = '⚡'; }
    else if (this.type === 'triple') { color = '#00f0ff'; icon = '❖'; }
    else if (this.type === 'shield') { color = '#3b82f6'; icon = '🛡'; }
    else if (this.type === 'health') { color = '#22c55e'; icon = '✚'; }
    else if (this.type === 'beam') { color = '#ec4899'; icon = '✦'; }
    else if (this.type === 'emp') { color = '#fbbf24'; icon = '💥'; }

    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(6, 13, 31, 0.85)';
    ctx.fill();

    ctx.font = '14px sans-serif';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icon, 0, 1);

    ctx.restore();
  }
}

/* ============================================================================
   11. ENEMY CLASS (SCALED BY LEVEL PROGRESSION)
   ============================================================================ */
class Enemy {
  constructor(x, y, type = 'drone', level = 1) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.markedForDeletion = false;
    this.shootTimer = Math.random() * 2 + 1;
    this.timeAlive = 0;

    // Difficulty scaling factor
    const scaleFactor = 1 + (level * 0.035);
    const speedScale = 1 + (level * 0.015);

    if (type === 'drone') {
      this.width = 30;
      this.height = 30;
      this.maxHealth = Math.round(25 * scaleFactor);
      this.health = this.maxHealth;
      this.speed = 130 * speedScale;
      this.scoreValue = 100;
      this.creditValue = 10;
      this.color = '#c084fc';
    } else if (type === 'fighter') {
      this.width = 38;
      this.height = 42;
      this.maxHealth = Math.round(50 * scaleFactor);
      this.health = this.maxHealth;
      this.speed = 100 * speedScale;
      this.scoreValue = 220;
      this.creditValue = 25;
      this.color = '#f43f5e';
    } else if (type === 'cruiser') {
      this.width = 62;
      this.height = 56;
      this.maxHealth = Math.round(150 * scaleFactor);
      this.health = this.maxHealth;
      this.speed = 45 * speedScale;
      this.scoreValue = 450;
      this.creditValue = 60;
      this.color = '#eab308';
    } else if (type === 'phantom') {
      this.width = 36;
      this.height = 40;
      this.maxHealth = Math.round(70 * scaleFactor);
      this.health = this.maxHealth;
      this.speed = 110 * speedScale;
      this.scoreValue = 350;
      this.creditValue = 50;
      this.color = '#38bdf8';
      this.cloakTimer = 0;
      this.isCloaked = false;
    }
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.markedForDeletion = true;
      return true;
    }
    return false;
  }

  update(dt, player, projectiles, sound) {
    this.timeAlive += dt;
    this.shootTimer -= dt;

    if (this.type === 'drone') {
      this.y += this.speed * dt;
      this.x += Math.sin(this.timeAlive * 3.5) * 110 * dt;
    } else if (this.type === 'fighter') {
      this.y += this.speed * dt;
      if (player) {
        const dx = player.x - this.x;
        this.x += Math.sign(dx) * 45 * dt;
      }
    } else if (this.type === 'cruiser') {
      this.y += this.speed * dt;
    } else if (this.type === 'phantom') {
      this.cloakTimer += dt;
      if (this.cloakTimer > 2.8) {
        this.isCloaked = !this.isCloaked;
        this.cloakTimer = 0;
      }
      this.y += this.speed * dt;
      this.x += Math.cos(this.timeAlive * 2) * 80 * dt;
    }

    if (this.shootTimer <= 0 && this.y > 40 && this.y < window.innerHeight - 80) {
      if (this.type === 'drone') {
        projectiles.push(new Projectile(this.x, this.y + 14, 0, 220, false, 'enemy_bolt', 15));
        sound.playLaser('enemy');
        this.shootTimer = 2.4 + Math.random() * 1.5;
      } else if (this.type === 'fighter') {
        projectiles.push(new Projectile(this.x - 10, this.y + 18, -25, 260, false, 'enemy_bolt', 18));
        projectiles.push(new Projectile(this.x + 10, this.y + 18, 25, 260, false, 'enemy_bolt', 18));
        sound.playLaser('enemy');
        this.shootTimer = 2.0 + Math.random() * 1.0;
      } else if (this.type === 'cruiser') {
        projectiles.push(new Projectile(this.x, this.y + 24, 0, 200, false, 'boss_orb', 25));
        projectiles.push(new Projectile(this.x - 14, this.y + 24, -75, 190, false, 'boss_orb', 25));
        projectiles.push(new Projectile(this.x + 14, this.y + 24, 75, 190, false, 'boss_orb', 25));
        sound.playLaser('boss_orb');
        this.shootTimer = 2.8 + Math.random() * 1.2;
      } else if (this.type === 'phantom' && !this.isCloaked) {
        projectiles.push(new Projectile(this.x, this.y + 18, 0, 160, false, 'homing', 20));
        sound.playLaser('enemy');
        this.shootTimer = 3.2;
      }
    }
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    if (this.type === 'phantom' && this.isCloaked) {
      ctx.globalAlpha = 0.22;
    }

    ctx.strokeStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2;

    if (this.type === 'drone') {
      ctx.fillStyle = '#4c1d95';
      ctx.beginPath();
      ctx.moveTo(0, 15); ctx.lineTo(13, 0); ctx.lineTo(0, -15); ctx.lineTo(-13, 0); ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#e879f9';
      ctx.beginPath(); ctx.arc(0, 0, 4, 0, Math.PI * 2); ctx.fill();
    } else if (this.type === 'fighter') {
      ctx.fillStyle = '#881337';
      ctx.beginPath();
      ctx.moveTo(0, 20); ctx.lineTo(18, -12); ctx.lineTo(6, -8); ctx.lineTo(0, -18); ctx.lineTo(-6, -8); ctx.lineTo(-18, -12); ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(-3, -2, 6, 8);
    } else if (this.type === 'cruiser') {
      ctx.fillStyle = '#713f12';
      ctx.beginPath();
      ctx.moveTo(0, 26); ctx.lineTo(28, 8); ctx.lineTo(24, -22); ctx.lineTo(-24, -22); ctx.lineTo(-28, 8); ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#facc15';
      ctx.fillRect(-12, -10, 8, 12); ctx.fillRect(4, -10, 8, 12);
    } else if (this.type === 'phantom') {
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(0, 18); ctx.lineTo(16, -16); ctx.lineTo(0, -8); ctx.lineTo(-16, -16); ctx.closePath();
      ctx.fill(); ctx.stroke();
    }
    ctx.restore();
  }
}

/* ============================================================================
   12. SECTOR BOSS CLASS (BUG-PROOF & MULTI-STAGE DEFEAT)
   ============================================================================ */
class Boss {
  constructor(canvas, sectorId = 1) {
    this.canvas = canvas;
    this.sectorId = sectorId;
    const sData = SECTORS_DATA[(sectorId - 1) % SECTORS_DATA.length];
    this.name = sData.bossName;
    this.x = canvas.width / 2;
    this.y = -140;
    this.targetY = 130;
    this.width = sectorId === 10 ? 220 : 160;
    this.height = sectorId === 10 ? 140 : 110;

    // Scaling health
    this.maxHealth = 1000 + (sectorId * 400);
    if (sectorId === 10) this.maxHealth = 7500; // Grand finale boss
    this.health = this.maxHealth;
    this.phase = 1;

    // State flags (Zero-glitch guarantee)
    this.isAlive = true;
    this.isDefeated = false;
    this.hasDied = false;
    this.defeatTimer = 0;
    this.explosionSoundTimer = 0;

    // Attack state
    this.attackTimer = 1.8;
    this.specialTimer = 5.0;
    this.beamCharging = false;
    this.beamChargeTimer = 0;
    this.beamFiring = false;
    this.beamTimer = 0;
    this.deathBeamX = 0;
    this.timeAlive = 0;
    this.turretAngle = 0;
  }

  takeDamage(amount) {
    if (!this.isAlive || this.isDefeated || this.hasDied) return false;

    this.health -= amount;

    const hpRatio = this.health / this.maxHealth;
    if (hpRatio <= 0.65 && this.phase === 1) {
      this.phase = 2;
    } else if (hpRatio <= 0.30 && this.phase === 2) {
      this.phase = 3;
    }

    if (this.health <= 0) {
      this.health = 0;
      this.isAlive = false;
      this.isDefeated = true;
      this.hasDied = true;
      this.defeatTimer = 2.8; // Controlled 2.8s explosion sequence
      this.beamCharging = false;
      this.beamFiring = false; // Stop beam immediately
      return true; // Exactly once
    }
    return false;
  }

  update(dt, player, projectiles, sound, particles) {
    this.timeAlive += dt;
    this.turretAngle += 1.6 * dt;

    // 1. Entrance descent
    if (this.y < this.targetY) {
      this.y += 75 * dt;
      return;
    }

    // 2. Controlled Defeat Sequence (BUG-FIX: Timed explosions, no audio flood)
    if (this.isDefeated) {
      this.defeatTimer -= dt;
      this.explosionSoundTimer -= dt;

      // Spaced explosion particle bursts
      const rx = this.x + (Math.random() - 0.5) * this.width;
      const ry = this.y + (Math.random() - 0.5) * this.height;
      particles.spawnExplosion(rx, ry, 'large', '#fbbf24');

      if (this.explosionSoundTimer <= 0) {
        sound.playExplosion('large');
        this.explosionSoundTimer = 0.22; // Throttled to ~4.5 sound triggers/sec
      }
      return;
    }

    // 3. Horizontal hovering maneuver
    this.x += Math.sin(this.timeAlive * 0.9) * 95 * dt;

    // 4. Attack Loops
    this.attackTimer -= dt;
    this.specialTimer -= dt;

    if (this.attackTimer <= 0) {
      if (this.phase === 1) {
        projectiles.push(new Projectile(this.x - 45, this.y + 35, 0, 240, false, 'boss_orb', 20));
        projectiles.push(new Projectile(this.x + 45, this.y + 35, 0, 240, false, 'boss_orb', 20));
        sound.playLaser('boss_orb');
        this.attackTimer = 1.3;
      } else if (this.phase === 2) {
        const angles = [-0.6, -0.3, 0, 0.3, 0.6];
        angles.forEach(ang => {
          const vx = Math.sin(ang) * 220;
          const vy = Math.cos(ang) * 220;
          projectiles.push(new Projectile(this.x, this.y + 45, vx, vy, false, 'boss_orb', 22));
        });
        sound.playLaser('boss_orb');
        this.attackTimer = 1.5;
      } else if (this.phase === 3) {
        for (let i = 0; i < 8; i++) {
          const ang = this.turretAngle + (i * Math.PI) / 4;
          const vx = Math.cos(ang) * 190;
          const vy = Math.sin(ang) * 190;
          projectiles.push(new Projectile(this.x, this.y + 20, vx, vy, false, 'boss_orb', 18));
        }
        sound.playLaser('boss_orb');
        this.attackTimer = 1.1;
      }
    }

    // Special Death Beam
    if (this.phase >= 2) {
      if (!this.beamCharging && !this.beamFiring && this.specialTimer <= 0) {
        this.beamCharging = true;
        this.beamChargeTimer = 1.6;
        this.deathBeamX = player ? player.x : this.x;
        sound.playBossWarning();
      }

      if (this.beamCharging) {
        this.beamChargeTimer -= dt;
        if (player) {
          this.deathBeamX += (player.x - this.deathBeamX) * 2.5 * dt;
        }
        if (this.beamChargeTimer <= 0) {
          this.beamCharging = false;
          this.beamFiring = true;
          this.beamTimer = 1.4;
          sound.playHyperBeam();
        }
      }

      if (this.beamFiring) {
        this.beamTimer -= dt;
        if (player && player.isAlive) {
          if (Math.abs(player.x - this.deathBeamX) < 32 && player.y > this.y) {
            player.takeDamage(45 * dt * 3);
          }
        }
        if (this.beamTimer <= 0) {
          this.beamFiring = false;
          this.specialTimer = 7.0;
        }
      }
    }
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    ctx.lineWidth = 3;
    ctx.shadowColor = this.phase === 3 ? '#ef4444' : '#a855f7';
    ctx.shadowBlur = 20;

    // Heavy Armor Wings
    ctx.fillStyle = '#1e1b4b';
    ctx.strokeStyle = '#c084fc';
    ctx.beginPath();
    ctx.moveTo(0, this.height * 0.45);
    ctx.lineTo(this.width * 0.5, -this.height * 0.1);
    ctx.lineTo(this.width * 0.45, -this.height * 0.45);
    ctx.lineTo(-this.width * 0.45, -this.height * 0.45);
    ctx.lineTo(-this.width * 0.5, -this.height * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Central Citadel
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#f43f5e';
    ctx.beginPath();
    ctx.moveTo(0, this.height * 0.5);
    ctx.lineTo(this.width * 0.22, 0);
    ctx.lineTo(this.width * 0.18, -this.height * 0.38);
    ctx.lineTo(-this.width * 0.18, -this.height * 0.38);
    ctx.lineTo(-this.width * 0.22, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Pulsing Core
    const coreGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, 22);
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(0.5, this.phase === 3 ? '#ef4444' : '#ec4899');
    coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(0, 4, 22, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Laser column
    if (this.beamCharging && !this.isDefeated) {
      ctx.save();
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
      ctx.setLineDash([8, 8]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(this.deathBeamX, this.y + 30);
      ctx.lineTo(this.deathBeamX, this.canvas.height);
      ctx.stroke();
      ctx.restore();
    }

    if (this.beamFiring && !this.isDefeated) {
      ctx.save();
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 30;
      ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
      ctx.fillRect(this.deathBeamX - 30, this.y + 35, 60, this.canvas.height);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(this.deathBeamX - 12, this.y + 35, 24, this.canvas.height);
      ctx.restore();
    }
  }
}

/* ============================================================================
   13. MASTER GAME ORCHESTRATOR & PROGRESSION CONTROLLER
   ============================================================================ */
class NebulaGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Subsystems
    this.sound = new SoundEngine();
    this.env = new SpaceEnvironment(this.canvas);
    this.particles = new ParticleSystem(this.canvas);
    this.player = new Player(this.canvas);

    // Save Data Management (Version 2)
    this.saveData = this.loadSaveData();

    // Entities
    this.projectiles = [];
    this.enemies = [];
    this.powerups = [];
    this.currentBoss = null;
    this.bossSpawnTimeout = null;

    // Game state
    this.state = 'menu'; // 'menu', 'playing', 'paused', 'gameover', 'victory', 'level_clear'
    this.currentLevel = this.saveData.currentLevel || 1;
    this.score = 0;
    this.enemiesKilled = 0;
    this.bossesKilled = 0;
    this.shotsFired = 0;
    this.shotsHit = 0;
    this.levelCreditsEarned = 0;

    // Combo system
    this.combo = 1;
    this.maxCombo = 1;
    this.comboTimer = 0;
    this.comboMaxTime = 3.2;

    // Wave spawning & director
    this.waveState = 'spawning'; // 'spawning', 'boss_alert', 'boss_active', 'cleared'
    this.waveEnemiesTotal = 10;
    this.waveEnemiesSpawned = 0;
    this.spawnTimer = 1.0;
    this.waveTransitionTimer = 0;

    // Screen Shake & Freeze Frame
    this.shakeDuration = 0;
    this.shakeIntensity = 0;
    this.freezeTimer = 0;

    // Settings
    this.settings = {
      screenShake: true,
      autoFire: false,
      mouseControl: false,
      particleQuality: 'high'
    };

    // Input state
    this.input = {
      left: false, right: false, up: false, down: false,
      shoot: false, joyX: 0, joyY: 0,
      mouseControl: false, mouseX: null, mouseY: null
    };

    this.lastTime = performance.now();

    // Initialize UI and DOM
    this.initDOM();
    this.initEvents();
    this.applyPlayerShipSelection();
    this.resizeCanvas();

    requestAnimationFrame((t) => this.loop(t));
  }

  /* ---------------- SAVE / LOAD SYSTEM ---------------- */

  loadSaveData() {
    const defaultData = {
      version: 2,
      credits: 0,
      unlockedLevel: 1,
      currentLevel: 1,
      levelStars: {},
      ownedShips: ['starfang'],
      selectedShip: 'starfang',
      upgrades: { damage: 0, fireRate: 0, speed: 0, health: 0, shield: 0, beam: 0, special: 0 },
      achievements: {},
      dailyReward: { lastClaimDate: null, streak: 0 },
      highScore: 0,
      stats: { totalKills: 0, bossesKilled: 0, creditsEarned: 0, shotsFired: 0, shotsHit: 0 }
    };

    try {
      const saved = localStorage.getItem('nebula_save_v2');
      if (saved) {
        return Object.assign(defaultData, JSON.parse(saved));
      }
      // Migrate from old version if present
      const oldHigh = localStorage.getItem('nebula_highscore');
      if (oldHigh) defaultData.highScore = parseInt(oldHigh, 10);
      const oldWave = localStorage.getItem('nebula_highwave');
      if (oldWave) defaultData.unlockedLevel = Math.max(1, parseInt(oldWave, 10));
    } catch (e) {
      console.warn('Save data load fallback:', e);
    }
    return defaultData;
  }

  saveGameData() {
    try {
      localStorage.setItem('nebula_save_v2', JSON.stringify(this.saveData));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }

  applyPlayerShipSelection() {
    this.player.setShip(this.saveData.selectedShip, this.saveData.upgrades);
  }

  addCredits(amount) {
    this.saveData.credits += amount;
    this.saveData.stats.creditsEarned = (this.saveData.stats.creditsEarned || 0) + amount;
    this.levelCreditsEarned += amount;
    this.saveGameData();
    this.syncCreditsDisplay();

    // Check millionaire achievement
    if (this.saveData.stats.creditsEarned >= 25000) {
      this.unlockAchievement('millionaire');
    }
  }

  syncCreditsDisplay() {
    const crText = this.saveData.credits.toLocaleString();
    if (this.dom.hudCredits) this.dom.hudCredits.textContent = `⬡ ${crText}`;
    if (this.dom.menuCreditsVal) this.dom.menuCreditsVal.textContent = crText;
    const hCr = document.getElementById('hangarCreditsVal');
    if (hCr) hCr.textContent = `⬡ ${crText} CR`;
    const wCr = document.getElementById('workshopCreditsVal');
    if (wCr) wCr.textContent = `⬡ ${crText} CR`;
  }

  unlockAchievement(achId) {
    if (this.saveData.achievements[achId]) return;
    const ach = ACHIEVEMENTS_DATA.find(a => a.id === achId);
    if (!ach) return;

    this.saveData.achievements[achId] = true;
    this.addCredits(ach.reward);
    this.sound.playPowerUp();

    // Show toast
    if (this.dom.toastNotification && this.dom.toastText) {
      this.dom.toastText.textContent = `ACHIEVEMENT: ${ach.name} (+${ach.reward} CR)`;
      this.dom.toastNotification.classList.add('active');
      setTimeout(() => {
        if (this.dom.toastNotification) this.dom.toastNotification.classList.remove('active');
      }, 3500);
    }
  }

  /* ---------------- DOM & EVENT REGISTRATION ---------------- */

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.env.resize();
  }

  initDOM() {
    this.dom = {
      hud: document.getElementById('gameHud'),
      hullBar: document.getElementById('hullBar'),
      hullGhost: document.getElementById('hullGhost'),
      hullText: document.getElementById('hullText'),
      shieldBar: document.getElementById('shieldBar'),
      shieldText: document.getElementById('shieldText'),
      beamBar: document.getElementById('beamBar'),
      beamText: document.getElementById('beamText'),
      abilityBar: document.getElementById('abilityBar'),
      abilityText: document.getElementById('abilityText'),
      hudAbilityLabel: document.getElementById('hudAbilityLabel'),
      waveNumber: document.getElementById('waveNumber'),
      hudSectorTag: document.getElementById('hudSectorTag'),
      enemiesRemaining: document.getElementById('enemiesRemaining'),
      scoreDisplay: document.getElementById('scoreDisplay'),
      hudCredits: document.getElementById('hudCreditsDisplay'),
      comboMultiplier: document.getElementById('comboMultiplier'),
      comboTimerBar: document.getElementById('comboTimerBar'),
      powerupBuffs: document.getElementById('powerupBuffs'),
      bossHud: document.getElementById('bossHud'),
      bossName: document.getElementById('bossName'),
      bossPhase: document.getElementById('bossPhase'),
      bossBarFill: document.getElementById('bossBarFill'),
      bossWarningOverlay: document.getElementById('bossWarningOverlay'),
      bossWarningName: document.getElementById('bossWarningName'),
      damageVignette: document.getElementById('damageVignette'),
      screenFlash: document.getElementById('screenFlash'),
      toastNotification: document.getElementById('toastNotification'),
      toastText: document.getElementById('toastText'),

      // Overlays
      mainMenu: document.getElementById('mainMenuScreen'),
      epicVictoryScreen: document.getElementById('epicVictoryScreen'),
      levelClearedScreen: document.getElementById('levelClearedScreen'),
      levelSelectModal: document.getElementById('levelSelectModal'),
      hangarModal: document.getElementById('hangarModal'),
      upgradesModal: document.getElementById('upgradesModal'),
      missionsModal: document.getElementById('missionsModal'),
      dailyRewardModal: document.getElementById('dailyRewardModal'),
      campaignCompleteScreen: document.getElementById('campaignCompleteScreen'),
      howToPlay: document.getElementById('howToPlayModal'),
      settingsModal: document.getElementById('settingsModal'),
      pauseScreen: document.getElementById('pauseScreen'),
      gameOverScreen: document.getElementById('gameOverScreen'),

      // Menu dynamic displays
      menuCreditsVal: document.getElementById('menuCreditsVal'),
      menuHighScore: document.getElementById('menuHighScore'),
      menuHighWave: document.getElementById('menuHighWave'),
      menuActiveShip: document.getElementById('menuActiveShip')
    };

    this.syncCreditsDisplay();
    if (this.dom.menuHighScore) this.dom.menuHighScore.textContent = this.saveData.highScore.toLocaleString();
    if (this.dom.menuHighWave) this.dom.menuHighWave.textContent = `LEVEL ${this.saveData.unlockedLevel} / 100`;
    if (this.dom.menuActiveShip) this.dom.menuActiveShip.textContent = this.saveData.selectedShip.toUpperCase();
  }

  initEvents() {
    window.addEventListener('resize', () => this.resizeCanvas());

    // Keyboard controls
    window.addEventListener('keydown', (e) => {
      this.sound.resume();

      if (e.code === 'KeyW' || e.code === 'ArrowUp') this.input.up = true;
      if (e.code === 'KeyS' || e.code === 'ArrowDown') this.input.down = true;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.input.left = true;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') this.input.right = true;
      if (e.code === 'Space') {
        this.input.shoot = true;
        e.preventDefault();
      }
      if (e.code === 'KeyC') {
        this.player.triggerAbility(this);
      }
      if (e.code === 'KeyE' || e.code === 'KeyX') {
        this.fireHyperBeam();
      }
      if (e.code === 'Escape' || e.code === 'KeyP') {
        this.togglePause();
      }
      if (e.code === 'KeyM') {
        this.toggleMute();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'KeyW' || e.code === 'ArrowUp') this.input.up = false;
      if (e.code === 'KeyS' || e.code === 'ArrowDown') this.input.down = false;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.input.left = false;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') this.input.right = false;
      if (e.code === 'Space') this.input.shoot = false;
    });

    // Mouse controls
    window.addEventListener('mousemove', (e) => {
      if (this.input.mouseControl) {
        this.input.mouseX = e.clientX;
        this.input.mouseY = e.clientY;
      }
    });

    this.canvas.addEventListener('mousedown', (e) => {
      this.sound.resume();
      if (e.button === 0) this.input.shoot = true;
      if (e.button === 2) {
        e.preventDefault();
        this.fireHyperBeam();
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.input.shoot = false;
    });

    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    // Main Menu Buttons
    document.getElementById('btnPlayGame').addEventListener('click', () => {
      this.sound.playUiBeep('high');
      this.startLevel(this.saveData.unlockedLevel);
    });

    document.getElementById('btnLevelSelect').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.openLevelSelect();
    });

    document.getElementById('closeLevelSelect').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.dom.levelSelectModal.classList.remove('active');
    });

    document.getElementById('btnCloseLevelSelect').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.dom.levelSelectModal.classList.remove('active');
    });

    document.getElementById('btnHangar').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.openHangar();
    });

    document.getElementById('closeHangar').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.dom.hangarModal.classList.remove('active');
    });

    document.getElementById('btnUpgrades').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.openUpgrades();
    });

    document.getElementById('closeUpgrades').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.dom.upgradesModal.classList.remove('active');
    });

    document.getElementById('btnCloseUpgrades').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.dom.upgradesModal.classList.remove('active');
    });

    document.getElementById('btnMissions').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.openMissions();
    });

    document.getElementById('closeMissions').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.dom.missionsModal.classList.remove('active');
    });

    document.getElementById('btnCloseMissions').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.dom.missionsModal.classList.remove('active');
    });

    document.getElementById('btnOpenDaily').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.openDailyRewards();
    });

    document.getElementById('closeDailyReward').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.dom.dailyRewardModal.classList.remove('active');
    });

    document.getElementById('btnClaimDaily').addEventListener('click', () => {
      this.claimDailyReward();
    });

    document.getElementById('btnHowToPlay').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.dom.howToPlay.classList.add('active');
    });

    document.getElementById('closeHowToPlay').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.dom.howToPlay.classList.remove('active');
    });

    document.getElementById('btnBriefingReady').addEventListener('click', () => {
      this.sound.playUiBeep('high');
      this.dom.howToPlay.classList.remove('active');
      this.startLevel(this.saveData.unlockedLevel);
    });

    document.getElementById('btnSettings').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.dom.settingsModal.classList.add('active');
    });

    document.getElementById('closeSettings').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.dom.settingsModal.classList.remove('active');
    });

    document.getElementById('btnSaveSettings').addEventListener('click', () => {
      this.sound.playUiBeep('high');
      this.dom.settingsModal.classList.remove('active');
    });

    // Pause & Quick HUD buttons
    document.getElementById('hudPauseBtn').addEventListener('click', () => this.togglePause());
    document.getElementById('hudMuteBtn').addEventListener('click', () => this.toggleMute());
    document.getElementById('btnResumeGame').addEventListener('click', () => this.resumeGame());
    document.getElementById('btnRestartFromPause').addEventListener('click', () => {
      this.dom.pauseScreen.classList.remove('active');
      this.startLevel(this.currentLevel);
    });
    document.getElementById('btnQuitToMenu').addEventListener('click', () => this.returnToMenu());

    // Game Over & Results
    document.getElementById('btnRetryGame').addEventListener('click', () => this.startLevel(this.currentLevel));
    document.getElementById('btnGoMenu').addEventListener('click', () => this.returnToMenu());

    // Level Clear Minor Banner buttons
    document.getElementById('btnLcNextLevel').addEventListener('click', () => {
      this.dom.levelClearedScreen.classList.remove('active');
      this.startLevel(this.currentLevel + 1);
    });
    document.getElementById('btnLcMenu').addEventListener('click', () => {
      this.dom.levelClearedScreen.classList.remove('active');
      this.returnToMenu();
    });

    // EPIC VICTORY SCREEN BUTTONS (TOP PRIORITY)
    document.getElementById('btnVicNextLevel').addEventListener('click', () => {
      this.sound.playUiBeep('high');
      this.dom.epicVictoryScreen.classList.remove('active');
      if (this.currentLevel >= 100) {
        this.openCampaignComplete();
      } else {
        this.startLevel(this.currentLevel + 1);
      }
    });

    document.getElementById('btnVicUpgrades').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.dom.epicVictoryScreen.classList.remove('active');
      this.openUpgrades();
    });

    document.getElementById('btnVicMainMenu').addEventListener('click', () => {
      this.sound.playUiBeep('low');
      this.dom.epicVictoryScreen.classList.remove('active');
      this.returnToMenu();
    });

    // Campaign Complete (Level 100)
    document.getElementById('btnCcEndless').addEventListener('click', () => {
      this.dom.campaignCompleteScreen.classList.remove('active');
      this.startLevel(100);
    });
    document.getElementById('btnCcMenu').addEventListener('click', () => {
      this.dom.campaignCompleteScreen.classList.remove('active');
      this.returnToMenu();
    });

    // Touch mobile controls
    const touchAbilityBtn = document.getElementById('touchAbilityBtn');
    if (touchAbilityBtn) {
      touchAbilityBtn.addEventListener('touchstart', (e) => {
        this.player.triggerAbility(this);
        e.preventDefault();
      }, { passive: false });
    }

    const fireBtn = document.getElementById('touchFireBtn');
    if (fireBtn) {
      fireBtn.addEventListener('touchstart', (e) => {
        this.sound.resume();
        this.input.shoot = true;
        e.preventDefault();
      }, { passive: false });
      fireBtn.addEventListener('touchend', (e) => {
        this.input.shoot = false;
        e.preventDefault();
      });
    }

    const specialBtn = document.getElementById('touchSpecialBtn');
    if (specialBtn) {
      specialBtn.addEventListener('touchstart', (e) => {
        this.sound.resume();
        this.fireHyperBeam();
        e.preventDefault();
      }, { passive: false });
    }

    // Reset Data
    document.getElementById('btnResetData').addEventListener('click', () => {
      if (confirm('DANGER: Reset all 100-level progress, purchased ships, credits, and upgrades?')) {
        localStorage.removeItem('nebula_save_v2');
        localStorage.removeItem('nebula_highscore');
        localStorage.removeItem('nebula_highwave');
        location.reload();
      }
    });

    // Audio Sliders
    const masterSlider = document.getElementById('masterVolume');
    const musicSlider = document.getElementById('musicVolume');
    const sfxSlider = document.getElementById('sfxVolume');
    const muteToggle = document.getElementById('muteToggle');

    if (masterSlider) {
      masterSlider.addEventListener('input', (e) => {
        this.sound.masterVol = e.target.value / 100;
        this.sound.updateVolumes();
        document.getElementById('masterVolumeVal').textContent = `${e.target.value}%`;
      });
    }
    if (musicSlider) {
      musicSlider.addEventListener('input', (e) => {
        this.sound.musicVol = e.target.value / 100;
        this.sound.updateVolumes();
        document.getElementById('musicVolumeVal').textContent = `${e.target.value}%`;
      });
    }
    if (sfxSlider) {
      sfxSlider.addEventListener('input', (e) => {
        this.sound.sfxVol = e.target.value / 100;
        this.sound.updateVolumes();
        document.getElementById('sfxVolumeVal').textContent = `${e.target.value}%`;
      });
    }
    if (muteToggle) {
      muteToggle.addEventListener('change', (e) => {
        this.sound.setMute(e.target.checked);
      });
    }
  }

  /* ---------------- 100-LEVEL CAMPAIGN & LEVEL SELECT ---------------- */

  openLevelSelect(defaultSector = null) {
    const sectorId = defaultSector || Math.min(10, Math.ceil(this.saveData.unlockedLevel / 10));
    this.renderSectorTabs(sectorId);
    this.renderSectorLevels(sectorId);
    this.dom.levelSelectModal.classList.add('active');
  }

  renderSectorTabs(activeSectorId) {
    const bar = document.getElementById('sectorTabsBar');
    if (!bar) return;

    let html = '';
    SECTORS_DATA.forEach(sec => {
      const isActive = sec.id === activeSectorId ? 'active' : '';
      html += `<button class="sector-tab-btn ${isActive}" data-sector="${sec.id}">SECTOR ${sec.id}</button>`;
    });
    bar.innerHTML = html;

    bar.querySelectorAll('.sector-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const secId = parseInt(e.currentTarget.getAttribute('data-sector'), 10);
        this.renderSectorTabs(secId);
        this.renderSectorLevels(secId);
      });
    });
  }

  renderSectorLevels(sectorId) {
    const sData = SECTORS_DATA.find(s => s.id === sectorId) || SECTORS_DATA[0];

    document.getElementById('sectorBadge').textContent = `SECTOR ${String(sData.id).padStart(2, '0')}`;
    document.getElementById('sectorTitle').textContent = sData.name;
    document.getElementById('sectorDesc').textContent = sData.description;

    const startLvl = (sectorId - 1) * 10 + 1;
    const endLvl = sectorId * 10;
    let clearedCount = 0;

    const grid = document.getElementById('levelsGrid');
    if (!grid) return;

    let html = '';
    for (let lvl = startLvl; lvl <= endLvl; lvl++) {
      const isUnlocked = lvl <= this.saveData.unlockedLevel;
      const isCompleted = lvl < this.saveData.unlockedLevel;
      const isBoss = lvl % 10 === 0;

      if (isCompleted) clearedCount++;

      let cardClass = 'level-card';
      if (!isUnlocked) cardClass += ' locked';
      if (isCompleted) cardClass += ' completed';
      if (isBoss) cardClass += ' boss-level';

      const stars = this.saveData.levelStars[lvl] || (isCompleted ? 3 : 0);
      const starStr = isCompleted ? '★'.repeat(stars) + '☆'.repeat(3 - stars) : (isBoss ? '⚠ BOSS' : 'SECTOR FLIGHT');

      html += `
        <div class="${cardClass}" data-level="${lvl}">
          <span class="level-card-num">${String(lvl).padStart(2, '0')}</span>
          <span class="level-card-status">${isUnlocked ? (isBoss ? 'BOSS ENCOUNTER' : 'READY') : 'LOCKED'}</span>
          <span class="level-card-stars">${starStr}</span>
        </div>`;
    }
    grid.innerHTML = html;

    document.getElementById('sectorProgressText').textContent = `${clearedCount} / 10 CLEARED`;

    grid.querySelectorAll('.level-card:not(.locked)').forEach(card => {
      card.addEventListener('click', (e) => {
        const lvl = parseInt(e.currentTarget.getAttribute('data-level'), 10);
        this.dom.levelSelectModal.classList.remove('active');
        this.startLevel(lvl);
      });
    });
  }

  /* ---------------- SPACESHIP GARAGE (HANGAR) ---------------- */

  openHangar() {
    this.selectedHangarShip = this.saveData.selectedShip;
    this.renderHangarView();
    this.dom.hangarModal.classList.add('active');
  }

  renderHangarView() {
    const ship = SHIPS_DATA.find(s => s.id === this.selectedHangarShip) || SHIPS_DATA[0];
    const isOwned = this.saveData.ownedShips.includes(ship.id);
    const isEquipped = this.saveData.selectedShip === ship.id;

    // Info
    document.getElementById('shipPreviewName').textContent = ship.name;
    document.getElementById('shipPreviewClass').textContent = ship.className;
    document.getElementById('shipPreviewDesc').textContent = ship.desc;

    // Stat meters
    document.getElementById('shipStatDamage').style.width = `${Math.min(100, ship.damage * 50)}%`;
    document.getElementById('shipStatFireRate').style.width = `${Math.min(100, ship.fireRate * 50)}%`;
    document.getElementById('shipStatSpeed').style.width = `${Math.min(100, ship.speed * 50)}%`;
    document.getElementById('shipStatDefense').style.width = `${Math.min(100, ship.defense * 50)}%`;

    // Special Ability
    document.getElementById('shipPreviewAbility').textContent = ship.abilityName;
    document.getElementById('shipPreviewAbilityDesc').textContent = ship.abilityDesc;

    // Action button
    const actions = document.getElementById('hangarActionArea');
    if (isEquipped) {
      actions.innerHTML = `<button class="btn btn-secondary" style="width: 100%; border-color: var(--cyan-glow);" disabled>✓ CURRENTLY EQUIPPED</button>`;
    } else if (isOwned) {
      actions.innerHTML = `<button class="btn btn-primary" id="btnSelectShip" style="width: 100%;">DEPLOY SPACECRAFT</button>`;
    } else {
      const canAfford = this.saveData.credits >= ship.price;
      actions.innerHTML = `
        <button class="btn btn-primary" id="btnBuyShip" style="width: 100%;" ${!canAfford ? 'disabled' : ''}>
          BUY FOR ⬡ ${ship.price.toLocaleString()} CR
        </button>`;
    }

    // Attach buy/select handlers
    const buyBtn = document.getElementById('btnBuyShip');
    if (buyBtn) {
      buyBtn.addEventListener('click', () => {
        if (this.saveData.credits >= ship.price) {
          this.saveData.credits -= ship.price;
          this.saveData.ownedShips.push(ship.id);
          this.saveData.selectedShip = ship.id;
          this.saveGameData();
          this.applyPlayerShipSelection();
          this.sound.playPurchase();
          this.syncCreditsDisplay();
          this.renderHangarView();

          if (this.saveData.ownedShips.length >= 3) this.unlockAchievement('fleet_collector');
          if (this.saveData.ownedShips.length >= 6) this.unlockAchievement('armada_admiral');
        }
      });
    }

    const selectBtn = document.getElementById('btnSelectShip');
    if (selectBtn) {
      selectBtn.addEventListener('click', () => {
        this.saveData.selectedShip = ship.id;
        this.saveGameData();
        this.applyPlayerShipSelection();
        this.sound.playPurchase();
        if (this.dom.menuActiveShip) this.dom.menuActiveShip.textContent = ship.name;
        this.renderHangarView();
      });
    }

    // Carousel thumbnails
    const selector = document.getElementById('hangarShipSelector');
    let thumbHtml = '';
    SHIPS_DATA.forEach(s => {
      const owned = this.saveData.ownedShips.includes(s.id);
      const active = s.id === this.selectedHangarShip ? 'active' : '';
      const lockedClass = !owned ? 'locked' : '';
      thumbHtml += `
        <div class="hangar-ship-thumb ${active} ${lockedClass}" data-ship="${s.id}">
          <span class="thumb-name">${s.name}</span>
          <span class="thumb-status">${owned ? 'OWNED' : `⬡ ${s.price.toLocaleString()}`}</span>
        </div>`;
    });
    selector.innerHTML = thumbHtml;

    selector.querySelectorAll('.hangar-ship-thumb').forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        this.selectedHangarShip = e.currentTarget.getAttribute('data-ship');
        this.sound.playUiBeep('low');
        this.renderHangarView();
      });
    });

    // Animate preview canvas
    this.renderHangarCanvas(ship);
  }

  renderHangarCanvas(ship) {
    const canvas = document.getElementById('hangarShipCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(1.7, 1.7);
    Player.drawShipModel(ctx, ship.id, ship);
    ctx.restore();
  }

  /* ---------------- SHIP UPGRADES WORKSHOP ---------------- */

  openUpgrades() {
    this.renderUpgradesView();
    this.dom.upgradesModal.classList.add('active');
  }

  renderUpgradesView() {
    const grid = document.getElementById('upgradesGrid');
    if (!grid) return;

    let html = '';
    UPGRADE_TRACKS.forEach(track => {
      const currentTier = this.saveData.upgrades[track.id] || 0;
      const isMaxed = currentTier >= 10;
      const cost = Math.round(track.baseCost * Math.pow(1.42, currentTier));
      const canAfford = this.saveData.credits >= cost && !isMaxed;

      let pipsHtml = '';
      for (let i = 1; i <= 10; i++) {
        pipsHtml += `<div class="upg-pip ${i <= currentTier ? 'filled' : ''}"></div>`;
      }

      html += `
        <div class="upgrade-card">
          <div class="upg-header">
            <span class="upg-title">${track.name}</span>
            <span class="upg-level">TIER ${currentTier} / 10</span>
          </div>
          <div class="upg-pips-track">${pipsHtml}</div>
          <div class="upg-details-row">
            <span>${track.desc}</span>
          </div>
          <div class="upg-action-row">
            <span class="upg-cost">${isMaxed ? 'MAX TIER' : `⬡ ${cost.toLocaleString()} CR`}</span>
            <button class="btn btn-primary btn-upg-action" data-track="${track.id}" data-cost="${cost}" ${!canAfford ? 'disabled' : ''}>
              ${isMaxed ? 'MAXED' : 'UPGRADE'}
            </button>
          </div>
        </div>`;
    });

    grid.innerHTML = html;

    grid.querySelectorAll('.btn-upg-action:not([disabled])').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const trackId = e.currentTarget.getAttribute('data-track');
        const cost = parseInt(e.currentTarget.getAttribute('data-cost'), 10);
        if (this.saveData.credits >= cost) {
          this.saveData.credits -= cost;
          this.saveData.upgrades[trackId] = (this.saveData.upgrades[trackId] || 0) + 1;
          this.saveGameData();
          this.applyPlayerShipSelection();
          this.sound.playUpgrade();
          this.syncCreditsDisplay();
          this.renderUpgradesView();
        }
      });
    });
  }

  /* ---------------- MISSIONS & ACHIEVEMENTS ---------------- */

  openMissions() {
    this.renderAchievementsList();
    this.dom.missionsModal.classList.add('active');

    document.getElementById('tabBtnAchievements').onclick = () => {
      document.getElementById('tabBtnAchievements').classList.add('active');
      document.getElementById('tabBtnMissions').classList.remove('active');
      this.renderAchievementsList();
    };

    document.getElementById('tabBtnMissions').onclick = () => {
      document.getElementById('tabBtnMissions').classList.add('active');
      document.getElementById('tabBtnAchievements').classList.remove('active');
      this.renderMissionsList();
    };
  }

  renderAchievementsList() {
    const container = document.getElementById('missionsContainer');
    let html = '';
    ACHIEVEMENTS_DATA.forEach(ach => {
      const isDone = !!this.saveData.achievements[ach.id];
      html += `
        <div class="achievement-row ${isDone ? 'completed' : ''}">
          <div class="achieve-info">
            <strong>${ach.name} ${isDone ? '✓' : ''}</strong>
            <p>${ach.desc}</p>
          </div>
          <span class="achieve-reward">+${ach.reward.toLocaleString()} CR</span>
        </div>`;
    });
    container.innerHTML = html;
  }

  renderMissionsList() {
    const container = document.getElementById('missionsContainer');
    const missions = [
      { name: 'Sector Patrol', desc: 'Neutralize 30 enemy ships in any level.', reward: 500, done: this.saveData.stats.totalKills >= 30 },
      { name: 'Boss Executioner', desc: 'Eliminate 3 Sector Bosses.', reward: 1500, done: this.saveData.stats.bossesKilled >= 3 },
      { name: 'Sharp Shooter', desc: 'Achieve combat accuracy above 65%.', reward: 800, done: (this.shotsFired > 30 && (this.shotsHit / this.shotsFired) >= 0.65) }
    ];

    let html = '';
    missions.forEach(m => {
      html += `
        <div class="mission-row ${m.done ? 'completed' : ''}">
          <div class="achieve-info">
            <strong>${m.name} ${m.done ? '✓' : ''}</strong>
            <p>${m.desc}</p>
          </div>
          <span class="achieve-reward">+${m.reward} CR</span>
        </div>`;
    });
    container.innerHTML = html;
  }

  /* ---------------- DAILY REWARDS SYSTEM ---------------- */

  openDailyRewards() {
    const rewards = [250, 500, 1000, 1500, 2500, 3500, 5000];
    const todayStr = new Date().toISOString().split('T')[0];
    const lastClaim = this.saveData.dailyReward.lastClaimDate;
    const canClaim = lastClaim !== todayStr;

    const container = document.getElementById('dailyCardsContainer');
    let html = '';
    for (let i = 0; i < 7; i++) {
      const streakIdx = this.saveData.dailyReward.streak % 7;
      const isCurrent = i === streakIdx;
      const isClaimed = i < streakIdx || (!canClaim && i === streakIdx);

      html += `
        <div class="daily-card ${isCurrent && canClaim ? 'active-day' : ''} ${isClaimed ? 'claimed' : ''}">
          <span class="daily-day-label">DAY ${i + 1}</span>
          <span class="daily-reward-val">⬡ ${rewards[i]}</span>
        </div>`;
    }
    container.innerHTML = html;

    const claimBtn = document.getElementById('btnClaimDaily');
    const note = document.getElementById('dailyTimerNote');
    if (canClaim) {
      claimBtn.disabled = false;
      claimBtn.textContent = 'CLAIM SUPPLY CRATE';
      note.textContent = 'SUPPLY CRATE AWAITING AUTHORIZATION!';
      note.style.color = 'var(--gold-glow)';
    } else {
      claimBtn.disabled = true;
      claimBtn.textContent = 'SUPPLIES CLAIMED TODAY';
      note.textContent = 'Next supply shipment arrives tomorrow.';
      note.style.color = '#94a3b8';
    }

    this.dom.dailyRewardModal.classList.add('active');
  }

  claimDailyReward() {
    const rewards = [250, 500, 1000, 1500, 2500, 3500, 5000];
    const streakIdx = this.saveData.dailyReward.streak % 7;
    const amount = rewards[streakIdx];
    const todayStr = new Date().toISOString().split('T')[0];

    this.saveData.dailyReward.lastClaimDate = todayStr;
    this.saveData.dailyReward.streak += 1;
    this.addCredits(amount);
    this.sound.playPowerUp();

    this.openDailyRewards();
  }

  /* ---------------- COMBAT & WEAPON METHODS ---------------- */

  firePlayerLasers() {
    if (!this.player.canShoot()) return;

    this.shotsFired++;
    const px = this.player.x;
    const py = this.player.y;
    const upgDmg = 1 + (this.saveData.upgrades.damage || 0) * 0.10;
    const dmg = Math.round(24 * this.player.shipData.damage * upgDmg);

    if (this.player.tripleShot) {
      this.projectiles.push(new Projectile(px - 16, py - 18, -45, -680, true, 'triple', dmg));
      this.projectiles.push(new Projectile(px, py - 24, 0, -720, true, 'triple', Math.round(dmg * 1.15)));
      this.projectiles.push(new Projectile(px + 16, py - 18, 45, -680, true, 'triple', dmg));
      this.sound.playLaser('triple');
    } else if (this.player.rapidFire) {
      this.projectiles.push(new Projectile(px - 8, py - 22, 0, -840, true, 'rapid', Math.round(dmg * 0.75)));
      this.projectiles.push(new Projectile(px + 8, py - 22, 0, -840, true, 'rapid', Math.round(dmg * 0.75)));
      this.sound.playLaser('rapid');
    } else {
      this.projectiles.push(new Projectile(px - 10, py - 20, 0, -720, true, 'laser', dmg));
      this.projectiles.push(new Projectile(px + 10, py - 20, 0, -720, true, 'laser', dmg));
      this.sound.playLaser('normal');
    }

    this.player.resetFireTimer();
  }

  fireHyperBeam() {
    if (this.player.beamCharge >= 100 && !this.player.isFiringBeam && this.player.isAlive) {
      this.player.isFiringBeam = true;
      this.player.beamTimer = 2.4;
      this.player.beamCharge = 0;
      this.sound.playHyperBeam();
      this.triggerScreenShake(20, 1.2);
      this.particles.spawnExplosion(this.player.x, this.player.y - 30, 'large', '#ec4899');
    }
  }

  triggerScreenShake(intensity = 10, duration = 0.35) {
    if (!this.settings.screenShake) return;
    this.shakeIntensity = intensity;
    this.shakeDuration = duration;
  }

  flashScreen() {
    if (!this.dom.screenFlash) return;
    this.dom.screenFlash.style.opacity = '0.5';
    setTimeout(() => {
      if (this.dom.screenFlash) this.dom.screenFlash.style.opacity = '0';
    }, 80);
  }

  /* ---------------- LEVEL & GAME FLOW ---------------- */

  startLevel(levelNumber) {
    this.sound.resume();

    // Clear any pending boss timers
    if (this.bossSpawnTimeout) {
      clearTimeout(this.bossSpawnTimeout);
      this.bossSpawnTimeout = null;
    }

    this.currentLevel = Math.max(1, Math.min(100, levelNumber));
    const sectorId = Math.min(10, Math.ceil(this.currentLevel / 10));

    // Reset entities and metrics
    this.score = 0;
    this.enemiesKilled = 0;
    this.bossesKilled = 0;
    this.shotsFired = 0;
    this.shotsHit = 0;
    this.combo = 1;
    this.maxCombo = 1;
    this.comboTimer = 0;
    this.levelCreditsEarned = 0;

    this.projectiles = [];
    this.enemies = [];
    this.powerups = [];
    this.currentBoss = null;

    this.applyPlayerShipSelection();
    this.player.reset();
    this.env.setSector(sectorId);

    // Close overlays
    this.dom.mainMenu.classList.remove('active');
    this.dom.gameOverScreen.classList.remove('active');
    this.dom.epicVictoryScreen.classList.remove('active');
    this.dom.levelClearedScreen.classList.remove('active');
    this.dom.pauseScreen.classList.remove('active');
    this.dom.hud.classList.add('active');

    // Setup HUD tags
    if (this.dom.waveNumber) this.dom.waveNumber.textContent = `LVL ${String(this.currentLevel).padStart(2, '0')}`;
    if (this.dom.hudSectorTag) this.dom.hudSectorTag.textContent = `SECTOR ${sectorId}`;

    this.state = 'playing';

    // Check if this level is a Boss Level (Level 10, 20, 30... 100)
    if (this.currentLevel % 10 === 0) {
      this.triggerBossLevel(sectorId);
    } else {
      this.startNormalLevelWave();
    }
    this.sound.startMusic(this.currentLevel % 10 === 0 ? 'boss' : 'combat');
  }

  startNormalLevelWave() {
    this.waveState = 'spawning';
    this.waveEnemiesTotal = 8 + Math.floor(this.currentLevel * 0.35);
    this.waveEnemiesSpawned = 0;
    this.spawnTimer = 1.0;
    this.env.setWarp(1.0);
    if (this.dom.bossHud) this.dom.bossHud.classList.remove('active');
  }

  triggerBossLevel(sectorId) {
    this.waveState = 'boss_alert';
    const sData = SECTORS_DATA[(sectorId - 1) % SECTORS_DATA.length];

    if (this.dom.bossWarningName) this.dom.bossWarningName.textContent = sData.bossName;
    if (this.dom.bossWarningOverlay) this.dom.bossWarningOverlay.classList.add('active');

    this.sound.playBossWarning();
    this.sound.setTrack('boss');

    this.bossSpawnTimeout = setTimeout(() => {
      if (this.dom.bossWarningOverlay) this.dom.bossWarningOverlay.classList.remove('active');
      if (this.state !== 'playing') return;

      this.currentBoss = new Boss(this.canvas, sectorId);
      this.waveState = 'boss_active';

      if (this.dom.bossHud) {
        this.dom.bossHud.classList.add('active');
        this.dom.bossName.textContent = this.currentBoss.name;
        this.dom.bossPhase.textContent = 'PHASE 1';
        this.dom.bossBarFill.style.width = '100%';
      }
    }, 2800);
  }

  returnToMenu() {
    this.state = 'menu';
    this.sound.setTrack('menu');
    this.dom.hud.classList.remove('active');
    this.dom.pauseScreen.classList.remove('active');
    this.dom.gameOverScreen.classList.remove('active');
    this.dom.epicVictoryScreen.classList.remove('active');
    this.dom.levelClearedScreen.classList.remove('active');
    this.dom.campaignCompleteScreen.classList.remove('active');
    this.dom.mainMenu.classList.add('active');

    this.syncCreditsDisplay();
    if (this.dom.menuHighScore) this.dom.menuHighScore.textContent = this.saveData.highScore.toLocaleString();
    if (this.dom.menuHighWave) this.dom.menuHighWave.textContent = `LEVEL ${this.saveData.unlockedLevel} / 100`;
  }

  /* ---------------- EPIC VICTORY & LEVEL COMPLETION ---------------- */

  onBossDefeated(boss) {
    this.bossesKilled++;
    this.saveData.stats.bossesKilled = (this.saveData.stats.bossesKilled || 0) + 1;

    // Freeze action momentarily
    this.freezeTimer = 0.25;

    // Rewards
    const sectorId = Math.min(10, Math.ceil(this.currentLevel / 10));
    const bossCredits = 1500 + sectorId * 500;
    const sectorBonus = 1000;
    this.addCredits(bossCredits + sectorBonus);

    // Save progression
    if (this.currentLevel >= this.saveData.unlockedLevel) {
      this.saveData.unlockedLevel = Math.min(100, this.currentLevel + 1);
    }
    this.saveData.levelStars[this.currentLevel] = 3;
    this.saveGameData();

    // Check boss achievements
    this.unlockAchievement('boss_hunter_1');
    if (this.saveData.stats.bossesKilled >= 5) this.unlockAchievement('boss_hunter_5');
    if (this.currentLevel >= 50) this.unlockAchievement('galaxy_defender');
    if (this.currentLevel >= 100) this.unlockAchievement('ultimate_legend');

    // Transition to EPIC VICTORY SCREEN
    setTimeout(() => {
      this.showEpicVictoryScreen(boss, bossCredits, sectorBonus);
    }, 2800);
  }

  showEpicVictoryScreen(boss, creditsEarned, sectorBonus) {
    this.state = 'victory';
    this.sound.stopMusic();
    this.sound.playVictoryFanfare();

    // Update Victory Screen Fields
    document.getElementById('vicSectorName').textContent = `SECTOR ${Math.ceil(this.currentLevel / 10)} CLEARED`;
    document.getElementById('vicLevelCompleted').textContent = `LEVEL ${this.currentLevel}`;
    document.getElementById('vicBossDefeated').textContent = boss.name;
    document.getElementById('vicFinalScore').textContent = this.score.toLocaleString();
    document.getElementById('vicCreditsEarned').textContent = `+${creditsEarned.toLocaleString()} CR`;
    document.getElementById('vicSectorBonus').textContent = `+${sectorBonus.toLocaleString()} CR`;
    document.getElementById('vicMaxCombo').textContent = `x${this.maxCombo.toFixed(1)}`;

    const accuracy = this.shotsFired > 0 ? Math.round((this.shotsHit / this.shotsFired) * 100) : 0;
    document.getElementById('vicAccuracy').textContent = `${accuracy}%`;

    this.dom.epicVictoryScreen.classList.add('active');
  }

  onNormalLevelCleared() {
    this.state = 'level_clear';
    const lvlReward = 150 + this.currentLevel * 15;
    this.addCredits(lvlReward);

    if (this.currentLevel >= this.saveData.unlockedLevel) {
      this.saveData.unlockedLevel = Math.min(100, this.currentLevel + 1);
    }
    this.saveData.levelStars[this.currentLevel] = 3;
    this.saveGameData();

    this.sound.playPowerUp();

    document.getElementById('lcScore').textContent = this.score.toLocaleString();
    document.getElementById('lcCredits').textContent = `+${lvlReward} CR`;
    document.getElementById('lcNextLevel').textContent = `LEVEL ${String(this.currentLevel + 1).padStart(2, '0')}`;
    this.dom.levelClearedScreen.classList.add('active');
  }

  openCampaignComplete() {
    this.state = 'victory';
    this.sound.playVictoryFanfare();
    document.getElementById('ccFinalScore').textContent = this.score.toLocaleString();
    document.getElementById('ccCreditsEarned').textContent = `⬡ ${this.saveData.stats.creditsEarned.toLocaleString()}`;
    this.dom.campaignCompleteScreen.classList.add('active');
  }

  onGameOver() {
    this.state = 'gameover';
    this.sound.stopMusic();
    this.sound.playGameOver();

    if (this.score > this.saveData.highScore) {
      this.saveData.highScore = this.score;
      this.saveGameData();
    }

    document.getElementById('goFinalScore').textContent = this.score.toLocaleString();
    document.getElementById('goCreditsEarned').textContent = `+${this.levelCreditsEarned} CR`;
    document.getElementById('goWaveReached').textContent = `LEVEL ${this.currentLevel}`;
    document.getElementById('goEnemiesKilled').textContent = this.enemiesKilled.toString();
    document.getElementById('goMaxCombo').textContent = `x${this.maxCombo.toFixed(1)}`;

    const accuracy = this.shotsFired > 0 ? Math.round((this.shotsHit / this.shotsFired) * 100) : 0;
    document.getElementById('goAccuracy').textContent = `${accuracy}%`;

    this.dom.gameOverScreen.classList.add('active');
  }

  togglePause() {
    if (this.state === 'playing') {
      this.state = 'paused';
      this.dom.pauseScreen.classList.add('active');
      this.sound.stopMusic();
    } else if (this.state === 'paused') {
      this.resumeGame();
    }
  }

  resumeGame() {
    this.state = 'playing';
    this.dom.pauseScreen.classList.remove('active');
    this.sound.startMusic(this.currentBoss ? 'boss' : 'combat');
  }

  toggleMute() {
    this.sound.setMute(!this.sound.isMuted);
    const muteToggle = document.getElementById('muteToggle');
    if (muteToggle) muteToggle.checked = this.sound.isMuted;
    const hudMute = document.getElementById('hudMuteBtn');
    if (hudMute) {
      hudMute.querySelector('.icon').textContent = this.sound.isMuted ? '🔇' : '🔊';
    }
  }

  addScore(points) {
    const multiplied = Math.round(points * this.combo);
    this.score += multiplied;
    if (this.score > this.saveData.highScore) {
      this.saveData.highScore = this.score;
    }

    this.combo = Math.min(5.0, this.combo + 0.2);
    if (this.combo > this.maxCombo) this.maxCombo = this.combo;
    this.comboTimer = this.comboMaxTime;

    if (this.combo >= 4.0) this.unlockAchievement('combo_master');
  }

  /* ---------------- MASTER UPDATE CYCLE ---------------- */

  update(dt) {
    this.env.update(dt);

    if (this.state === 'menu') {
      this.player.x = this.canvas.width / 2 + Math.sin(Date.now() * 0.0015) * 80;
      this.player.y = this.canvas.height * 0.65 + Math.cos(Date.now() * 0.002) * 20;
      this.player.bankAngle = Math.sin(Date.now() * 0.0015) * 0.4;
      this.particles.update(dt);
      return;
    }

    if (this.state !== 'playing') return;

    // Freeze-frame slow motion upon dramatic moments
    if (this.freezeTimer > 0) {
      this.freezeTimer -= dt;
      return;
    }

    if (this.shakeDuration > 0) {
      this.shakeDuration -= dt;
      if (this.shakeDuration <= 0) this.shakeIntensity = 0;
    }

    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) this.combo = 1.0;
    }

    this.player.update(dt, this.input, this.particles);

    if (this.input.shoot || this.settings.autoFire) {
      this.firePlayerLasers();
    }

    if (!this.player.isAlive) {
      this.particles.spawnExplosion(this.player.x, this.player.y, 'boss', '#00f0ff');
      this.sound.playExplosion('boss');
      this.triggerScreenShake(25, 1.2);
      this.onGameOver();
      return;
    }

    // Hyper Beam Active Column
    if (this.player.isFiringBeam) {
      const beamX = this.player.x;
      for (const p of this.projectiles) {
        if (!p.isPlayer && Math.abs(p.x - beamX) < 40) {
          p.markedForDeletion = true;
          this.particles.spawnSparks(p.x, p.y, 4, '#fbbf24');
        }
      }

      for (const enemy of this.enemies) {
        if (Math.abs(enemy.x - beamX) < 55 && enemy.y < this.player.y) {
          const destroyed = enemy.takeDamage(120 * dt * 4);
          this.particles.spawnSparks(enemy.x, enemy.y, 6, '#ec4899');
          if (destroyed) this.handleEnemyDeath(enemy);
        }
      }

      if (this.currentBoss && this.currentBoss.isAlive) {
        if (Math.abs(this.currentBoss.x - beamX) < (this.currentBoss.width / 2 + 30)) {
          const bossDead = this.currentBoss.takeDamage(80 * dt * 4);
          this.particles.spawnSparks(this.currentBoss.x, this.currentBoss.y + 40, 8, '#ec4899');
          if (bossDead) this.handleBossDeath();
        }
      }
    }

    this.updateWaveDirector(dt);
    this.updateProjectiles(dt);
    this.updateEnemies(dt);

    // Boss loop
    if (this.currentBoss) {
      this.currentBoss.update(dt, this.player, this.projectiles, this.sound, this.particles);
      if (this.currentBoss.isDefeated && this.currentBoss.defeatTimer <= 0) {
        const defeatedBoss = this.currentBoss;
        this.currentBoss = null;
        this.onBossDefeated(defeatedBoss);
      }
    }

    this.updatePowerUps(dt);
    this.particles.update(dt);
    this.updateHUD();
  }

  updateWaveDirector(dt) {
    if (this.waveState === 'spawning') {
      this.spawnTimer -= dt;
      if (this.spawnTimer <= 0 && this.waveEnemiesSpawned < this.waveEnemiesTotal) {
        this.spawnEnemy();
        this.waveEnemiesSpawned++;
        this.spawnTimer = Math.max(0.6, 2.2 - (this.currentLevel % 10) * 0.14);
      } else if (this.waveEnemiesSpawned >= this.waveEnemiesTotal && this.enemies.length === 0) {
        // Normal level complete!
        this.onNormalLevelCleared();
      }
    }
  }

  spawnEnemy() {
    const w = this.canvas.width;
    const x = Math.random() * (w - 120) + 60;
    const y = -40;

    let type = 'drone';
    const rand = Math.random();
    const lvlInSector = this.currentLevel % 10;

    if (lvlInSector >= 7 && rand < 0.3) {
      type = 'phantom';
    } else if (lvlInSector >= 5 && rand < 0.5) {
      type = 'cruiser';
    } else if (lvlInSector >= 2 && rand < 0.8) {
      type = 'fighter';
    }

    this.enemies.push(new Enemy(x, y, type, this.currentLevel));
  }

  updateProjectiles(dt) {
    const w = this.canvas.width;
    const h = this.canvas.height;

    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.update(dt, this.player, this.enemies);

      if (p.x < -30 || p.x > w + 30 || p.y < -40 || p.y > h + 40) {
        p.markedForDeletion = true;
      }

      if (p.isPlayer && !p.markedForDeletion) {
        for (const enemy of this.enemies) {
          if (!enemy.markedForDeletion && (!enemy.isCloaked || enemy.type !== 'phantom')) {
            const dist = Math.hypot(p.x - enemy.x, p.y - enemy.y);
            if (dist < (enemy.width / 2 + p.radius)) {
              p.markedForDeletion = true;
              this.shotsHit++;
              const beamGain = 3.5 * (1 + (this.saveData.upgrades.beam || 0) * 0.12);
              this.player.chargeBeam(beamGain);

              this.particles.spawnSparks(p.x, p.y, 8, '#00f0ff');
              const destroyed = enemy.takeDamage(p.damage);
              if (destroyed) this.handleEnemyDeath(enemy);
              break;
            }
          }
        }

        if (!p.markedForDeletion && this.currentBoss && this.currentBoss.isAlive) {
          const dist = Math.hypot(p.x - this.currentBoss.x, p.y - this.currentBoss.y);
          if (dist < (this.currentBoss.width / 2 + p.radius)) {
            p.markedForDeletion = true;
            this.shotsHit++;
            const beamGain = 2.0 * (1 + (this.saveData.upgrades.beam || 0) * 0.12);
            this.player.chargeBeam(beamGain);

            this.particles.spawnSparks(p.x, p.y, 8, '#f43f5e');
            const bossDead = this.currentBoss.takeDamage(p.damage);
            if (bossDead) this.handleBossDeath();
          }
        }
      }

      if (!p.isPlayer && !p.markedForDeletion && this.player.isAlive) {
        const dist = Math.hypot(p.x - this.player.x, p.y - this.player.y);
        if (dist < (this.player.width / 2 + p.radius)) {
          p.markedForDeletion = true;
          this.handlePlayerHit(p.damage);
        }
      }

      if (p.markedForDeletion) this.projectiles.splice(i, 1);
    }
  }

  updateEnemies(dt) {
    const h = this.canvas.height;
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      e.update(dt, this.player, this.projectiles, this.sound);

      if (this.player.isAlive && (!e.isCloaked || e.type !== 'phantom')) {
        const dist = Math.hypot(e.x - this.player.x, e.y - this.player.y);
        if (dist < (this.player.width / 2 + e.width / 2)) {
          e.markedForDeletion = true;
          this.handlePlayerHit(35);
          this.handleEnemyDeath(e);
        }
      }

      if (e.y > h + 60) e.markedForDeletion = true;
      if (e.markedForDeletion) this.enemies.splice(i, 1);
    }
  }

  handlePlayerHit(damage) {
    const hitSuccess = this.player.takeDamage(damage);
    if (!hitSuccess) return;

    if (this.player.shield > 0) {
      this.sound.playShieldHit();
    } else {
      this.sound.playPlayerHit();
    }

    this.triggerScreenShake(14, 0.4);
    if (this.dom.damageVignette) {
      this.dom.damageVignette.classList.add('active');
      setTimeout(() => {
        if (this.dom.damageVignette) this.dom.damageVignette.classList.remove('active');
      }, 220);
    }
    this.combo = 1.0;
  }

  handleEnemyDeath(enemy) {
    this.enemiesKilled++;
    this.saveData.stats.totalKills = (this.saveData.stats.totalKills || 0) + 1;
    this.addScore(enemy.scoreValue);

    // Galactic Credits with Combo Multiplier!
    const creditsEarned = Math.round(enemy.creditValue * this.combo);
    this.addCredits(creditsEarned);
    this.sound.playCreditEarn();

    const size = enemy.type === 'cruiser' ? 'large' : 'medium';
    this.particles.spawnExplosion(enemy.x, enemy.y, size, enemy.color);
    this.sound.playExplosion(size);
    this.triggerScreenShake(size === 'large' ? 12 : 6, 0.25);

    // Floating credits & score notification
    this.particles.spawnFloatingText(enemy.x, enemy.y, `+${creditsEarned} CR`, '#fbbf24', 1.1);

    // Power-up drop chance (18%)
    if (Math.random() < 0.18) {
      const types = ['rapid', 'triple', 'shield', 'health', 'beam', 'emp'];
      const chosen = types[Math.floor(Math.random() * types.length)];
      this.powerups.push(new PowerUp(enemy.x, enemy.y, chosen));
    }

    if (this.saveData.stats.totalKills === 1) this.unlockAchievement('first_blood');
  }

  handleBossDeath() {
    this.addScore(8000);
    this.particles.spawnExplosion(this.currentBoss.x, this.currentBoss.y, 'boss', '#ff007f');
    this.sound.playBossDeath(); // BUG-FIX: Verified and tested
    this.triggerScreenShake(30, 2.0);
    this.flashScreen();
    this.particles.spawnFloatingText(this.currentBoss.x, this.currentBoss.y, 'BOSS ANNIHILATED! +8000', '#fbbf24', 2.0);
  }

  updatePowerUps(dt) {
    const h = this.canvas.height;
    for (let i = this.powerups.length - 1; i >= 0; i--) {
      const pu = this.powerups[i];
      pu.update(dt, this.player);

      if (this.player.isAlive) {
        const dist = Math.hypot(pu.x - this.player.x, pu.y - this.player.y);
        if (dist < (this.player.width / 2 + pu.radius)) {
          pu.markedForDeletion = true;
          this.applyPowerUp(pu.type);
        }
      }

      if (pu.y > h + 40) pu.markedForDeletion = true;
      if (pu.markedForDeletion) this.powerups.splice(i, 1);
    }
  }

  applyPowerUp(type) {
    this.sound.playPowerUp();
    this.particles.spawnSparks(this.player.x, this.player.y, 18, '#fbbf24');

    if (type === 'rapid') {
      this.player.rapidFire = true;
      this.player.rapidTimer = 8.0;
      this.particles.spawnFloatingText(this.player.x, this.player.y - 30, 'RAPID FIRE OVERCLOCK!', '#10b981');
    } else if (type === 'triple') {
      this.player.tripleShot = true;
      this.player.tripleTimer = 8.0;
      this.particles.spawnFloatingText(this.player.x, this.player.y - 30, 'TRIPLE SPREAD ACTIVE!', '#00f0ff');
    } else if (type === 'shield') {
      this.player.restoreShield();
      this.particles.spawnFloatingText(this.player.x, this.player.y - 30, 'AEGIS SHIELD CHARGED!', '#3b82f6');
    } else if (type === 'health') {
      this.player.heal(35);
      this.particles.spawnFloatingText(this.player.x, this.player.y - 30, 'NANITE REPAIR +35%', '#22c55e');
    } else if (type === 'beam') {
      this.player.chargeBeam(100);
      this.particles.spawnFloatingText(this.player.x, this.player.y - 30, 'HYPER BEAM READY!', '#ec4899');
    } else if (type === 'emp') {
      this.sound.playEmpBlast();
      this.triggerScreenShake(18, 0.6);
      this.particles.spawnFloatingText(this.canvas.width / 2, this.canvas.height / 2, 'EMP SHOCKWAVE DETONATED!', '#fbbf24', 1.8);
      for (const p of this.projectiles) if (!p.isPlayer) p.markedForDeletion = true;
      for (const e of this.enemies) e.takeDamage(120);
    }
  }

  /* ---------------- HUD SYNC ---------------- */

  updateHUD() {
    const hullPct = Math.max(0, Math.round((this.player.health / this.player.maxHealth) * 100));
    const shieldPct = Math.max(0, Math.round((this.player.shield / this.player.maxShield) * 100));

    if (this.dom.hullBar) this.dom.hullBar.style.width = `${hullPct}%`;
    if (this.dom.hullGhost) this.dom.hullGhost.style.width = `${hullPct}%`;
    if (this.dom.hullText) this.dom.hullText.textContent = `${hullPct}%`;

    if (this.dom.shieldBar) this.dom.shieldBar.style.width = `${shieldPct}%`;
    if (this.dom.shieldText) this.dom.shieldText.textContent = `${shieldPct}%`;

    // Special Hyper Beam
    const beamPct = Math.round(this.player.beamCharge);
    if (this.dom.beamBar) this.dom.beamBar.style.width = `${beamPct}%`;
    if (this.dom.beamText) {
      if (beamPct >= 100) {
        this.dom.beamText.textContent = 'READY [E]';
        this.dom.beamText.classList.add('charged');
      } else {
        this.dom.beamText.textContent = `${beamPct}%`;
        this.dom.beamText.classList.remove('charged');
      }
    }

    // Ship Unique Ability Cooldown
    if (this.dom.abilityBar && this.dom.abilityText) {
      if (this.player.abilityTimer <= 0) {
        this.dom.abilityBar.style.width = '100%';
        this.dom.abilityText.textContent = 'READY [C]';
        this.dom.abilityText.classList.add('charged');
      } else {
        const cdPct = Math.max(0, 100 - (this.player.abilityTimer / this.player.shipData.cooldown) * 100);
        this.dom.abilityBar.style.width = `${cdPct}%`;
        this.dom.abilityText.textContent = `${this.player.abilityTimer.toFixed(1)}s`;
        this.dom.abilityText.classList.remove('charged');
      }
    }

    if (this.dom.scoreDisplay) this.dom.scoreDisplay.textContent = String(this.score).padStart(6, '0');

    // Remaining Enemies
    const remaining = Math.max(0, (this.waveEnemiesTotal - this.waveEnemiesSpawned) + this.enemies.length);
    if (this.dom.enemiesRemaining) {
      this.dom.enemiesRemaining.textContent = this.currentBoss ? 'BOSS ENGAGED' : `ENEMIES: ${remaining}`;
    }

    // Combo
    if (this.dom.comboMultiplier) this.dom.comboMultiplier.textContent = `x${this.combo.toFixed(1)}`;
    if (this.dom.comboTimerBar) {
      const comboPct = (this.comboTimer / this.comboMaxTime) * 100;
      this.dom.comboTimerBar.style.width = `${Math.max(0, comboPct)}%`;
    }

    // Boss bar
    if (this.currentBoss && this.dom.bossHud) {
      const bossPct = Math.max(0, (this.currentBoss.health / this.currentBoss.maxHealth) * 100);
      if (this.dom.bossBarFill) this.dom.bossBarFill.style.width = `${bossPct}%`;
      if (this.dom.bossPhase) this.dom.bossPhase.textContent = `PHASE ${this.currentBoss.phase}`;
    }

    // Powerup Pills
    if (this.dom.powerupBuffs) {
      let buffsHtml = '';
      if (this.player.rapidFire) {
        buffsHtml += `
          <div class="buff-pill" style="border-color: #10b981;">
            <span class="buff-icon" style="color: #10b981;">⚡</span>
            <span class="buff-title">RAPID FIRE</span>
            <span class="buff-timer-text">${this.player.rapidTimer.toFixed(1)}s</span>
          </div>`;
      }
      if (this.player.tripleShot) {
        buffsHtml += `
          <div class="buff-pill" style="border-color: #00f0ff;">
            <span class="buff-icon" style="color: #00f0ff;">❖</span>
            <span class="buff-title">TRIPLE SPREAD</span>
            <span class="buff-timer-text">${this.player.tripleTimer.toFixed(1)}s</span>
          </div>`;
      }
      this.dom.powerupBuffs.innerHTML = buffsHtml;
    }
  }

  /* ---------------- MASTER RENDER CYCLE ---------------- */

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.save();

    if (this.shakeIntensity > 0) {
      const ox = (Math.random() - 0.5) * this.shakeIntensity;
      const oy = (Math.random() - 0.5) * this.shakeIntensity;
      ctx.translate(ox, oy);
    }

    this.env.render();

    for (const pu of this.powerups) pu.render(ctx);
    for (const e of this.enemies) e.render(ctx);
    if (this.currentBoss) this.currentBoss.render(ctx);
    for (const p of this.projectiles) p.render(ctx);
    this.player.render(ctx);
    this.particles.render();

    ctx.restore();
  }

  /* ---------------- MASTER GAME LOOP ---------------- */

  loop(timestamp) {
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
    this.lastTime = timestamp;

    this.update(dt);
    this.render();

    requestAnimationFrame((t) => this.loop(t));
  }
}

// Launch Game on Load
window.addEventListener('DOMContentLoaded', () => {
  const game = new NebulaGame();
  window.nebulaGame = game;
});
