'use client';

import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/all';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import DynamicLogo from './DynamicLogo';

export default function PageTransition({
  children,
}: {
  children?: React.ReactNode;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isTransitioning = useRef(false);

  const cover = async (url: string) => {
    if (!logoRef.current) return;
    const path = logoRef.current.querySelector('path');

    gsap.registerPlugin(DrawSVGPlugin);

    await gsap
      .timeline()
      .set(overlayRef.current, {
        display: 'flex',
      })
      .to(barsRef.current, {
        scaleX: 1,
        stagger: 0.02,
        duration: 0.4,
        transformOrigin: 'left',
        ease: 'power4.out',
      })
      .set(path, {
        drawSVG: '0%',
        fill: 'transparent',
      })
      .to(logoRef.current, {
        opacity: 1,
      })
      .to(path, {
        drawSVG: '100%',
        duration: 2,
        ease: 'power1.inOut',
      })
      .to(path, {
        fill: 'black',
      })
      .to(logoRef.current, {
        opacity: 0,
        delay: 0.2,
      });

    router.push(url);
  };

  const reveal = async () => {
    await gsap
      .timeline()
      .to(
        barsRef.current,
        {
          scaleX: 0,
          stagger: 0.02,
          duration: 0.4,
          transformOrigin: 'right',
          ease: 'power4.out',
        },
        '>0.5'
      )
      .set(overlayRef.current, {
        display: 'none',
      });
    isTransitioning.current = false;
  };

  // Done loading
  useEffect(() => {
    reveal();

    const handleRouteChange = (e: any) => {
      e.preventDefault();
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      const url = (e.currentTarget as HTMLAnchorElement).href;
      cover(url);
    };

    const links = [...document.querySelectorAll('a[href^="/"]')].filter(
      (link) => {
        const href = (link as HTMLAnchorElement).href;
        const url = new URL(href).pathname;
        if (url === pathname) return false;
        return true;
      }
    );
    links.forEach((link) => link.addEventListener('click', handleRouteChange));

    return () => {
      links.forEach((link) =>
        link.removeEventListener('click', handleRouteChange)
      );
    };
  }, [router, pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        className="z-[9999] fixed inset-0 flex justify-center items-center"
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) barsRef.current[i] = el;
            }}
            className="bg-foreground w-[10%] h-screen scale-x-0 pointer-events-none"
          ></div>
        ))}

        <div
          ref={logoRef}
          className="top-1/2 left-1/2 absolute opacity-0 -translate-x-1/2 -translate-y-1/2"
        >
          <DynamicLogo />
        </div>
      </div>
      {children}
    </>
  );
}
