import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

const links = [
  { icon: Mail, label: "Email", href: "mailto:maanyachadalavada@gmail.com", value: "maanyachadalavada@gmail.com" },
  { icon: Github, label: "GitHub", href: "https://github.com/Maanya188", value: "github.com/Maanya188" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/chadalavadamaanya/", value: "linkedin.com/chadalavadamaanya" },
];

export default function Contact() {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const scroller = document.getElementById('fake-scroll');
    const target = document.getElementById(id);
    if (scroller && target) scroller.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="section min-h-dvh relative font-jost text-[#ffeded] flex items-end pb-4">
      <div className="w-full px-8 lg:px-[5%] py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 max-w-7xl mx-auto">

          {/* CTA card */}
          <div className="lg:col-span-2 rounded-2xl bg-[#b8a990] p-12 flex flex-col justify-between min-h-[320px]">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#5a5040]">
              Get in touch
            </span>
            <div>
              <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] font-light tracking-tight normal-case text-[#3a3530] mb-4">
                Let&apos;s create
                <br />
                something <span className="italic font-bold">great.</span>
              </h2>
              <p className="text-sm leading-[1.7] normal-case text-[#5a5040] max-w-md">
                I&apos;m always open to new opportunities, collaborations, and interesting
                conversations. Don&apos;t hesitate to reach out!
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-[#1e1915] border border-[#2a2420] p-6 flex items-center justify-between group hover:border-[#c9b896]/30 transition-colors duration-300 flex-1"
              >
                <div className="flex items-center gap-4">
                  <link.icon className="w-5 h-5 text-[#c9b896]" />
                  <div>
                    <span className="text-[10px] text-[#8a8078] normal-case block">{link.label}</span>
                    <span className="text-sm text-[#c9b896] normal-case">{link.value}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8a8078] group-hover:text-[#c9b896] transition-colors" />
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="lg:col-span-3 rounded-2xl bg-[#1e1915] border border-[#2a2420] p-2 flex items-center justify-between">
            <span className="text-sm text-[#8a8078] italic normal-case">
              Maanya Chadalavada &copy; 2026
            </span>
            <a href="#hero" onClick={scrollTo('hero')} className="text-[10px] text-[#8a8078] hover:text-[#c9b896] transition-colors uppercase tracking-[0.3em]">
              Back to top &uarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
