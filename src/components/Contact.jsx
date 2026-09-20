
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

const links = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:virajtammana@gmail.com",
    value: "virajtammana@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/SimplyViraj",
    value: "github.com/SimplyViraj  ",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/saiviraj/",
    value: "linkedin.com/in/saiviraj",
  },
];

export default function Contact() {
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
      id="contact"
      className="
        section
        relative
        flex
        min-h-dvh
        items-end
        font-jost
        pb-[30dvh]
    lg:pb-[20dvh]
        text-[#ffeded]
        pb-3
        sm:pb-4
      "
    >
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
          lg:max-w-7xl
          lg:px-[5%]
          lg:py-16
        "
      >
        <div className="grid grid-cols-3 gap-2 sm:gap-3">

          {/* CTA card */}
          <div
            className="
              col-span-2
              flex
              min-h-[190px]
              flex-col
              justify-between
              rounded-xl
              bg-[#b8a990]
              p-3
              sm:min-h-[230px]
              sm:rounded-2xl
              sm:p-5
              lg:min-h-[320px]
              lg:p-12
            "
          >
            <span
              className="
                text-[7px]
                tracking-[0.2em]
                uppercase
                text-[#5a5040]
                sm:text-[9px]
                sm:tracking-[0.25em]
                lg:text-[10px]
                lg:tracking-[0.3em]
              "
            >
              Get in touch
            </span>

            <div>
              <h2
                className="
                  mb-2
                  text-[clamp(1rem,4vw,1.4rem)]
                  font-light
                  leading-[1.1]
                  tracking-tight
                  normal-case
                  text-[#3a3530]
                  sm:mb-3
                  sm:text-[clamp(1.4rem,4vw,2rem)]
                  lg:mb-4
                  lg:text-[clamp(2.5rem,4vw,3.5rem)]
                "
              >
                Let&apos;s create
                <br />
                something{" "}
                <span className="font-bold italic">great.</span>
              </h2>

              <p
                className="
                  max-w-md
                  text-[7px]
                  leading-[1.5]
                  normal-case
                  text-[#5a5040]
                  sm:text-[9px]
                  sm:leading-[1.65]
                  lg:text-sm
                  lg:leading-[1.7]
                "
              >
                I&apos;m always open to new opportunities, collaborations, and
                interesting conversations. Don&apos;t hesitate to reach out!
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1 flex flex-col gap-2 sm:gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  min-h-[60px]
                  flex-1
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-[#2a2420]
                  bg-[#1e1915]
                  p-2
                  transition-colors
                  duration-300
                  hover:border-[#c9b896]/30
                  sm:min-h-[70px]
                  sm:rounded-2xl
                  sm:p-3
                  lg:p-6
                "
              >
                <div className="flex min-w-0 items-center gap-2 sm:gap-3 lg:gap-4">
                  <link.icon
                    className="
                      h-3
                      w-3
                      shrink-0
                      text-[#c9b896]
                      sm:h-4
                      sm:w-4
                      lg:h-5
                      lg:w-5
                    "
                  />

                  <div className="min-w-0">
                    <span
                      className="
                        block
                        text-[6px]
                        normal-case
                        text-[#8a8078]
                        sm:text-[8px]
                        lg:text-[10px]
                      "
                    >
                      {link.label}
                    </span>

                    <span
                      className="
                        block
                        truncate
                        text-[7px]
                        normal-case
                        text-[#c9b896]
                        sm:text-[9px]
                        lg:text-sm
                      "
                    >
                      {link.value}
                    </span>
                  </div>
                </div>

                <ArrowUpRight
                  className="
                    h-3
                    w-3
                    shrink-0
                    text-[#8a8078]
                    transition-colors
                    group-hover:text-[#c9b896]
                    sm:h-3.5
                    sm:w-3.5
                    lg:h-4
                    lg:w-4
                  "
                />
              </a>
            ))}
          </div>

          {/* Footer */}
          <div
            className="
              col-span-3
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-[#2a2420]
              bg-[#1e1915]
              p-2
              sm:rounded-2xl
              sm:px-3
            "
          >
            <span
              className="
                text-[7px]
                italic
                normal-case
                text-[#8a8078]
                sm:text-[9px]
                lg:text-sm
              "
            >
              Viraj Tammana &copy; 2026
            </span>

            <a
              href="#hero"
              onClick={scrollTo("hero")}
              className="
                text-[6px]
                uppercase
                tracking-[0.15em]
                text-[#8a8078]
                transition-colors
                hover:text-[#c9b896]
                sm:text-[8px]
                sm:tracking-[0.2em]
                lg:text-[10px]
                lg:tracking-[0.3em]
              "
            >
              Back to top &uarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
