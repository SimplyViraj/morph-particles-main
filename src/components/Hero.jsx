import { useState, useRef, useEffect } from "react";

export default function Hero() {
  const [activeCard, setActiveCard] = useState(null);
  const [activeTransform, setActiveTransform] = useState({ x: 0, y: 0, scale: 1 });
  const timerRef = useRef(null);
  const cardRefs = useRef({});
  const isLongPressActive = useRef(false);

  const scrollTo = (id) => (e) => {
    // If a long-press just occurred, suppress the default link jump
    if (isLongPressActive.current) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const scroller = document.getElementById("fake-scroll");
    const target = document.getElementById(id);

    if (scroller && target) {
      scroller.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleTouchStart = (cardId) => {
    if (activeCard) return;

    timerRef.current = setTimeout(() => {
      isLongPressActive.current = true;

      // Subtle iPhone haptic pulse
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
        const targetScale = Math.min(1.4, (window.innerWidth * 0.82) / rect.width);

        setActiveTransform({ x: deltaX, y: deltaY, scale: targetScale });
      }

      setActiveCard(cardId);
    }, 450);
  };

  const cancelTouch = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    // Small delay to prevent anchor tags from firing right on release
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
      id="hero"
      className="
        section relative flex
        h-dvh w-full
        flex-col
        items-center
        font-jost text-[#ffeded]
        lg:flex-row
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

      {/* Name Header */}
      <div
        className="
          flex
          w-full
          items-center
          justify-center
          pt-6
          sm:pt-8
          lg:h-full
          lg:w-1/2
          lg:items-start
          lg:justify-center
          lg:pt-12
        "
      >
        <div
          className="
            w-[85%]
            rounded-full
            border border-[#3a3530]
            bg-[#1e1915]/80
            px-5 py-2
            text-center
            backdrop-blur-sm
            sm:w-[75%]
            sm:px-6
            sm:py-2.5
            lg:w-[80%]
            lg:px-8
            lg:py-3
          "
        >
          <span
            className="
              text-sm
              font-light
              italic
              leading-[1.25]
              tracking-normal
              text-[#c9b896]
              sm:text-base
              lg:text-lg
            "
          >
            Viraj Tammana
          </span>
        </div>
      </div>

      {/* Bento Grid */}
      <div
        className="
          flex
          h-full
          w-full
          flex-1
          items-center
          justify-center
          px-3
          pt-[60dvh]
          lg:pt-0
          animate-fadeIn
          sm:px-5
          lg:w-1/2
          lg:flex-none
          lg:pl-4
          lg:pr-[5%]
        "
      >
        <div
          className="
            grid
            aspect-square
            w-full
            max-w-[620px]
            grid-cols-[1.2fr_1fr]
            grid-rows-2
            gap-2
            sm:gap-3
          "
        >
          {/* Card 1: Headline */}
          <div
            ref={(el) => (cardRefs.current["headline"] = el)}
            onTouchStart={() => handleTouchStart("headline")}
            onTouchEnd={cancelTouch}
            onTouchMove={cancelTouch}
            onContextMenu={(e) => e.preventDefault()}
            style={getCardStyle("headline")}
            className={`
              relative flex flex-col justify-between
              rounded-xl
              bg-[#1e1915]
              p-3
              touch-manipulation
              select-none [-webkit-touch-callout:none]
              sm:rounded-2xl
              sm:p-4
              md:p-5
              lg:p-6
              ${
                activeCard === "headline"
                  ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-[#c9b896]/40"
                  : ""
              }
            `}
          >
            <div className="flex justify-end pointer-events-none">
              <svg
                className="
                  h-6 w-6
                  sm:h-7 sm:w-7
                  md:h-8 md:w-8
                  lg:h-10 lg:w-10
                  text-[#c9b896]
                "
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2L14.09 8.26L20.18 8.64L15.54 12.74L17.09 18.82L12 15.4L6.91 18.82L8.46 12.74L3.82 8.64L9.91 8.26L12 2Z" />
              </svg>
            </div>

            <h1
              className="
                pointer-events-none
                text-[clamp(0.85rem,3.5vw,1.5rem)]
                font-light
                leading-[1.2]
                tracking-tight
                text-[#c9b896]
                sm:leading-[1.25]
              "
            >
              Engineering{" "}
              <span className="font-bold italic">systems</span>
              <br />
              that scale,
              <br />
              <span className="italic">without</span> the noise.
            </h1>
          </div>

          {/* Card 2: Portrait */}
          <div
            ref={(el) => (cardRefs.current["portrait"] = el)}
            onTouchStart={() => handleTouchStart("portrait")}
            onTouchEnd={cancelTouch}
            onTouchMove={cancelTouch}
            onContextMenu={(e) => e.preventDefault()}
            style={getCardStyle("portrait")}
            className={`
              relative overflow-hidden rounded-xl sm:rounded-2xl
              touch-manipulation
              select-none [-webkit-touch-callout:none]
              ${
                activeCard === "portrait"
                  ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-[#c9b896]/40"
                  : ""
              }
            `}
          >
            <img
              src="/images/Viraj.jpeg"
              alt="Viraj Tammana"
              className="
                h-full
                w-full
                scale-[1.35]
                object-cover
                pointer-events-none
                sm:scale-150
              "
            />
          </div>

          {/* Card 3: Bio */}
          <div
            ref={(el) => (cardRefs.current["bio"] = el)}
            onTouchStart={() => handleTouchStart("bio")}
            onTouchEnd={cancelTouch}
            onTouchMove={cancelTouch}
            onContextMenu={(e) => e.preventDefault()}
            style={getCardStyle("bio")}
            className={`
              relative flex flex-col justify-between
              rounded-xl
              bg-[#1e1915]
              p-3
              touch-manipulation
              select-none [-webkit-touch-callout:none]
              sm:rounded-2xl
              sm:p-4
              md:p-5
              lg:p-5
              ${
                activeCard === "bio"
                  ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-[#c9b896]/40"
                  : ""
              }
            `}
          >
            <span
              className="
                pointer-events-none
                text-base
                text-[#c9b896]
                sm:text-lg
                md:text-xl
              "
              aria-hidden="true"
            >
              &#x2767;
            </span>

            <p
              className="
                pointer-events-none
                mt-auto
                text-[9px]
                leading-[1.5]
                text-[#8a8078]
                sm:text-[10px]
                sm:leading-[1.6]
                md:text-[11px]
                lg:text-[12px]
                lg:leading-[1.7]
              "
            >
              Software Engineer focused on backend systems, full-stack
              development, and intelligent applications. I build with
              .NET, TypeScript, cloud infrastructure, and modern AI.
            </p>
          </div>

          {/* Card 4: Contact */}
          <div
            ref={(el) => (cardRefs.current["contact"] = el)}
            onTouchStart={() => handleTouchStart("contact")}
            onTouchEnd={cancelTouch}
            onTouchMove={cancelTouch}
            onContextMenu={(e) => e.preventDefault()}
            style={getCardStyle("contact")}
            className={`
              relative flex flex-col justify-between
              rounded-xl
              bg-[#b8a990]
              p-3
              touch-manipulation
              select-none [-webkit-touch-callout:none]
              sm:rounded-2xl
              sm:p-4
              md:p-5
              ${
                activeCard === "contact"
                  ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-[#3a3530]/40"
                  : ""
              }
            `}
          >
            <div className="flex items-start justify-between">
              <span
                className="
                  pointer-events-none
                  text-[8px]
                  italic
                  leading-[1.3]
                  text-[#3a3530]
                  sm:text-[9px]
                  md:text-[10px]
                  lg:text-[11px]
                "
              >
                Let's build
                <br />
                something.
              </span>

              <a
                href="#contact"
                onClick={scrollTo("contact")}
                aria-label="Go to contact section"
                className="text-[#3a3530]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="
                    pointer-events-none
                    h-3 w-3
                    sm:h-3.5 sm:w-3.5
                    md:h-4 md:w-4
                  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </a>
            </div>

            <a
              href="#contact"
              onClick={scrollTo("contact")}
              className="text-left"
            >
              <p
                className="
                  text-[1.1rem]
                  font-semibold
                  leading-tight
                  text-[#3a3530]
                  sm:text-xl
                  md:text-2xl
                "
              >
                Get in{" "}
                <span className="font-normal italic">touch</span>
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}