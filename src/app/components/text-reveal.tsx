import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import React, { useRef } from 'react';

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function TextReveal({
  children,
  animateOnScroll = true,
  delay = 0,
}: {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
}) {
  const elements = useRef<HTMLElement[]>([]);

  useGSAP(() => {
    if (!elements.current) return;

    const tl = gsap.timeline({
      scrollTrigger: animateOnScroll
        ? {
            trigger: elements.current,
            start: 'top 75%',
          }
        : {},
    });

    [...elements.current].forEach((element) => {
      const text = SplitText.create(element, {
        type: 'lines',
        mask: 'lines',
      });

      const animation = {
        yPercent: 100,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        delay,
        onComplete: () => text.revert(),
      };

      tl.from(text.lines, animation, '<');
    });
  }, [animateOnScroll, delay]);

  return (
    <>
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, {
              ref: (el: HTMLElement) => el && (elements.current[index] = el),
            })
          : child
      )}
    </>
  );
}
