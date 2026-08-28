"use client";

import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Scissors,
  Sparkles,
  UserRound,
} from "lucide-react";

import PageIntro from "@/components/PageIntro";

const barbers = [
  {
    number: "01",
    name: "Santiago",
    initial: "S",
    specialty: "Fades & Styling",
    experience: "6 años de experiencia",
    description:
      "Especialista en degradados, cortes modernos y acabados limpios con atención a cada detalle.",
  },
  {
    number: "02",
    name: "Marco",
    initial: "M",
    specialty: "Barba & Clásicos",
    experience: "8 años de experiencia",
    description:
      "Enfocado en cortes clásicos, diseño de barba y servicios tradicionales con acabado premium.",
  },
  {
    number: "03",
    name: "Andrés",
    initial: "A",
    specialty: "Corte moderno",
    experience: "5 años de experiencia",
    description:
      "Especializado en estilos actuales, textura y asesoría para encontrar el corte que mejor se adapta a cada cliente.",
  },
];

export default function EquipoPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0d0d0d] text-[#f3eee7]">
      <PageIntro
        title="NUESTRO EQUIPO"
        subtitle="Experiencia · Técnica · Estilo"
      />

      {/* HEADER */}
      <header className="border-b border-white/10 px-6 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between py-6">
          <a
            href="/"
            className="flex items-center gap-3 text-sm text-white/55 transition duration-300 hover:text-white"
          >
            <ArrowLeft size={17} />
            Volver
          </a>

          <a href="/" className="text-center">
            <p className="text-sm font-semibold tracking-[0.18em]">
              BARBER CLUB
            </p>

            <p className="mt-1 text-[7px] uppercase tracking-[0.4em] text-[#c8a97e]">
              Est. 2026
            </p>
          </a>

          <a
            href="/reservar"
            className="rounded-full border border-white/15 px-5 py-3 text-xs transition duration-300 hover:border-[#c8a97e] hover:bg-[#c8a97e] hover:text-[#111]"
          >
            Reservar
          </a>
        </div>
      </header>

      {/* INTRO */}
      <section className="px-6 pb-16 pt-20 md:px-10 lg:pb-24 lg:pt-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center gap-3 text-[#c8a97e]">
              <Sparkles size={14} />

              <p className="text-[9px] uppercase tracking-[0.4em]">
                Profesionales Barber Club
              </p>
            </div>

            <h1 className="mt-6 max-w-5xl text-6xl leading-[0.88] tracking-[-0.065em] md:text-8xl lg:text-9xl">
              El estilo empieza
              <br />
              con las manos correctas.
            </h1>

            <p className="mt-8 max-w-2xl text-sm leading-7 text-white/45 md:text-base">
              Cada profesional aporta su propia técnica, experiencia y forma de
              trabajar para ofrecer un servicio adaptado a cada cliente.
            </p>
          </motion.div>
        </div>
      </section>

      {/* EQUIPO */}
      <section className="px-6 pb-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-3">
            {barbers.map((barber, index) => (
              <motion.article
                key={barber.name}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -8,
                }}
                className="group relative min-h-[520px] overflow-hidden rounded-[34px] border border-white/10 bg-[#151515] p-8"
              >
                {/* NUMERO */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.3em] text-white/25">
                    {barber.number}
                  </span>

                  <Scissors
                    size={18}
                    className="text-[#c8a97e] transition duration-300 group-hover:-rotate-12"
                  />
                </div>

                {/* INICIAL GRANDE */}
                <div className="relative mt-10 flex h-[210px] items-center justify-center overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#101010]">
                  <motion.span
                    whileHover={{
                      scale: 1.06,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="select-none text-[150px] font-semibold leading-none tracking-[-0.08em] text-white/[0.06]"
                  >
                    {barber.initial}
                  </motion.span>

                  <div className="absolute flex h-20 w-20 items-center justify-center rounded-full border border-[#c8a97e]/30 bg-[#c8a97e]/10 text-[#c8a97e]">
                    <UserRound size={27} />
                  </div>
                </div>

                {/* INFO */}
                <div className="mt-8">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-[#c8a97e]">
                    {barber.specialty}
                  </p>

                  <h2 className="mt-4 text-4xl tracking-[-0.05em]">
                    {barber.name}
                  </h2>

                  <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/30">
                    {barber.experience}
                  </p>

                  <p className="mt-5 text-sm leading-7 text-white/40">
                    {barber.description}
                  </p>

                  <a
                    href={`/reservar?barbero=${encodeURIComponent(barber.name)}`}
                    className="mt-7 inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-sm transition duration-300 hover:border-[#c8a97e] hover:bg-[#c8a97e] hover:text-[#111]"
                  >
                    Reservar con {barber.name}
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="border-y border-white/10 bg-[#111] px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 text-[#c8a97e]">
              <CalendarDays size={15} />

              <p className="text-[9px] uppercase tracking-[0.4em]">
                Reserva en segundos
              </p>
            </div>

            <h2 className="mt-5 max-w-4xl text-5xl leading-[0.95] tracking-[-0.055em] md:text-7xl">
              Una cita sin llamadas
              <br />
              ni mensajes innecesarios.
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-4 md:grid-cols-4">
            {[
              {
                number: "01",
                title: "Elige servicio",
                text: "Selecciona el servicio que necesitas.",
              },
              {
                number: "02",
                title: "Elige barbero",
                text: "Escoge el profesional de tu preferencia.",
              },
              {
                number: "03",
                title: "Fecha y hora",
                text: "Selecciona el horario disponible.",
              },
              {
                number: "04",
                title: "Confirmación",
                text: "Tu cita queda registrada al instante.",
              },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.09,
                }}
                className="rounded-[28px] border border-white/10 bg-white/[0.02] p-7"
              >
                <span className="text-[10px] tracking-[0.3em] text-[#c8a97e]">
                  {step.number}
                </span>

                <h3 className="mt-7 text-2xl tracking-[-0.04em]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/35">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <a
              href="/reservar"
              className="inline-flex items-center gap-3 rounded-full bg-[#f0e7dc] px-7 py-4 text-sm text-[#111]"
            >
              Probar reserva
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* MENSAJE DEMO */}
      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
            }}
            className="rounded-[38px] border border-white/10 bg-[#151515] p-8 md:p-12"
          >
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#c8a97e]">
              Experiencia adaptable
            </p>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <h2 className="text-4xl leading-[0.98] tracking-[-0.05em] md:text-6xl">
                Cada barbería puede tener
                <br />
                su propio equipo.
              </h2>

              <p className="text-sm leading-7 text-white/40">
                Los perfiles, especialidades, horarios y servicios pueden
                adaptarse a cada negocio para crear una experiencia de reserva
                totalmente personalizada.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-xs tracking-[0.15em] text-white/45">
              BARBER CLUB
            </p>

            <p className="mt-2 text-[10px] text-white/25">
              Precisión · Estilo · Presencia
            </p>
          </div>

          <a
            href="/reservar"
            className="inline-flex items-center gap-2 text-xs text-white/45 transition hover:text-white"
          >
            Reservar una cita
            <ArrowRight size={14} />
          </a>
        </div>
      </footer>
    </main>
  );
}