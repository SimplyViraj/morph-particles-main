import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Scheduler",
    description: "Full-stack scheduling application with a client-server architecture for managing and organizing tasks efficiently.",
    tags: ["JavaScript", "CSS", "Node.js"],
    light: false,
    link: "https://github.com/Maanya188/scheduler",
  },
  {
    title: "SmartHatch",
    description: "A modern hatchery management system with a full-stack JavaScript frontend and server, deployed on Vercel for real-time operational tracking.",
    tags: ["JavaScript", "Vercel", "Full Stack"],
    light: true,
    link: "https://github.com/Maanya188/SmarHatch",
  },
  {
    title: "Hatchery Management System",
    description: "Database-driven hatchery management platform with user authentication, production tracking, and financial assistance modules.",
    tags: ["PHP", "HTML", "SQL"],
    light: false,
    link: "https://github.com/Maanya188/Hatchery-Management-System",
  },
  {
    title: "Phishing URL Classification",
    description: "Machine learning model trained on 91k URLs to classify phishing sites using logistic regression and KNN classifiers.",
    tags: ["Python", "Jupyter", "ML"],
    light: true,
    link: "https://github.com/Maanya188/phising-site-url-classification",
  },
];

export default function Projects() {
  return (
    <section className="section min-h-dvh relative font-jost text-[#ffeded] flex items-center -mt-[7vh]">
      {/* Left — empty for 3D model */}
      <div className="hidden lg:block lg:w-[40%]" />

      {/* Right — project cards grid */}
      <div className="w-full lg:w-[60%] px-8 lg:pr-[5%] lg:pl-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Title card — full width */}
          <div className="md:col-span-3 rounded-2xl bg-[#1e1915] p-4 flex items-end justify-between">
            <h2 className="text-[clamp(1rem,2.5vw,2rem)] leading-[1.1] font-light tracking-tight normal-case text-[#b8a990]">
              Selected <span className="italic font-bold">projects</span>
            </h2>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#5a5040] font-light">Work</span>
          </div>

          {/* Project cards */}
          {projects.map((project, i) => (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={project.title}
              className={`rounded-2xl p-8 flex flex-col justify-between min-h-[280px] group cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                i === 1 ? "md:col-span-2" : i === 2 ? "md:col-span-2" : ""
              } ${
                project.light
                  ? "bg-[#b8a990]"
                  : "bg-[#1e1915] border border-[#2a2420]"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-full text-[10px] font-light tracking-wide normal-case ${
                        project.light
                          ? "bg-[#a89880] text-[#3a3530]"
                          : "bg-[#2a2420] text-[#c9b896]"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight
                  className={`w-5 h-5 transition-colors ${
                    project.light
                      ? "text-[#5a5040] group-hover:text-[#3a3530]"
                      : "text-[#8a8078] group-hover:text-[#c9b896]"
                  }`}
                />
              </div>
              <div>
                <h3
                  className={`text-xl font-light tracking-tight normal-case mb-2 ${
                    project.light ? "text-[#3a3530]" : "text-[#c9b896]"
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`text-[12px] leading-[1.7] normal-case ${
                    project.light ? "text-[#5a5040]" : "text-[#8a8078]"
                  }`}
                >
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
