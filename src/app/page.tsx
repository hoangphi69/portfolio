'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import TextReveal from './components/text-reveal';
import WorkCard from './components/work-card';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const setTheme = (theme: string) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useGSAP(() => {
    const sections = document.querySelectorAll('[data-theme]');
    sections.forEach((section) => {
      const theme = section.getAttribute('data-theme');
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => self.isActive && setTheme(theme || ''),
      });
    });
  });

  return (
    <main>
      {/* Hero */}
      <section
        id="hero"
        data-theme="dark"
        className="relative content-center min-h-screen text-center"
      >
        <div className="top-1/2 left-1/2 z-[-1] absolute bg-foreground/5 rounded-lg size-[600px] aspect-square -translate-x-1/2 -translate-y-1/2"></div>
        <div className="font-black text-9xl uppercase leading-tight">
          <TextReveal delay={0.1}>
            <p className="gsap-title">It's next.js</p>
            <h1 className="text-stroke will-change-auto gsap-title">
              It's next.js
            </h1>
            <p className="gsap-title">It's next.js</p>
          </TextReveal>
        </div>
        <div className="right-6 bottom-6 absolute flex items-center gap-4 rotate-90 origin-bottom-right -translate-x-6">
          <span>scroll</span>
          <div className="bg-foreground w-10 h-px animate-run-line"></div>
        </div>
      </section>

      {/* Quote */}
      <section
        id="quote"
        data-theme="dark"
        className="content-center space-y-12 p-12 min-h-screen"
      >
        <TextReveal>
          <h2 data-cursor="caret" className="opacity-70 uppercase">
            text placeholder
          </h2>
        </TextReveal>
        <TextReveal>
          <p data-cursor="caret" className="font-medium text-7xl leading-tight">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
            harum cupiditate deleniti voluptatibus inventore corporis
            praesentium esse minima quia.
          </p>
        </TextReveal>
      </section>

      {/* About */}
      <section
        id="about"
        data-theme="light"
        className="content-center space-y-12 p-12 min-h-screen"
      >
        <TextReveal>
          <h2 className="opacity-70 uppercase">about this</h2>
        </TextReveal>
        <div className="gap-12 grid grid-cols-2">
          <Image
            src="https://picsum.photos/200/300"
            alt=""
            className="rounded-lg w-full"
            width={200}
            height={300}
            priority
          />
          <div className="top-24 sticky self-start space-y-12">
            <TextReveal>
              <p className="font-medium text-6xl">
                A brief description about the subject.
              </p>
              <p className="opacity-85 text-xl leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Recusandae, rem beatae? Esse dolores veniam sit nisi itaque
                aliquam doloribus beatae voluptatem. Dolor voluptatibus velit
                odio officia, animi aperiam nobis suscipit?
              </p>
              <p className="opacity-85 text-xl leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Recusandae, rem beatae? Esse dolores veniam sit nisi itaque
                aliquam doloribus beatae voluptatem. Dolor voluptatibus velit
                odio officia, animi aperiam nobis suscipit?
              </p>
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        data-theme="light"
        className="content-center space-y-12 p-12 min-h-screen"
      >
        <TextReveal>
          <h2 className="opacity-70 uppercase">more text</h2>
        </TextReveal>
        <div className="gap-12 grid grid-cols-2">
          <div className="space-y-4">
            <TextReveal>
              <p className="font-medium text-5xl">first subject</p>
              <p className="opacity-85 max-w-[45ch] text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Recusandae, rem beatae? Esse dolores veniam sit nisi itaque
                aliquam doloribus beatae voluptatem. Dolor voluptatibus velit
                odio officia, animi aperiam nobis suscipit?
              </p>
            </TextReveal>
          </div>
          <ul className="opacity-70 font-semibold text-6xl">
            <TextReveal delay={0.1}>
              <li>Web development</li>
              <li>Web design</li>
              <li>Wireframing</li>
              <li>UI/UX design</li>
              <li>Branding</li>
            </TextReveal>
          </ul>
        </div>
        <div className="gap-12 grid grid-cols-2">
          <div className="space-y-4">
            <TextReveal>
              <p className="font-medium text-5xl">second subject</p>
              <p className="opacity-85 max-w-[45ch] text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Recusandae, rem beatae? Esse dolores veniam sit nisi itaque
                aliquam doloribus beatae voluptatem. Dolor voluptatibus velit
                odio officia, animi aperiam nobis suscipit?
              </p>
            </TextReveal>
          </div>
          <ul className="opacity-70 font-semibold text-6xl">
            <TextReveal delay={0.1}>
              <li>Javascript</li>
              <li>HTML</li>
              <li>CSS</li>
              <li>Figma</li>
              <li>Webflow</li>
              <li>GSAP</li>
              <li>TailwindCSS</li>
              <li>ReactJS</li>
            </TextReveal>
          </ul>
        </div>
      </section>

      {/* Works */}
      <section
        id="works"
        data-theme="dark"
        className="content-center space-y-12 p-12 min-h-screen scroll-mt-20"
      >
        <TextReveal>
          <h2 className="opacity-70 uppercase">works display</h2>
        </TextReveal>
        <div className="space-y-24">
          <WorkCard
            title="Project Title"
            description="A brief description of the project goes here."
            date="2025"
            tags={['NextJS', 'TailwindCSS', 'Motion']}
            src="https://picsum.photos/1600/900"
            width={1600}
            height={900}
          />
          <div className="gap-12 grid grid-cols-[3fr_2fr]">
            <WorkCard
              title="Project Title"
              description="A brief description of the project goes here."
              date="2025"
              tags={['NextJS', 'TailwindCSS', 'Motion']}
              src="https://picsum.photos/300/400"
              width={300}
              height={400}
            />
            <div className="mt-96">
              <WorkCard
                title="Project Title"
                description="A brief description of the project goes here."
                date="2025"
                tags={['NextJS', 'TailwindCSS', 'Motion']}
                src="https://picsum.photos/1600/900"
                width={1600}
                height={900}
              />
            </div>
          </div>
          <div className="gap-12 grid grid-cols-[4fr_2fr]">
            <div className="mt-16">
              <WorkCard
                title="Project Title"
                description="A brief description of the project goes here."
                date="2025"
                tags={['NextJS', 'TailwindCSS', 'Motion']}
                src="https://picsum.photos/1600/900"
                width={1600}
                height={900}
              />
            </div>
            <WorkCard
              title="Project Title"
              description="A brief description of the project goes here."
              date="2025"
              tags={['NextJS', 'TailwindCSS', 'Motion']}
              src="https://picsum.photos/1600/900"
              width={1600}
              height={900}
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        data-theme="light"
        className="content-center space-y-12 p-12 min-h-screen"
      >
        <TextReveal>
          <h2 className="opacity-70 uppercase">contact me</h2>
        </TextReveal>
        <div className="gap-12 grid grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <TextReveal>
              <header className="space-y-4">
                <p className="font-medium text-5xl">Call me maybe?</p>
                <p className="opacity-80 max-w-[45ch] text-lg leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </header>
            </TextReveal>

            <div className="gap-8 grid grid-cols-2">
              <input
                type="text"
                placeholder="Your name"
                className="py-4 border-foreground/70 border-b outline-none"
              />
              <input
                type="text"
                placeholder="Your email"
                className="py-4 border-foreground/70 border-b outline-none"
              />
              <textarea
                placeholder="Your message"
                className="col-span-2 py-4 border-foreground/70 border-b outline-none"
                rows={5}
              ></textarea>
            </div>

            <button
              data-cursor="morph"
              data-cursor-magnetic
              className="bg-foreground px-6 py-2 rounded-full text-background button"
            >
              Send message
            </button>
          </div>
          <div className="space-y-12">
            <div>
              <header>
                <TextReveal>
                  <h3 className="mb-4 font-medium text-3xl">Contact details</h3>
                </TextReveal>
              </header>
              <ul className="opacity-70 text-lg">
                <TextReveal delay={0.1}>
                  <li>tranvanquan.dev@gmail.com</li>
                  <li>+84 123 456 789</li>
                </TextReveal>
              </ul>
            </div>
            <div>
              <header>
                <TextReveal>
                  <h3 className="mb-4 font-medium text-3xl">
                    Digital workspace
                  </h3>
                </TextReveal>
              </header>
              <ul className="opacity-70 text-lg">
                <TextReveal delay={0.1}>
                  <li>Bento</li>
                  <li>Github</li>
                  <li>Linkedln</li>
                  <li>Youtube</li>
                </TextReveal>
              </ul>
            </div>
            <div>
              <header>
                <TextReveal>
                  <h3 className="mb-4 font-medium text-3xl">Location</h3>
                </TextReveal>
              </header>
              <ul className="opacity-70 text-lg">
                <TextReveal delay={0.1}>
                  <li>Saigon, Vietnam</li>
                  <li>23:59:59 AM</li>
                </TextReveal>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
