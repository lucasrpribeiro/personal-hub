"use client";

import { motion } from "motion/react";
import { careerExperiences } from "@/data/timeline";
import { ChevronRight, MapPin, Calendar, Sparkles } from "lucide-react";
import { BorderBeam } from "@/components/ui/BorderBeam";

export function CareerTimeline() {
  return (
    <section id="timeline" className="relative scroll-mt-24">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
          Evolução de Carreira & Experiências Tech
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl">
          Marcos de engenharia, liderança técnica e construção de sistemas web robustos ao longo do tempo.
        </p>
      </div>

      <div className="relative border-l border-zinc-800 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-12">
        {careerExperiences.map((exp, index) => {
          const isCurrent = index === 0;

          return (
            <motion.div
              key={exp.company + exp.period}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Nó do marco com pulso e borda */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950 group-hover:border-cyan-400 group-hover:shadow-[0_0_8px_rgba(56,189,248,0.4)] transition-all">
                <div
                  className={`h-2 w-2 rounded-full ${
                    isCurrent ? "bg-emerald-400 animate-ping" : "bg-cyan-400"
                  }`}
                />
              </div>

              {/* Cabeçalho da experiência */}
              <div className="relative overflow-hidden rounded border border-zinc-800/80 bg-zinc-950/70 p-5 sm:p-6 transition-all group-hover:border-zinc-700">
                {/* Border Beam apenas na posição atual ativa */}
                {isCurrent && (
                  <BorderBeam
                    size={200}
                    duration={10}
                    colorFrom="#10b981"
                    colorTo="#38bdf8"
                  />
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-900 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-100 flex items-center space-x-2">
                      <span>{exp.role}</span>
                      {isCurrent && (
                        <span className="rounded bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                          Posição Atual
                        </span>
                      )}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 text-xs font-mono text-zinc-400">
                      <span className="text-cyan-400 font-semibold">{exp.company}</span>
                      {exp.location && (
                        <span className="flex items-center text-zinc-400">
                          <MapPin className="mr-1 h-3 w-3" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 rounded border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 font-mono text-xs text-zinc-400">
                    <Calendar className="h-3 w-3 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Descrição */}
                <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Conquistas de Destaque */}
                <div className="mt-4 space-y-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 block">
                    // Principais Entregas & Impacto
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-400">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <ChevronRight className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills / Stacks utilizadas */}
                <div className="mt-5 flex flex-wrap gap-1.5 pt-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-zinc-800/90 bg-zinc-900/50 px-2 py-0.5 font-mono text-[11px] text-zinc-300 transition-colors group-hover:border-zinc-700 hover:text-cyan-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
