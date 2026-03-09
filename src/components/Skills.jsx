import { ChevronDown, Rabbit } from "lucide-react";

export default function Skills() {
  return (
    <section className="section flex items-center justify-end h-dvh relative font-jost text-[#ffeded] pr-[5%]">
      <div className="flex flex-col items-end text-right gap-4">
        {/* Main heading + rabbit inline */}
        <div className="flex items-center gap-4">
          <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.15] font-light tracking-tight normal-case text-[#c9b896]">
            What are you <span className="italic font-bold">still</span> waiting for?
          </h2>
          <Rabbit className="w-14 h-14 text-[#c9b896] shrink-0" />
        </div>

        {/* Subtext — right aligned */}
        <div className="flex items-center gap-2">
          <p className="text-sm tracking-wide normal-case text-[#c9b896]">Let&apos;s connect</p>
          <ChevronDown className="w-4 h-4 text-[#c9b896] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
