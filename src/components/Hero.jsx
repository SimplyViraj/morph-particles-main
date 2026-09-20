
export default function Hero() {
  const scrollTo = (id) => (e) => {
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
          {/* Headline */}
          <div
            className="
              flex flex-col justify-between
              rounded-xl
              bg-[#1e1915]
              p-3
              sm:rounded-2xl
              sm:p-4
              md:p-5
              lg:p-6
            "
          >
            <div className="flex justify-end">
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

          {/* Portrait */}
          <div className="overflow-hidden rounded-xl sm:rounded-2xl">
            <img
              src="/images/Viraj.jpeg"
              alt="Viraj Tammana"
              className="
                h-full
                w-full
                scale-[1.35]
                object-cover
                sm:scale-150
              "
            />
          </div>

          {/* Bio */}
          <div
            className="
              flex flex-col justify-between
              rounded-xl
              bg-[#1e1915]
              p-3
              sm:rounded-2xl
              sm:p-4
              md:p-5
              lg:p-5
            "
          >
            <span
              className="
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

          {/* Contact */}
          <div
            className="
              flex flex-col justify-between
              rounded-xl
              bg-[#b8a990]
              p-3
              sm:rounded-2xl
              sm:p-4
              md:p-5
            "
          >
            <div className="flex items-start justify-between">
              <span
                className="
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

