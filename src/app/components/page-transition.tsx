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
  const router = useRouter();
  const pathname = usePathname();
  const isTransitioning = useRef(false);

  const cover = async (url: string) => {
    await gsap
      .timeline()
      .set(overlayRef.current, {
        display: 'grid',
      })
      .to(barsRef.current, {
        scaleY: 1,
        duration: randomDuration,
        transformOrigin: 'top',
        ease: 'power1.out',
      });

    router.push(url);
  };

  const reveal = async () => {
    await gsap
      .timeline()
      .to(barsRef.current, {
        scaleY: 0,
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
