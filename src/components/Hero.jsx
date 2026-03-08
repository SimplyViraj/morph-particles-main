export default function Hero() {
  return (
    <section className="section flex items-center h-dvh relative font-jost text-[#ffeded]">
      {/* Left side — name header over the 3D model */}
      <div className="hidden lg:flex lg:w-1/2 h-full flex-col items-center justify-start pt-12">
        <div className="w-[80%] rounded-full border border-[#3a3530] bg-[#1e1915]/80 backdrop-blur-sm py-3 px-8 text-center">
          <span className="text-lg tracking-normal normal-case text-[#c9b896] leading-[1.25]  font-light italic">Maanya Chadalavada</span>
        </div>
      </div>

      {/* Right side — 2×2 bento grid */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center px-6 lg:pr-[5%] lg:pl-4 animate-fadeIn">
        <div className="grid grid-cols-[1.2fr_1fr] grid-rows-2 gap-3 w-full max-w-[620px] aspect-square">

          {/* Row 1, Left — Headline card */}
          <div className="rounded-2xl bg-[#1e1915] p-6 flex flex-col justify-between">
            <div className="flex justify-end">
              <svg className="w-10 h-10 text-[#c9b896]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.09 8.26L20.18 8.64L15.54 12.74L17.09 18.82L12 15.4L6.91 18.82L8.46 12.74L3.82 8.64L9.91 8.26L12 2Z"/>
              </svg>
            </div>
            <h1 className="text-[clamp(1.1rem,2vw,1.5rem)] leading-[1.25] font-light tracking-tight normal-case text-[#c9b896]">
              Creative <span className="font-bold italic">direction</span>
              <br />grounded in clarity
              <br /><span className="italic">and</span> emotion.
            </h1>
          </div>

          {/* Row 1, Right — Portrait photo */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/images/Maanya.jpeg"
              alt="portrait"
              className="w-full h-full scale-150 object-cover"
            />
          </div>

          {/* Row 2, Left — Bio card */}
          <div className="rounded-2xl bg-[#1e1915] p-5 flex flex-col justify-between">
            <span className="text-xl text-[#c9b896]">&#x2767;</span>
            <p className="text-[12px] leading-[1.7] normal-case text-[#8a8078] mt-auto">
             A Computer Science student with a passion for Software Engineering, Data Analysis and Full Stack Web Development. Im always looking forward to learn new technologies and test them out like a real engineer
            </p>
          </div>

          {/* Row 2, Right — Contact card */}
          <div className="rounded-2xl bg-[#b8a990] p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-[11px] normal-case text-[#3a3530] italic">Have some<br/>questions?</span>
              <a href="#contact" className="text-[#3a3530]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
            <a href="#contact" className="normal-case">
              <p className="text-2xl font-semibold text-[#3a3530] leading-tight">
                Contact <span className="italic font-normal">me</span>
              </p>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
