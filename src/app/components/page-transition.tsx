'use client';

import gsap from 'gsap';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

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
    // if (!logoRef.current) return;
    // const path = logoRef.current.querySelector('path');

    // gsap.registerPlugin(DrawSVGPlugin);

    await gsap
      .timeline()
      .set(overlayRef.current, {
        display: 'grid',
      })
      .to(barsRef.current, {
        scaleY: 1,
        // stagger: randomDelay(0.1, 0.2),
        // delay: randomDelay(0.1, 0.2),
        duration: randomDuration,
        transformOrigin: 'top',
        ease: 'power1.out',
      });
    // .set(path, {
    //   drawSVG: '0%',
    //   fill: 'transparent',
    // })
    // .to(logoRef.current, {
    //   opacity: 1,
    // })
    // .to(path, {
    //   drawSVG: '100%',
    //   duration: 2,
    //   ease: 'power1.inOut',
    // })
    // .to(path, {
    //   fill: 'black',
    // })
    // .to(logoRef.current, {
    //   opacity: 0,
    //   delay: 0.2,
    // });

    router.push(url);
  };

  const reveal = async () => {
    await gsap
      .timeline()
      .to(barsRef.current, {
        scaleY: 0,
        // stagger: randomDelay(0.1, 0.2),
        // delay: randomDelay(0.1, 0.2),

        duration: randomDuration,
        transformOrigin: 'bottom',
        ease: 'power4.out',
      })
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
        className="z-[9999] fixed inset-0 justify-center items-center grid grid-cols-10"
      >
        {[...Array(110)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) barsRef.current[i] = el;
            }}
            className="flex flex-col bg-foreground size-full scale-y-0 pointer-events-none"
          ></div>
        ))}

        {/* <div
          ref={logoRef}
          className="top-1/2 left-1/2 absolute opacity-0 -translate-x-1/2 -translate-y-1/2"
        >
          <DynamicLogo />
        </div> */}
      </div>
      {children}
    </>
  );
}

function randomDuration(index: number) {
  const columns = 10;
  const delay = Math.random() * 0.5;
  const rowIndex = Math.floor(index / columns);
  return rowIndex * 0.05 + delay;
}
