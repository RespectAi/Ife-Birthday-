/**
 * SculptedRoseSeal Component
 *
 * Implements an organic, physical rose unfolding animation requested by Moses.
 * Uses 3 concentric dimensional layers extracted from Moses' exact chosen rose artwork:
 * - rose-outer.png (outer velvety broad petals)
 * - rose-mid.png (mid-cup swirling petals)
 * - rose-core.png (inner spiral heart bud)
 *
 * On activation, the petals physically unfurl: outer petals peel and spread outward,
 * mid petals unroll in counter-rotation, and the inner heart blooms open organically.
 *
 * Props:
 * - isBlooming: boolean — whether the physical petal unfolding is active
 * - isReleased: boolean — whether the seal has released from the envelope flap
 * - onClick: () => void — activation handler
 * - disabled: boolean — prevent re-clicks during animation
 */
export default function SculptedRoseSeal({
  isBlooming = false,
  isReleased = false,
  onClick,
  disabled = false,
}) {
  return (
    <button
      type="button"
      className={`sculpted-rose-seal ${isBlooming ? 'seal-blooming' : ''} ${isReleased ? 'seal-released' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Open birthday letter for Ife Mi"
      title="Tap the sculpted rose seal to open"
    >
      {/* 1. Ambient Warm Crimson & Candlelight Aura */}
      <div className="seal-glow-aura" aria-hidden="true" />

      {/* 2. Dimensional Layered Petal Assembly (Physical Unfolding) */}
      <div className="rose-flower-container" aria-hidden="true">
        {/* Layer 1: Outer Petals (peel back and spread outward) */}
        <img
          src="/images/rose-outer.png"
          alt=""
          className="rose-layer rose-layer-outer"
          width="1024"
          height="1001"
          loading="eager"
          draggable="false"
        />

        {/* Layer 2: Mid Petals (uncurl counter-rotating) */}
        <img
          src="/images/rose-mid.png"
          alt=""
          className="rose-layer rose-layer-mid"
          width="1024"
          height="1001"
          loading="eager"
          draggable="false"
        />

        {/* Layer 3: Core Heart Bud (blossoms open in the center) */}
        <img
          src="/images/rose-core.png"
          alt=""
          className="rose-layer rose-layer-core"
          width="1024"
          height="1001"
          loading="eager"
          draggable="false"
        />
      </div>
    </button>
  );
}
