'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';

export default function PageTransition({
  children,
}: {
  children?: React.ReactNode;
}) {
  const barsRef = useRef<HTMLDivElement[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const isTransitioning = useRef(false);

  const cover = (url: string) => {
    gsap.to(barsRef.current, {
      scaleX: 1,
      transformOrigin: 'left',
      ease: 'power4.out',
      onComplete: () => router.push(url),
    });
  };

  const reveal = () => {
    gsap.to(barsRef.current, {
      scaleX: 0,
      transformOrigin: 'right',
      ease: 'power4.out',
      onComplete: () => {
        isTransitioning.current = false;
      },
    });
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
      <div className="z-[9999] fixed inset-0 flex justify-center items-center pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) barsRef.current[i] = el;
            }}
            className="bg-foreground w-[10%] h-screen scale-x-0 pointer-events-none"
          ></div>
        ))}
      </div>
      {children}
    </>
  );
}
