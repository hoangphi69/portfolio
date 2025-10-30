'use client';

import { motion, useSpring } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const SPRING = {
  type: 'spring',
  stiffness: 300,
  damping: 15,
  mass: 0.1,
};

const CURSOR_VARIANTS = {
  idle: { scale: 1 },
  link: {
    scale: 5,
    mixBlendMode: 'normal',
    background: 'orange',
    textColor: 'black',
  },
  caret: { scale: 1, width: 4 },
  morph: {},
};

export default function Cursor({ size: intialSize = 16 }: { size?: number }) {
  const [variant, setVariant] = useState<keyof typeof CURSOR_VARIANTS>('idle');
  const sticky = useRef(false);

  const position = {
    x: useSpring(0, SPRING),
    y: useSpring(0, SPRING),
  };

  const dimensions = {
    width: useSpring(intialSize, SPRING),
    height: useSpring(intialSize, SPRING),
    scale: useSpring(1, SPRING),
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    // Pointer move
    document.documentElement.addEventListener(
      'pointermove',
      (e) => {
        if (sticky.current) return;
        position.x.set(e.clientX - intialSize / 2);
        position.y.set(e.clientY - intialSize / 2);
      },
      { signal }
    );

    // Pointer click
    document.documentElement.addEventListener(
      'pointerdown',
      () => dimensions.scale.set(0.8),
      { signal }
    );

    document.documentElement.addEventListener(
      'pointerup',
      () => dimensions.scale.set(1),
      { signal }
    );

    // Pointer appear & disappear
    document.documentElement.addEventListener(
      'pointerenter',
      () => dimensions.scale.set(1),
      { signal }
    );

    document.documentElement.addEventListener(
      'pointerleave',
      () => dimensions.scale.set(0),
      { signal }
    );

    // Transform to link
    document.querySelectorAll('[data-cursor="link"]').forEach((element) => {
      element.addEventListener('pointerenter', () => setVariant('link'), {
        signal,
      });
      element.addEventListener('pointerleave', () => setVariant('idle'), {
        signal,
      });
    });

    // Transform to caret
    document.querySelectorAll('[data-cursor="caret"]').forEach((element) => {
      element.addEventListener(
        'pointerenter',
        (e) => {
          setVariant('caret');
          if (e.currentTarget) {
            // Get the computed line-height
            const computedStyle = window.getComputedStyle(
              e.currentTarget as HTMLElement
            );
            const lineHeight = computedStyle.lineHeight;

            // Parse line-height (could be 'normal', a pixel value, or a unitless number)
            let height = 40; // default

            if (lineHeight === 'normal') {
              // 'normal' is typically 1.2 times the font size
              const fontSize = parseFloat(computedStyle.fontSize);
              height = fontSize * 1.2;
            } else if (lineHeight.includes('px')) {
              height = parseFloat(lineHeight);
            } else {
              // Unitless line-height (multiply by font size)
              const fontSize = parseFloat(computedStyle.fontSize);
              height = parseFloat(lineHeight) * fontSize;
            }

            dimensions.height.set(height);
            setVariant('caret');
          }
        },
        { signal }
      );

      element.addEventListener(
        'pointerleave',
        () => {
          setVariant('idle');
          dimensions.height.set(intialSize);
        },
        { signal }
      );
    });

    // Transform to component shape (morph)
    document.querySelectorAll('[data-cursor="morph"]').forEach((element) => {
      element.addEventListener(
        'pointerenter',
        (e) => {
          setVariant('morph');
          if (!e.currentTarget) return;
          const element = e.currentTarget as HTMLElement;
          const { width, height, x, y } = element.getBoundingClientRect();

          dimensions.width.set(width);
          dimensions.height.set(height);

          position.x.set(x);
          position.y.set(y);

          sticky.current = true;
        },
        { signal }
      );

      element.addEventListener(
        'pointerleave',
        () => {
          setVariant('idle');
          dimensions.width.set(intialSize);
          dimensions.height.set(intialSize);
          sticky.current = false;
        },
        { signal }
      );
    });

    document.querySelectorAll('[data-cursor-magnetic]').forEach((element) => {
      element.addEventListener(
        'pointermove',
        (e) => {
          if (!e.currentTarget) return;
          const element = e.currentTarget as HTMLElement;
          const { clientX, clientY } = e as PointerEvent;
          const { width, height, x, y } = element.getBoundingClientRect();

          const center = { x: x + width / 2, y: y + height / 2 };
          const offset = { x: clientX - center.x, y: clientY - center.y };

          position.x.set(x + offset.x * 0.1);
          position.y.set(y + offset.y * 0.1);
        },
        { signal }
      );
    });

    return () => controller.abort();
  }, [variant]);

  return (
    <motion.div
      style={{
        ...position,
        ...dimensions,
      }}
      animate={variant}
      variants={CURSOR_VARIANTS}
      className="z-20 fixed place-content-center grid bg-white rounded-full text-center pointer-events-none mix-blend-difference"
    >
      {variant === 'link' && <ArrowOutward />}
    </motion.div>
  );
}

const ArrowOutward = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="12px"
    width="12px"
    className="will-change-auto"
    viewBox="0 -960 960 960"
    fill="black"
  >
    <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
  </svg>
);
