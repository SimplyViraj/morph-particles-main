import { useRef, useMemo, useEffect } from 'react';
import Globe from "react-globe.gl";
import { MeshPhongMaterial } from 'three';

const About = () => {
  const globeRef = useRef(null);
  const containerRef = useRef();
  const hasFired = useRef(false);

  const globeMaterial = useMemo(() => new MeshPhongMaterial({
    color: '#e8ddd0',
    emissive: '#c9b896',
    emissiveIntensity: 0.3,
  }), []);  

  useEffect(() => {
    const scroller = document.getElementById('fake-scroll');
    if (!scroller) return;

    const onScroll = () => {
      if (hasFired.current || !containerRef.current || !globeRef.current) return;
      const sectionTop = containerRef.current.closest('.section')?.offsetTop || 0;
      const scrollY = scroller.scrollTop;
      // fire when scroll reaches 80% of section top
      if (scrollY >= sectionTop * 0.8) {
        hasFired.current = true;
        globeRef.current.pointOfView(
          { lat: 17.385, lng: 78.4867, altitude: 0.3 },
          2000
        );
      }
    };

    scroller.addEventListener('scroll', onScroll);
    return () => scroller.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="about" className="section min-h-dvh relative font-jost text-[#ffeded] flex items-center">
      {/* Left content — takes ~60% leaving right for 3D model */}
      <div className="w-full lg:w-[60%] px-8 lg:pl-[5%] lg:pr-8 py-16">

        {/* Row 1 — About heading + bio (2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {/* Left — ABOUT label + big heading */}
          <div className="rounded-2xl bg-[#b8a990] p-8 flex flex-col justify-between min-h-[280px]">
            <span className="text-xs tracking-[0.3em] uppercase text-[#3a3530]">About</span>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] font-bold normal-case text-[#3a3530] mt-auto">
              A little<br /><span className="italic font-normal">about</span> me.
            </h2>
          </div>

          {/* Right — Bio text */}
          <div className="rounded-2xl bg-[#1e1915] p-8 flex flex-col justify-center gap-5 min-h-[280px]">
            <p className="text-sm leading-[1.8] normal-case text-[#8a8078]">
              I&apos;m a Computer Science student driven by curiosity and a deep desire to build meaningful digital experiences. I believe in writing clean, efficient code that solves real problems — whether it&apos;s crafting intuitive user interfaces or diving into complex data pipelines.
            </p>
            <p className="text-sm leading-[1.8] normal-case text-[#8a8078]">
              When I&apos;m not coding, you can find me exploring new frameworks, reading about system design patterns, or experimenting with creative side projects that push my boundaries as an engineer.
            </p>
          </div>
        </div>

        {/* Row 2 — Skills grid + Work preference + Scroll (3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Col 1 — 2×2 Skills grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-3">
            <div className="rounded-2xl bg-[#1e1915] p-4 flex flex-col items-center justify-center text-center border border-[#2a2420] hover:border-[#c9b896]/30 transition-colors">
              <span className="text-2xl mb-2">⚛️</span>
              <span className="text-xs normal-case text-[#c9b896]">React</span>
            </div>
            <div className="rounded-2xl bg-[#1e1915] p-4 flex flex-col items-center justify-center text-center border border-[#2a2420] hover:border-[#c9b896]/30 transition-colors">
              <span className="text-2xl mb-2">🐍</span>
              <span className="text-xs normal-case text-[#c9b896]">Python</span>
            </div>
            <div className="rounded-2xl bg-[#1e1915] p-4 flex flex-col items-center justify-center text-center border border-[#2a2420] hover:border-[#c9b896]/30 transition-colors">
              <span className="text-2xl mb-2">☕</span>
              <span className="text-xs normal-case text-[#c9b896]">Java</span>
            </div>
            <div className="rounded-2xl bg-[#1e1915] p-4 flex flex-col items-center justify-center text-center border border-[#2a2420] hover:border-[#c9b896]/30 transition-colors">
              <span className="text-2xl mb-2">🧊</span>
              <span className="text-xs normal-case text-[#c9b896]">Three.js</span>
            </div>
          </div>

          {/* Col 2 — Work preference */}
          <div ref={containerRef} className="rounded-2xl bg-[#1e1915] p-5 flex flex-col justify-between min-h-[200px]">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#b8a990]">Location</span>
              <div className="mt-3 w-full h-[100px] flex justify-center items-center rounded-xl overflow-hidden">
                <Globe
                  ref={globeRef}
                  height={100}
                  width={140}
                  backgroundColor="rgba(0,0,0,0)"
                  backgroundImageOpacity={0.5}
                  showAtmosphere
                  atmosphereColor="#c9b896"
                  atmosphereAltitude={0.15}
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                  bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                  globeMaterial={globeMaterial}
                  labelsData={[{ lat: 17.385, lng: 78.4867, text: 'Hyderabad', color: '#b8a990', size: 1000 }]}
                />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm font-semibold text-[#b8a990] normal-case">Hyderabad, India</p>
              <p className="text-[10px] text-[#b8a990] normal-case mt-1">Open to remote &amp; relocation</p>
            </div>
          </div>

          {/* Col 3 — Scroll down */}
          <div className="rounded-2xl bg-[#b8a990] p-5 flex flex-col justify-between min-h-[200px] relative">
            {/* Arrow — top left */}
            <div className="self-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#3a3530]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            {/* Scroll label — bottom right */}
            <div className="self-end flex flex-col items-center gap-2">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#3a3530]">Scroll</span>
            </div>
          </div>
        </div>

      </div>

      {/* Right side — empty for 3D model */}
      <div className="hidden lg:block lg:w-[40%]" />
    </section>
  )
}

export default About;