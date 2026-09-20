
import { ArrowUpRight } from "lucide-react";

const projects = [{ title: "Advanced Data Warehouse Analytics", description: "Data warehouse built with ETL workflows and complex T-SQL queries.", tags: ["SQL Server", "T-SQL", "ETL"], light: false, link: "https://github.com/SimplyViraj/Data-Warehouse-Project", }, { title: "Multimodal Disease Classification", description: "Multimodal deep learning system combining chest X-rays and clinical reports using DenseNet-121, PubMedBERT, and adaptive Mixture-of-Modality Experts for thoracic disease classification.", tags: ["Python", "Transformers", "DenseNet-121"], light: true, link: "https://github.com/SimplyViraj/Multimodal-Medical-Diagnosis-", }, { title: "Buxx", description: "Secure accounting platform supporting Admins, Super Admins, Tax Authorities, and individual users with RBAC, authorization workflows, audit operations, and real-time notifications.", tags: ["MERN", "TypeScript", "MongoDB"], light: false, link: "https://github.com/SimplyViraj/Buxx-Accounting-System", }, { title: "Automated Crop Insurance", description: "Blockchain-based architecture for automated crop insurance settlement using smart contracts and real-time weather data as triggers for claim payouts.", tags: ["Blockchain", "Smart Contracts", "FinTech"], light: true, link: "https://drive.google.com/file/d/1gr_M8GsfbX7jqufwnjG93gJnzCWcK-aV/view?usp=sharing", },];
export default function Projects() {
  return (
    <section
      className="
        section
        relative
        flex
        min-h-dvh
        w-full
        pt-[40dvh]
    lg:pt-0
        items-center
        -mt-[7vh]
        font-jost
        text-[#ffeded]
      "
    >
      {/* =====================================================
          LEFT — EMPTY FOR 3D MODEL
      ====================================================== */}
      <div className="hidden lg:block lg:w-[40%]" />

      {/* =====================================================
          RIGHT — PROJECT CONTENT
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
          lg:pr-[5%]
          lg:pl-8
          lg:py-16
        "
      >
        <div
          className="
            grid
            grid-cols-3
            gap-2

            sm:gap-3
          "
        >
          {/* =================================================
              TITLE CARD — FULL WIDTH
          ================================================== */}
          <div
            className="
              col-span-3
              flex
              min-h-[70px]
              items-end
              justify-between
              rounded-xl
              bg-[#1e1915]
              p-3

              sm:min-h-[85px]
              sm:rounded-2xl
              sm:p-4

              lg:min-h-0
              lg:p-4
            "
          >
            <h2
              className="
                text-[clamp(0.85rem,4vw,1.25rem)]
                font-light
                leading-[1.1]
                tracking-tight
                normal-case
                text-[#b8a990]

                sm:text-[clamp(1rem,2.5vw,1.5rem)]

                lg:text-[clamp(1rem,2.5vw,2rem)]
              "
            >
              Selected{" "}
              <span className="font-bold italic">
                projects
              </span>
            </h2>

            <span
              className="
                text-[6px]
                font-light
                tracking-[0.2em]
                uppercase
                text-[#5a5040]

                sm:text-[8px]

                lg:text-[10px]
                lg:tracking-[0.3em]
              "
            >
              Work
            </span>
          </div>

          {/* =================================================
              PROJECT CARDS
          ================================================== */}
          {projects.map((project, i) => (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={project.title}
              className={`
                group
                flex
                min-h-[170px]
                cursor-pointer
                flex-col
                justify-between
                rounded-xl
                p-3
                transition-all
                duration-300
                hover:scale-[1.02]

                sm:min-h-[210px]
                sm:rounded-2xl
                sm:p-5

                lg:min-h-[280px]
                lg:p-8

                ${
                  i === 1
                    ? "col-span-2"
                    : i === 2
                    ? "col-span-2"
                    : "col-span-1"
                }

                ${
                  project.light
                    ? "bg-[#b8a990]"
                    : "border border-[#2a2420] bg-[#1e1915]"
                }
              `}
            >
              {/* =================================================
                  TAGS + ARROW
              ================================================== */}
              <div className="flex items-start justify-between gap-1">
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`
                        rounded-full
                        px-1.5
                        py-0.5
                        text-[6px]
                        font-light
                        tracking-wide
                        normal-case

                        sm:px-2
                        sm:py-1
                        sm:text-[8px]

                        lg:px-3
                        lg:text-[10px]

                        ${
                          project.light
                            ? "bg-[#a89880] text-[#3a3530]"
                            : "bg-[#2a2420] text-[#c9b896]"
                        }
                      `}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <ArrowUpRight
                  className={`
                    h-3 w-3
                    shrink-0
                    transition-colors

                    sm:h-4 sm:w-4

                    lg:h-5 lg:w-5

                    ${
                      project.light
                        ? "text-[#5a5040] group-hover:text-[#3a3530]"
                        : "text-[#8a8078] group-hover:text-[#c9b896]"
                    }
                  `}
                />
              </div>

              {/* =================================================
                  PROJECT INFO
              ================================================== */}
              <div>
                <h3
                  className={`
                    mb-1
                    text-[10px]
                    font-light
                    leading-[1.2]
                    tracking-tight
                    normal-case

                    sm:mb-2
                    sm:text-sm

                    lg:text-xl

                    ${
                      project.light
                        ? "text-[#3a3530]"
                        : "text-[#c9b896]"
                    }
                  `}
                >
                  {project.title}
                </h3>

                <p
                  className={`
                    text-[7px]
                    leading-[1.5]
                    normal-case

                    sm:text-[9px]
                    sm:leading-[1.6]

                    lg:text-[12px]
                    lg:leading-[1.7]

                    ${
                      project.light
                        ? "text-[#5a5040]"
                        : "text-[#8a8078]"
                    }
                  `}
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

