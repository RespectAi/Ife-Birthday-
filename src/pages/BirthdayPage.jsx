import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SculptedRoseSeal from '../components/SculptedRoseSeal';
import '../styles/birthday-envelope.css';

/**
 * Pacing & Stages for Realistic Envelope Interaction (Phase 3)
 *
 * 1. SEALED: Envelope closed, authentic red rose seal at the apex of the pointed flap.
 * 2. BLOOMING (~1200ms): Rose petals gently unfurl; soft ambient crimson aura. Audio begins softly.
 * 3. OPENING (~1200ms): Flap rotates upward & backward (rotateX: 180deg).
 * 4. RISING (~1400ms): Letter paper glides smoothly straight upward from inside the pocket.
 * 5. SETTLING (~800ms): Letter settles into framed position; background brightens with warm light.
 * 6. OPENED: Fully emerged, complete birthday letter framed by the physical envelope pocket.
 */
const STAGES = {
  SEALED: 'sealed',
  BLOOMING: 'blooming',
  OPENING: 'opening',
  RISING: 'rising',
  SETTLING: 'settling',
  OPENED: 'opened',
};

const AUDIO_SRC = '/audio/leberch-happy-birthday-581704.mp3';

export default function BirthdayPage() {
  const [stage, setStage] = useState(STAGES.SEALED);
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState(
    'Birthday envelope for Ifeoluwa Rose Bamidele is sealed. Tap the sculpted rose seal to open.'
  );
  const timersRef = useRef([]);

  // Audio state & refs
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [hasReadMessage, setHasReadMessage] = useState(false);

  // Mark message as read when recipient scrolls into the letter
  const handleLetterScroll = useCallback((e) => {
    if (hasReadMessage) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const maxScroll = scrollHeight - clientHeight;
    // Mark as read once scrolled down significantly (>120px) or within 250px of the end
    if (maxScroll <= 0 || scrollTop > 120 || scrollTop + clientHeight >= scrollHeight - 250) {
      setHasReadMessage(true);
    }
  }, [hasReadMessage]);

  // Open surprise reveal modal and mark message as read
  const handleOpenSurprise = useCallback(() => {
    setShowReveal(true);
    setHasReadMessage(true);
  }, []);

  // Clean up all pending animation timers
  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  // Inject noindex metadata dynamically for privacy
  useEffect(() => {
    let metaTag = document.querySelector('meta[name="robots"]');
    let created = false;

    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'robots';
      document.head.appendChild(metaTag);
      created = true;
    }
    const previousContent = metaTag.content;
    metaTag.content = 'noindex, nofollow';

    return () => {
      if (created) {
        metaTag.remove();
      } else {
        metaTag.content = previousContent;
      }
    };
  }, []);

  // Audio setup and cleanup
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;

    audioRef.current = audio;

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  // Soft volume fade-in function
  const startAudioWithFadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          let currentVol = 0;
          const targetVol = 0.35;
          const step = 0.035;

          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = setInterval(() => {
            currentVol = Math.min(targetVol, currentVol + step);
            if (audioRef.current) {
              audioRef.current.volume = currentVol;
            }
            if (currentVol >= targetVol) {
              clearInterval(fadeIntervalRef.current);
              fadeIntervalRef.current = null;
            }
          }, 200);
        })
        .catch((err) => {
          console.warn('Background audio playback was prevented or deferred:', err);
          setIsPlaying(false);
        });
    }
  }, []);

  // Mute / Unmute / Manual play toggle
  const handleToggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      // If audio hasn't started yet, play and unmute
      audio.volume = 0.35;
      audio.muted = false;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch((err) => console.warn('Manual audio play failed:', err));
    } else {
      const nextMuted = !isMuted;
      audio.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  // Handle rose seal activation
  const handleOpenEnvelope = () => {
    if (stage !== STAGES.SEALED) return;

    // Start background piano audio softly after user interaction
    startAudioWithFadeIn();

    // Respect user's reduced-motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setStage(STAGES.OPENED);
      setScreenReaderAnnouncement('The envelope has opened and the birthday letter is ready to read.');
      return;
    }

    // Stage 1: Rose petals gently unfold and bloom (~1200ms)
    setStage(STAGES.BLOOMING);
    setScreenReaderAnnouncement('The sculpted rose seal petals gently unfold and bloom open.');

    // Stage 2: Seal Releases & Top Flap Rotates Upward/Backward (~1200ms)
    const timer1 = setTimeout(() => {
      setStage(STAGES.OPENING);
      setScreenReaderAnnouncement('The wax seal releases and the envelope flap opens upward.');
    }, 1200);
    timersRef.current.push(timer1);

    // Stage 3: Letter Paper Rises out of the pocket (~1400ms)
    const timer2 = setTimeout(() => {
      setStage(STAGES.RISING);
      setScreenReaderAnnouncement('The letter paper emerges from behind the envelope pocket.');
    }, 2400);
    timersRef.current.push(timer2);

    // Stage 4: Letter Settles into position (~800ms)
    const timer3 = setTimeout(() => {
      setStage(STAGES.SETTLING);
      setScreenReaderAnnouncement('The letter settles into its framed reading view.');
    }, 3800);
    timersRef.current.push(timer3);

    // Stage 5: Fully Opened & Scrollable
    const timer4 = setTimeout(() => {
      setStage(STAGES.OPENED);
      setScreenReaderAnnouncement('The letter is open. You can now scroll through the message.');
    }, 4600);
    timersRef.current.push(timer4);
  };

  // Skip animation immediately
  const handleSkipAnimation = () => {
    clearTimers();
    setStage(STAGES.OPENED);
    setScreenReaderAnnouncement('Skipped animation. The letter is ready to read.');
    startAudioWithFadeIn();
  };

  // Reset to sealed state for replay/testing
  const handleResetEnvelope = () => {
    clearTimers();
    setStage(STAGES.SEALED);
    setScreenReaderAnnouncement('The envelope is sealed again.');
  };

  // Safety fallback: unlock store button after 25s of reading even without scrolling
  useEffect(() => {
    if (stage === STAGES.OPENED && !hasReadMessage) {
      const timer = setTimeout(() => {
        setHasReadMessage(true);
      }, 25000);
      return () => clearTimeout(timer);
    }
  }, [stage, hasReadMessage]);

  const isSealed = stage === STAGES.SEALED;
  const isBlooming = stage === STAGES.BLOOMING;
  const isReleased = stage !== STAGES.SEALED && stage !== STAGES.BLOOMING;
  const isOpeningOrLater = stage !== STAGES.SEALED;
  const isLetterEmerged = stage === STAGES.RISING || stage === STAGES.SETTLING || stage === STAGES.OPENED;
  const isBrightened = stage === STAGES.SETTLING || stage === STAGES.OPENED;

  return (
    <main className={`birthday-experience ${isBrightened ? 'scene-brightened' : ''}`}>
      {/* Floating Audio Mute/Unmute Control (Icon Only) */}
      <aside className="bday-audio-control-bar" aria-label="Background music controls">
        <button
          type="button"
          className={`audio-toggle-btn ${isPlaying && !isMuted ? 'is-playing' : ''} ${isMuted ? 'is-muted' : ''}`}
          onClick={handleToggleAudio}
          aria-label={isMuted ? 'Unmute background music' : isPlaying ? 'Mute background music' : 'Play background music'}
          title={isMuted ? 'Unmute music' : isPlaying ? 'Mute music' : 'Play music'}
        >
          <span className="audio-icon" aria-hidden="true">
            {isMuted ? '🔇' : isPlaying ? '🎵' : '🎶'}
          </span>
          {isPlaying && !isMuted && (
            <span className="audio-wave-bars" aria-hidden="true">
              <span className="wave-bar wb-1" />
              <span className="wave-bar wb-2" />
              <span className="wave-bar wb-3" />
            </span>
          )}
        </button>
      </aside>

      {/* Dynamic ambient spotlight */}
      <div className="scene-spotlight" aria-hidden="true" />

      {/* Screen Reader Live Region */}
      <div
        className="sr-only"
        aria-live="polite"
        style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        {screenReaderAnnouncement}
      </div>

      {/* Header Scene: Starts directly with the celebrant name */}
      <header className={`bday-interactive-header ${isLetterEmerged ? 'header-compact' : ''}`}>
        <h1>
          For Ifeoluwa Rose Bamidele <br />
          <em>(Ife Mi)</em>
        </h1>
      </header>

      {/* Physical Envelope Scene */}
      <section
        className={`envelope-physical-scene ${isLetterEmerged ? 'scene-letter-emerged' : ''}`}
        aria-label="Physical Birthday Stationery Envelope"
      >
        <div className={`envelope-pouch-container stage-${stage}`}>
          {/* 1. Envelope Back Wall & Interior Lining (Layer 1: z-index 10) */}
          <div className="envelope-back-wall">
            <svg viewBox="0 0 500 280" preserveAspectRatio="none" className="envelope-back-svg">
              <defs>
                <pattern id="linenBackWeave" width="6" height="6" patternUnits="userSpaceOnUse">
                  <rect width="6" height="6" fill="#fcf9f2" />
                  <path d="M 0,1.5 L 6,1.5 M 0,4.5 L 6,4.5" stroke="rgba(195, 175, 145, 0.28)" strokeWidth="0.65" />
                  <path d="M 1.5,0 L 1.5,6 M 4.5,0 L 4.5,6" stroke="rgba(195, 175, 145, 0.24)" strokeWidth="0.65" />
                  <circle cx="3" cy="3" r="0.4" fill="rgba(160, 135, 105, 0.18)" />
                </pattern>
                <linearGradient id="silkLiningGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f7efe0" />
                  <stop offset="50%" stopColor="#ebdcc8" />
                  <stop offset="100%" stopColor="#dfcdb4" />
                </linearGradient>
              </defs>
              <rect width="500" height="280" fill="url(#linenBackWeave)" />
              {/* Refined champagne silk interior lining with gold border */}
              <rect
                x="8"
                y="8"
                width="484"
                height="264"
                rx="4"
                fill="url(#silkLiningGrad)"
                stroke="rgba(217, 177, 102, 0.4)"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* 2. Top Flap (Hinged along upper edge at top: 0) */}
          <div className="envelope-top-flap" aria-hidden="true">
            {/* Front Face: Pointing down when closed */}
            <div className="flap-face-front">
              <svg viewBox="0 0 500 160" preserveAspectRatio="none" className="flap-front-svg">
                <defs>
                  <pattern id="linenFlapFront" width="6" height="6" patternUnits="userSpaceOnUse">
                    <rect width="6" height="6" fill="#fdfbf6" />
                    <path d="M 0,1.5 L 6,1.5 M 0,4.5 L 6,4.5" stroke="rgba(195, 175, 145, 0.25)" strokeWidth="0.65" />
                    <path d="M 1.5,0 L 1.5,6 M 4.5,0 L 4.5,6" stroke="rgba(195, 175, 145, 0.22)" strokeWidth="0.65" />
                  </pattern>
                  <linearGradient id="flapFrontShading" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
                    <stop offset="60%" stopColor="rgba(247, 241, 230, 0.3)" />
                    <stop offset="100%" stopColor="rgba(225, 210, 185, 0.65)" />
                  </linearGradient>
                  <filter id="flapBottomShadow" x="-5%" y="0%" width="110%" height="130%">
                    <feDropShadow dx="0" dy="5" stdDeviation="4.5" floodColor="#221108" floodOpacity="0.2" />
                  </filter>
                </defs>
                {/* Linen textured flap body with bottom shadow */}
                <path
                  d="M 0,0 L 250,155 L 500,0 Z"
                  fill="url(#linenFlapFront)"
                  filter="url(#flapBottomShadow)"
                />
                {/* Shading overlay for physical depth */}
                <path
                  d="M 0,0 L 250,155 L 500,0 Z"
                  fill="url(#flapFrontShading)"
                />
                {/* Crisp beveled fold lines */}
                <path d="M 0,0 L 250,155" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="0.8" />
                <path d="M 500,0 L 250,155" stroke="rgba(160, 130, 95, 0.2)" strokeWidth="0.8" />
                {/* Fine gold edge contour */}
                <path
                  d="M 0,0 L 250,155 L 500,0"
                  fill="none"
                  stroke="rgba(217, 177, 102, 0.4)"
                  strokeWidth="0.6"
                />
              </svg>
            </div>

            {/* Back Face: Silk interior lining visible when flipped open 180° backward */}
            <div className="flap-face-back">
              <svg viewBox="0 0 500 160" preserveAspectRatio="none" className="flap-back-svg">
                <defs>
                  <linearGradient id="flapBackSilkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbf6ee" />
                    <stop offset="50%" stopColor="#f0e3ce" />
                    <stop offset="100%" stopColor="#e3cfb4" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,0 L 250,155 L 500,0 Z"
                  fill="url(#flapBackSilkGrad)"
                  stroke="rgba(217, 177, 102, 0.4)"
                  strokeWidth="0.8"
                />
                {/* Inner gold decorative pinstripe */}
                <path
                  d="M 25,6 L 250,140 L 475,6"
                  fill="none"
                  stroke="rgba(217, 177, 102, 0.3)"
                  strokeWidth="0.5"
                  strokeDasharray="4 2"
                />
              </svg>
            </div>
          </div>

          {/* 3. The Letter Paper (Layer 2: z-index 20 — emerging from inside the pouch) */}
          <div className="envelope-letter-paper" aria-label="Birthday Letter Content Sheet">
            {/* Scrollable letter reading area */}
            <div className="letter-scroll-area" onScroll={handleLetterScroll}>
              <header className="letter-formal-greeting">
                <div className="letter-date-stamp">15 October</div>
                <h2 className="formal-recipient">To my Ife mi, my baby girl ❤️</h2>
                <p className="affectionate-salutation">Ife mi,</p>
              </header>

              {/* Complete Birthday Letter Content from Moses */}
              <article className="letter-real-body">
                <p className="letter-opening-paragraph">
                  Happy, happy birthday to you, Ifeoluwa Rose Bamidele! ❤️🥹
                </p>

                <p>
                  I honestly wish you could see the smile on my face as I write this. Today is all about celebrating you: the wonderful person you are, the woman you are becoming, and the beautiful life that God is unfolding before you.
                </p>

                <p>
                  Sometimes, I wonder whether you truly understand how special you are to the people who love you. You carry so much ambition in your heart, and I admire how you keep pushing, keep dreaming, and keep moving forward. Life does not always arrange itself the way we expect, but you have this resilience about you that makes me believe you will keep finding your way, even when the road becomes difficult.
                </p>

                <p>
                  And beyond all your dreams and ambitions, there is the person you are. You are kind. You are beautiful, inside and out. You have a way of showing support that means more than you may realize. Through the different seasons of life, even when school and other things have kept us in different spaces, that bond has remained special to me. I appreciate you more than I probably say out loud.
                </p>

                <p>
                  Thank you for being someone who shows up, someone who encourages, and someone whose presence makes a difference. I pray that, as you keep pouring good things into the lives of the people around you, God will send people into your life who will pour into you, too. People who will celebrate you without competition, support you without conditions, and remind you of your worth when the world gets too noisy.
                </p>

                {/* Cousin Banter Section */}
                <div className="letter-humor-card">
                  <p className="humor-intro">Now, before this letter becomes too emotional, let us address an important matter. 😂</p>
                  <p className="humor-highlight">
                    BABY GIRL, WHEN EXACTLY ARE YOU PLANNING TO GROW TALL? 😭😂❤️
                  </p>
                  <p className="humor-punchline">
                    Because at this point, I need an official update! Is there a plan? Is there a timeline? Should we contact the relevant authorities? Please, let us know! 😂😂
                  </p>
                  <p className="humor-reassurance">
                    But seriously, no matter your height, you occupy a very special place in my heart. And no, you cannot negotiate your way out of being my baby girl. That position is permanent. 😂❤️
                  </p>
                </div>

                <p>
                  As you step into this new year of your life, my prayer is that you experience the kind of growth that goes far beyond numbers or appearances. May you grow in wisdom, in confidence, in peace, in courage, and in your understanding of who God has called you to be. May your dreams become clearer, your opportunities become greater, and your hard work begin to produce results that make you stop and thank God for how far He has brought you.
                </p>

                <p>
                  May God give you grace for every assignment He places in your hands. May He protect you from dangers you can see and those you cannot see. May He surround you with genuine love, favour you in places where your name has not even been mentioned, and connect you with the right people at the right time.
                </p>

                <p>
                  I pray for good health, a peaceful mind, strength when you are tired, wisdom when you face important decisions, and courage when the next step feels uncertain. May your efforts be fruitful. May your business and ambitions flourish. May you never lack the resources, opportunities, or support you need to fulfil the things God has placed in your heart.
                </p>

                <p>
                  Most importantly, may your relationship with God continue to deepen. May you recognize His guidance, trust His timing, and find joy in His presence, whether life is going exactly as you hoped or teaching you patience along the way.
                </p>

                <p>
                  I am genuinely grateful that you are part of my life, Ife mi. You are loved, you are valued, and you are never someone who can simply be replaced by another person. I hope this new chapter reminds you, again and again, that your life matters and that there are people who sincerely want to see you win.
                </p>

                <p>
                  So today, laugh loudly, take beautiful pictures, enjoy your day, receive your flowers, eat something nice, and allow yourself to be celebrated. You deserve happiness that is genuine, love that is safe, and blessings that bring peace alongside excitement.
                </p>

                <p>
                  Happy birthday once again, my beautiful Ife mi. May this year be full of beautiful surprises, answered prayers, meaningful growth, and testimonies that leave you smiling in disbelief.
                </p>

                {/* Sacred Birthday Benediction */}
                <blockquote className="letter-benediction-box">
                  <p className="benediction-text">
                    May the Lord bless you and keep you; may His face shine upon you and be gracious to you. May He give you peace, favour, wisdom, wealth, good health, and joy in abundance. In Jesus’ mighty name, Amen! 🙏🏽❤️
                  </p>
                </blockquote>

                <p className="letter-closing-note">
                  Never forget how much you are appreciated, baby girl.
                </p>

                <p className="letter-affirmations">
                  <span>Keep shining.</span>
                  <span className="dot-sep">•</span>
                  <span>Keep growing.</span>
                  <span className="dot-sep">•</span>
                  <span>Keep becoming.</span>
                </p>

                <p className="letter-parting-banter">
                  And please, for the love of everything good, let us revisit that height situation next birthday. 😂😭❤️
                </p>

                <div className="letter-signature-block">
                  <p className="signature-valediction">With plenty of love, &amp; prayers</p>
                  <div className="handwritten-signature">Moses ❤️</div>
                </div>

                {/* Subtle Invitation to the Birthday Reveal */}
                <section className="letter-reveal-invitation" aria-label="Birthday Surprise Invitation">
                  <div className="invitation-ornament" aria-hidden="true">✦ &nbsp; ✧ &nbsp; ✦</div>
                  <p className="invitation-prelude">
                    Ife mi, there is one more special surprise waiting for you today...
                  </p>
                  <button
                    type="button"
                    className="reveal-trigger-btn"
                    onClick={handleOpenSurprise}
                  >
                    <span className="btn-sparkle" aria-hidden="true">✨</span>
                    <span>One more thing...</span>
                    <span className="btn-sparkle" aria-hidden="true">✨</span>
                  </button>
                </section>
              </article>
            </div>
          </div>

          {/* 4. Envelope Front Pocket (Layer 3: z-index 30 — FOREGROUND POUCH FRAMING LETTER) */}
          <div className="envelope-front-pocket" aria-hidden="true">
            <svg viewBox="0 0 500 280" preserveAspectRatio="none" className="pocket-svg">
              <defs>
                <pattern id="linenPocketWeave" width="6" height="6" patternUnits="userSpaceOnUse">
                  <rect width="6" height="6" fill="#fcf9f2" />
                  <path d="M 0,1.5 L 6,1.5 M 0,4.5 L 6,4.5" stroke="rgba(195, 175, 145, 0.26)" strokeWidth="0.65" />
                  <path d="M 1.5,0 L 1.5,6 M 4.5,0 L 4.5,6" stroke="rgba(195, 175, 145, 0.22)" strokeWidth="0.65" />
                </pattern>
                <linearGradient id="pocketLeftShade" x1="0" y1="0" x2="1" y2="0.5">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.7)" />
                  <stop offset="100%" stopColor="rgba(235, 222, 203, 0.55)" />
                </linearGradient>
                <linearGradient id="pocketRightShade" x1="1" y1="0" x2="0" y2="0.5">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                  <stop offset="100%" stopColor="rgba(232, 218, 198, 0.6)" />
                </linearGradient>
                <linearGradient id="pocketBottomShade" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="rgba(238, 225, 205, 0.75)" />
                  <stop offset="55%" stopColor="rgba(253, 249, 242, 0.45)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.9)" />
                </linearGradient>
                <filter id="bottomFoldShadow" x="-10%" y="-20%" width="120%" height="140%">
                  <feDropShadow dx="0" dy="-3" stdDeviation="4" floodColor="#2a1408" floodOpacity="0.18" />
                </filter>
              </defs>

              {/* Left Side Fold */}
              <path
                d="M 0,0 L 220,140 L 0,280 Z"
                fill="url(#linenPocketWeave)"
              />
              <path
                d="M 0,0 L 220,140 L 0,280 Z"
                fill="url(#pocketLeftShade)"
                stroke="rgba(217, 177, 102, 0.25)"
                strokeWidth="0.5"
              />

              {/* Right Side Fold */}
              <path
                d="M 500,0 L 280,140 L 500,280 Z"
                fill="url(#linenPocketWeave)"
              />
              <path
                d="M 500,0 L 280,140 L 500,280 Z"
                fill="url(#pocketRightShade)"
                stroke="rgba(217, 177, 102, 0.25)"
                strokeWidth="0.5"
              />

              {/* Bottom Fold (Overlaps side folds with realistic drop shadow) */}
              <path
                d="M 0,280 L 250,125 L 500,280 Z"
                fill="url(#linenPocketWeave)"
                filter="url(#bottomFoldShadow)"
              />
              <path
                d="M 0,280 L 250,125 L 500,280 Z"
                fill="url(#pocketBottomShade)"
                stroke="rgba(255, 255, 255, 0.65)"
                strokeWidth="0.8"
              />

              {/* Fine gold edge contour on bottom fold seam */}
              <path
                d="M 0,280 L 250,125 L 500,280"
                fill="none"
                stroke="rgba(217, 177, 102, 0.35)"
                strokeWidth="0.6"
              />
            </svg>
          </div>

          {/* 5. Sculpted Rose Seal (Layer 4: z-index 50 — centered at flap apex when sealed) */}
          {!isReleased && (
            <div className="rose-seal-anchor">
              <SculptedRoseSeal
                isBlooming={isBlooming}
                isReleased={isReleased}
                onClick={handleOpenEnvelope}
                disabled={!isSealed}
              />
              {isSealed && (
                <div className="seal-prompt" aria-hidden="true">
                  <span>🌹 Tap the rose seal to open</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Skip button during animation */}
        {isOpeningOrLater && !isLetterEmerged && (
          <button
            type="button"
            className="skip-anim-btn"
            onClick={handleSkipAnimation}
          >
            Skip opening animation &rarr;
          </button>
        )}
      </section>

      {/* Actions & Navigation below envelope — only visible after letter emerges, and Visit Pirah Store only after message is read */}
      {isLetterEmerged && (
        <footer className="scene-actions-bar">
          <button
            type="button"
            className="bday-action-btn bday-btn-surprise"
            onClick={handleOpenSurprise}
            title="Open the surprise for Ife Mi"
          >
            <span className="btn-icon" aria-hidden="true">✨</span>
            <span>One more thing...</span>
          </button>

          <button
            type="button"
            className="bday-action-btn bday-btn-replay"
            onClick={handleResetEnvelope}
            title="Close and re-seal envelope to replay the animation"
          >
            <span className="btn-icon" aria-hidden="true">↺</span>
            <span>Replay Envelope</span>
          </button>

          {hasReadMessage && (
            <Link to="/" className="bday-action-btn bday-btn-store">
              <span>Visit Pirah Store</span>
              <span className="btn-arrow" aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </footer>
      )}

      {/* Birthday Reveal Modal: The Unexpected Connection to Pirah Store */}
      {showReveal && (
        <div
          className="birthday-reveal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Birthday Surprise Reveal for Ife Mi"
        >
          <div className="reveal-backdrop" onClick={() => setShowReveal(false)} />
          <div className="reveal-content-card">
            <button
              type="button"
              className="reveal-close-btn"
              onClick={() => setShowReveal(false)}
              aria-label="Close surprise reveal"
              title="Return to birthday letter"
            >
              ✕
            </button>

            <div className="reveal-header">
              <span className="reveal-badge">A Tribute to Your Craft &amp; Vision</span>
              <h2 className="reveal-headline">
                Celebrating The Woman Behind <br />
                <span className="reveal-brand-highlight">PIRAH STORE</span>
              </h2>
            </div>

            <div className="reveal-narrative">
              <p>
                Ife mi, beyond celebrating your birthday, I also celebrate the ambition, drive, and vision God has planted in your heart.
              </p>
              <p>
                You carry an eye for quality and effortless style. As a special birthday gift to celebrate your journey, I built this dedicated digital home for your brand.
              </p>
            </div>

            {/* Visual Logo Reveal Moment */}
            <div className="reveal-logo-stage">
              <div className="reveal-logo-halo" aria-hidden="true" />
              <div className="reveal-logo-frame">
                <img
                  src="/images/pirah-logo.jpg"
                  alt="Pirah Store — Official Brand Logo"
                  className="reveal-logo-img"
                  width="859"
                  height="1145"
                  loading="eager"
                />
              </div>
              <div className="reveal-brand-creds">
                <h3 className="reveal-store-name">PIRAH STORE</h3>
                <p className="reveal-tagline">PREMIUM STYLE. QUALITY WEARS. STAY STYLISH</p>
                <p className="reveal-platform-note">Your Official Digital Storefront &amp; Catalogue</p>
              </div>
            </div>

            <div className="reveal-actions">
              <Link to="/" className="reveal-cta-explore">
                <span>✨ Visit Your Pirah Store</span>
                <span className="cta-arrow">&rarr;</span>
              </Link>
              <button
                type="button"
                className="reveal-cta-back"
                onClick={() => setShowReveal(false)}
              >
                Return to Birthday Letter
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
