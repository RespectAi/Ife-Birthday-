import React from 'react';
import '../styles/floating-photos.css';

/**
 * FloatingPhotoFrames Component
 *
 * Arranges 4 polaroid photograph keepsakes of Ife Mi in an elegant,
 * overlapping curved arc along the bottom and right side of the envelope,
 * pinned with 3D golden push-pins matching the user's reference design.
 *
 * Sequence along the curve (Left to Right):
 * 1. IMG-20231104-WA0107.jpg: Chic portrait looking inward (bottom-left)
 * 2. IMG-20231104-WA0110.jpg: Playful smile with framed hands (bottom center-left)
 * 3. IMG-20250914-WA0013.jpg: Graduation sign-out celebration (bottom center-right)
 * 4. IMG-20231104-WA0111.jpg: Serene gentle portrait (bottom-right flank)
 *
 * Props:
 * - stage: string ('sealed', 'blooming', 'opening', 'rising', 'settling', 'opened')
 * - isLetterEmerged: boolean
 */

const PHOTO_ITEMS = [
  {
    id: 'photo-curve-1',
    src: '/images/IMG-20231104-WA0107.jpg',
    alt: 'Ife Mi chic portrait with sunglasses and green foliage',
    caption: 'Grace & poise 🌿',
    curveClass: 'curve-pos-1',
    orientation: 'portrait',
    aspectRatio: '3 / 4',
    objectPosition: 'center 20%',
    zIndex: 1,
  },
  {
    id: 'photo-curve-2',
    src: '/images/IMG-20231104-WA0110.jpg',
    alt: 'Ife Mi smiling playfully with framed hands',
    caption: 'Ife mi 🌸',
    curveClass: 'curve-pos-2',
    orientation: 'portrait',
    aspectRatio: '3 / 4',
    objectPosition: 'center 28%',
    zIndex: 2,
  },
  {
    id: 'photo-curve-3',
    src: '/images/IMG-20250914-WA0013.jpg',
    alt: 'Ife Mi celebrating graduation sign-out in signed shirt',
    caption: 'Signed out in joy ✨',
    curveClass: 'curve-pos-3',
    orientation: 'portrait',
    aspectRatio: '3 / 4',
    objectPosition: 'center 20%',
    zIndex: 3,
  },
  {
    id: 'photo-curve-4',
    src: '/images/IMG-20231104-WA0111.jpg',
    alt: 'Ife Mi serene gentle portrait looking down',
    caption: 'Always loved ❤️',
    curveClass: 'curve-pos-4',
    orientation: 'portrait',
    aspectRatio: '3 / 4',
    objectPosition: 'center 25%',
    zIndex: 4,
  },
];

export default function FloatingPhotoFrames({ stage = 'sealed', isLetterEmerged = false }) {
  const isOpenedOrEmerging = stage !== 'sealed';

  return (
    <div
      className={`floating-photos-wrapper ${isOpenedOrEmerging ? 'is-emerging' : ''} ${isLetterEmerged ? 'is-emerged' : ''}`}
      aria-hidden="true"
    >
      <div className="curved-photos-arc">
        {PHOTO_ITEMS.map((item, index) => (
          <aside
            key={item.id}
            className={`polaroid-frame ${item.curveClass} arc-item-${index + 1}`}
            style={{ zIndex: item.zIndex }}
          >
            {/* 3D Polished Golden Push-Pin from reference design */}
            <div className="golden-pushpin">
              <span className="pin-highlight" />
            </div>

            <div className="polaroid-inner">
              <div
                className={`polaroid-img-wrapper ${item.orientation}`}
                style={{ aspectRatio: item.aspectRatio }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="polaroid-img"
                  style={{ objectPosition: item.objectPosition }}
                  loading="eager"
                  draggable="false"
                />
                <div className="polaroid-glare" />
              </div>

              <div className="polaroid-chin">
                <span className="polaroid-caption">{item.caption}</span>
              </div>
            </div>
          </aside>
        ))}
      </div>
    </div>
  );
}
