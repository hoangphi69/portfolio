'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="top-0 z-10 fixed flex justify-between items-center bg-background p-6 w-full">
      <Link href={'/'}>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={160}
          height={24}
          priority
        />
      </Link>

      <div className="flex items-center gap-8">
        <Link href="/#works">projects</Link>
        <Link href="/other">other</Link>
        <Link href="/another">another</Link>
        <button className="bg-foreground px-6 py-2 rounded-full text-background">
          Theme
        </button>
        <button className="bg-foreground px-6 py-2 rounded-full text-background">
          Let's talk.
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
