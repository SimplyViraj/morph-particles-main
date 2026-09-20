
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
      className="section relative flex h-dvh items-center font-jost text-[#ffeded]"
    >
      {/* Left — Name */}
      <div className="hidden h-full w-1/2 flex-col items-center justify-start pt-12 lg:flex">
        <div className="w-[80%] rounded-full border border-[#3a3530] bg-[#1e1915]/80 px-8 py-3 text-center backdrop-blur-sm">
          <span className="text-lg font-light italic leading-[1.25] tracking-normal text-[#c9b896]">
            Viraj Tammana
          </span>
        </div>
      </div>

      {/* Right — Bento Grid */}
      <div className="flex h-full w-full items-center justify-center px-6 animate-fadeIn lg:w-1/2 lg:pl-4 lg:pr-[5%]">
        <div className="grid aspect-square w-full max-w-[620px] grid-cols-[1.2fr_1fr] grid-rows-2 gap-3">

          {/* Headline */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#1e1915] p-6">
            <div className="flex justify-end">
              <svg
                className="h-10 w-10 text-[#c9b896]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2L14.09 8.26L20.18 8.64L15.54 12.74L17.09 18.82L12 15.4L6.91 18.82L8.46 12.74L3.82 8.64L9.91 8.26L12 2Z" />
              </svg>
            </div>

            <h1 className="text-[clamp(1.1rem,2vw,1.5rem)] font-light leading-[1.25] tracking-tight text-[#c9b896]">
              Engineering{" "}
              <span className="font-bold italic">systems</span>
              <br />
              that scale,
              <br />
              <span className="italic">without</span> the noise.
            </h1>
          </div>

          {/* Portrait */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/images/Viraj.jpeg"
              alt="Viraj Tammana"
              className="h-full w-full scale-150 object-cover"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#1e1915] p-5">
            <span
              className="text-xl text-[#c9b896]"
              aria-hidden="true"
            >
              &#x2767;
            </span>

            <p className="mt-auto text-[12px] leading-[1.7] text-[#8a8078]">
              Software Engineer focused on backend systems, full-stack
              development, and intelligent applications. I build with
              .NET, TypeScript, cloud infrastructure, and modern AI.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#b8a990] p-5">
            <div className="flex items-start justify-between">
              <span className="text-[11px] italic text-[#3a3530]">
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
                  className="h-4 w-4"
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
              <p className="text-2xl font-semibold leading-tight text-[#3a3530]">
                Get in <span className="font-normal italic">touch</span>
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
