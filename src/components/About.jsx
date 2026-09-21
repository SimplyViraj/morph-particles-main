import { useRef, useMemo, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import { MeshPhongMaterial } from "three";
import {
  Code,
  Database,
  Globe as GlobeIcon,
  Lightbulb,
} from "lucide-react";

const About = () => {
  const globeRef = useRef(null);
  const containerRef = useRef(null);
  const hasFired = useRef(false);

  // Long-press Pop State
  const [activeCard, setActiveCard] = useState(null);
  const [activeTransform, setActiveTransform] = useState({ x: 0, y: 0, scale: 1 });
  const timerRef = useRef(null);
  const cardRefs = useRef({});
  const isLongPressActive = useRef(false);

  const globeMaterial = useMemo(
    () =>
      new MeshPhongMaterial({
        color: "#e8ddd0",
        emissive: "#c9b896",
        emissiveIntensity: 0.3,
      }),
    []
  );

  useEffect(() => {
    const scroller = document.getElementById("fake-scroll");
    if (!scroller) return;

    const onScroll = () => {
      if (
        hasFired.current ||
        !containerRef.current ||
        !globeRef.current
      ) {
        return;
      }

      const sectionTop =
        containerRef.current.closest(".section")?.offsetTop || 0;

      const scrollY = scroller.scrollTop;

      if (scrollY >= sectionTop * 0.8) {
        hasFired.current = true;

        globeRef.current.pointOfView(
          {
            lat: 17.385,
            lng: 78.4867,
            altitude: 0.3,
          },
          2000
        );
      }
    };

    scroller.addEventListener("scroll", onScroll);

    return () => {
      scroller.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Long-press handling for mobile
  const handleTouchStart = (cardId) => {
    if (activeCard) return;

    timerRef.current = setTimeout(() => {
      isLongPressActive.current = true;

      // Haptic feedback
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(20);
      }

      const el = cardRefs.current[cardId];
      if (el) {
        const rect = el.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        const deltaX = screenCenterX - cardCenterX;
        const deltaY = screenCenterY - cardCenterY;
        const targetScale = Math.min(1.45, (window.innerWidth * 0.85) / rect.width);

        setActiveTransform({ x: deltaX, y: deltaY, scale: targetScale });
      }

      setActiveCard(cardId);
    }, 450);
  };

  const cancelTouch = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setTimeout(() => {
      isLongPressActive.current = false;
    }, 100);
  };

  const dismissPreview = () => {
    cancelTouch();
    setActiveCard(null);
    setActiveTransform({ x: 0, y: 0, scale: 1 });
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const getCardStyle = (id) => {
    const isActive = activeCard === id;
    if (isActive) {
      return {
        transform: `translate3d(${activeTransform.x}px, ${activeTransform.y}px, 0) scale(${activeTransform.scale})`,
        transition: "transform 0.45s cubic-bezier(0.32, 1.25, 0.32, 1), box-shadow 0.35s ease",
        zIndex: 50,
        WebkitTouchCallout: "none",
        userSelect: "none",
      };
    }
    return {
      transform: "translate3d(0, 0, 0) scale(1)",
      transition: "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.35s ease",
      WebkitTouchCallout: "none",
      userSelect: "none",
    };
  };

  return (
    <section
      id="about"
      className="
        section
        relative
        flex
        min-h-dvh
        w-full
        pt-[60dvh]
        lg:pt-0
        items-center
        font-jost
        text-[#ffeded]
      "
    >
      {/* iOS Peek/Pop Backdrop Overlay (Mobile only) */}
      <div
        onClick={dismissPreview}
        className={`
          fixed inset-0 z-40 bg-black/70 backdrop-blur-md
          transition-opacity duration-300 lg:hidden
          ${activeCard ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div
        className="
          mx-auto
          w-full
          max-w-[430px]
          px-3
          py-8

          sm:max-w-[600px]
          sm:px-5
          sm:py-10

          lg:mx-0
          lg:max-w-none
          lg:w-[60%]
          lg:pl-[5%]
          lg:pr-8
          lg:py-16
        "
      >
        {/* =====================================================
            ROW 1 — ABOUT + BIO
        ====================================================== */}
        <div
          className="
            mb-2
            grid
            grid-cols-2
            gap-2

            sm:mb-3
            sm:gap-3
          "
        >
          {/* ABOUT CARD */}
          <div
            ref={(el) => (cardRefs.current["about"] = el)}
            onTouchStart={() => handleTouchStart("about")}
            onTouchEnd={cancelTouch}
            onTouchMove={cancelTouch}
            onContextMenu={(e) => e.preventDefault()}
            style={getCardStyle("about")}
            className={`
              relative flex
              min-h-[170px]
              flex-col
              justify-between
              rounded-xl
              bg-[#b8a990]
              p-3
              touch-manipulation
              select-none [-webkit-touch-callout:none]

              sm:min-h-[210px]
              sm:rounded-2xl
              sm:p-5

              lg:min-h-[280px]
              lg:p-8
              ${
                activeCard === "about"
                  ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-[#3a3530]/40"
                  : ""
              }
            `}
          >
            <span
              className="
                pointer-events-none
                text-[8px]
                tracking-[0.2em]
                uppercase
                text-[#3a3530]

                sm:text-[10px]
                sm:tracking-[0.25em]

                lg:text-xs
                lg:tracking-[0.3em]
              "
            >
              About
            </span>

            <h2
              className="
                pointer-events-none
                mt-auto
                text-[clamp(1rem,4vw,1.4rem)]
                font-bold
                leading-[1.1]
                normal-case
                text-[#3a3530]

                sm:text-[clamp(1.3rem,4vw,2rem)]

                lg:text-[clamp(2rem,3.5vw,3rem)]
              "
            >
              Viraj
              <br />
              <span className="font-normal italic">Tammana.</span>
            </h2>
          </div>

          {/* BIO CARD */}
          <div
            ref={(el) => (cardRefs.current["bio"] = el)}
            onTouchStart={() => handleTouchStart("bio")}
            onTouchEnd={cancelTouch}
            onTouchMove={cancelTouch}
            onContextMenu={(e) => e.preventDefault()}
            style={getCardStyle("bio")}
            className={`
              relative flex
              min-h-[170px]
              flex-col
              justify-center
              gap-2
              rounded-xl
              bg-[#1e1915]
              p-3
              touch-manipulation
              select-none [-webkit-touch-callout:none]

              sm:min-h-[210px]
              sm:gap-3
              sm:rounded-2xl
              sm:p-5

              lg:min-h-[280px]
              lg:gap-5
              lg:p-8
              ${
                activeCard === "bio"
                  ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-[#c9b896]/40"
                  : ""
              }
            `}
          >
            <p
              className="
                pointer-events-none
                text-[8px]
                leading-[1.5]
                normal-case
                text-[#8a8078]

                sm:text-[10px]
                sm:leading-[1.65]

                lg:text-sm
                lg:leading-[1.8]
              "
            >
              I&apos;m a Computer Science student and software engineer
              interested in building meaningful digital experiences,
              scalable applications, and intelligent systems.
            </p>

            <p
              className="
                pointer-events-none
                text-[8px]
                leading-[1.5]
                normal-case
                text-[#8a8078]

                sm:text-[10px]
                sm:leading-[1.65]

                lg:text-sm
                lg:leading-[1.8]
              "
            >
              Currently working as a Digital Specialist Engineer at Infosys,
              with experience across C#, .NET, ASP.NET Core, AI, cloud,
              full-stack development, and data-driven applications.
            </p>
          </div>
        </div>

        {/* =====================================================
            ROW 2 — SKILLS + LOCATION + SCROLL
        ====================================================== */}
        <div
          className="
            grid
            grid-cols-3
            gap-2

            sm:gap-3
          "
        >
          {/* ===================================================
              SKILLS — 2 × 2
          ==================================================== */}
          <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3">
            {[
              {
                id: "skill-se",
                icon: Code,
                label: "Software Engineering",
              },
              {
                id: "skill-ai",
                icon: Database,
                label: "AI & Data",
              },
              {
                id: "skill-fs",
                icon: GlobeIcon,
                label: "Full Stack",
              },
              {
                id: "skill-ps",
                icon: Lightbulb,
                label: "Problem Solving",
              },
            ].map(({ id, icon: Icon, label }) => (
              <div
                key={label}
                ref={(el) => (cardRefs.current[id] = el)}
                onTouchStart={() => handleTouchStart(id)}
                onTouchEnd={cancelTouch}
                onTouchMove={cancelTouch}
                onContextMenu={(e) => e.preventDefault()}
                style={getCardStyle(id)}
                className={`
                  relative flex
                  min-h-[85px]
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#2a2420]
                  bg-[#1e1915]
                  p-2
                  text-center
                  touch-manipulation
                  select-none [-webkit-touch-callout:none]
                  transition-colors
                  hover:border-[#c9b896]/30

                  sm:min-h-[105px]
                  sm:rounded-2xl
                  sm:p-3

                  lg:min-h-[200px]
                  lg:p-4
                  ${
                    activeCard === id
                      ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-[#c9b896]/40"
                      : ""
                  }
                `}
              >
                <Icon
                  className="
                    pointer-events-none
                    mb-1
                    h-4 w-4
                    text-[#c9b896]

                    sm:mb-2
                    sm:h-5 sm:w-5

                    lg:h-6 lg:w-6
                  "
                />

                <span
                  className="
                    pointer-events-none
                    text-[6px]
                    leading-[1.2]
                    normal-case
                    text-[#c9b896]

                    sm:text-[8px]

                    lg:text-xs
                  "
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* ===================================================
              LOCATION / GLOBE
          ==================================================== */}
          <div
            ref={(el) => {
              containerRef.current = el;
              cardRefs.current["location"] = el;
            }}
            onTouchStart={() => handleTouchStart("location")}
            onTouchEnd={cancelTouch}
            onTouchMove={cancelTouch}
            onContextMenu={(e) => e.preventDefault()}
            style={getCardStyle("location")}
            className={`
              relative flex
              min-h-[180px]
              flex-col
              justify-between
              rounded-xl
              bg-[#1e1915]
              p-2
              touch-manipulation
              select-none [-webkit-touch-callout:none]

              sm:min-h-[210px]
              sm:rounded-2xl
              sm:p-4

              lg:min-h-[200px]
              lg:p-5
              ${
                activeCard === "location"
                  ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-[#c9b896]/40"
                  : ""
              }
            `}
          >
            <div>
              <span
                className="
                  pointer-events-none
                  text-[7px]
                  tracking-[0.15em]
                  uppercase
                  text-[#b8a990]

                  sm:text-[9px]

                  lg:text-[10px]
                  lg:tracking-[0.2em]
                "
              >
                Location
              </span>

              <div
                className="
                  pointer-events-none
                  mt-1
                  flex
                  h-[70px]
                  w-full
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-lg

                  sm:mt-2
                  sm:h-[85px]
                  sm:rounded-xl

                  lg:mt-3
                  lg:h-[100px]
                "
              >
                <Globe
                  ref={globeRef}
                  height={80}
                  width={110}
                  backgroundColor="rgba(0,0,0,0)"
                  backgroundImageOpacity={0.5}
                  showAtmosphere
                  atmosphereColor="#c9b896"
                  atmosphereAltitude={0.15}
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                  bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                  globeMaterial={globeMaterial}
                  labelsData={[
                    {
                      lat: 17.385,
                      lng: 78.4867,
                      text: "Hyderabad",
                      color: "#b8a990",
                      size: 1000,
                    },
                  ]}
                />
              </div>
            </div>

            <div className="mt-2 pointer-events-none">
              <p
                className="
                  text-[8px]
                  font-semibold
                  normal-case
                  text-[#b8a990]

                  sm:text-[10px]

                  lg:text-sm
                "
              >
                Hyderabad, India
              </p>

              <p
                className="
                  mt-0.5
                  text-[6px]
                  normal-case
                  text-[#b8a990]

                  sm:text-[8px]

                  lg:mt-1
                  lg:text-[10px]
                "
              >
                Open to remote &amp; relocation
              </p>
            </div>
          </div>

          {/* ===================================================
              SCROLL CARD
          ==================================================== */}
          <div
            ref={(el) => (cardRefs.current["scroll"] = el)}
            onTouchStart={() => handleTouchStart("scroll")}
            onTouchEnd={cancelTouch}
            onTouchMove={cancelTouch}
            onContextMenu={(e) => e.preventDefault()}
            style={getCardStyle("scroll")}
            className={`
              relative
              flex
              min-h-[180px]
              flex-col
              justify-between
              rounded-xl
              bg-[#b8a990]
              p-2
              touch-manipulation
              select-none [-webkit-touch-callout:none]

              sm:min-h-[210px]
              sm:rounded-2xl
              sm:p-4

              lg:min-h-[200px]
              lg:p-5
              ${
                activeCard === "scroll"
                  ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-[#3a3530]/40"
                  : ""
              }
            `}
          >
            {/* Arrow */}
            <div className="self-start pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="
                  h-3 w-3
                  text-[#3a3530]

                  sm:h-3.5 sm:w-3.5

                  lg:h-4 lg:w-4
                "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>

            {/* Scroll label */}
            <div
              className="
                flex
                flex-col
                items-center
                gap-1
                self-end
                pointer-events-none

                sm:gap-2
              "
            >
              <span
                className="
                  text-[6px]
                  tracking-[0.15em]
                  uppercase
                  text-[#3a3530]

                  sm:text-[8px]

                  lg:text-[10px]
                  lg:tracking-[0.2em]
                "
              >
                Scroll
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-[40%]" />
    </section>
  );
};

export default About;