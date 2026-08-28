"use client";

import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Scissors,
  Sparkles,
} from "lucide-react";

import PageIntro from "@/components/PageIntro";

const services = [
  {
    number: "01",
    name: "Corte Signature",
    description:
      "Corte personalizado, asesoría de estilo, terminación y styling profesional.",
    time: "45 min",
    price: "₡9.500",
  },
  {
    number: "02",
    name: "Barba Premium",
    description:
      "Perfilado de barba, líneas precisas, toalla caliente y acabado profesional.",
    time: "35 min",
    price: "₡7.500",
  },
  {
    number: "03",
    name: "Corte + Barba",
    description:
      "Servicio completo de corte y barba para conseguir un acabado uniforme.",
    time: "70 min",
    price: "₡15.500",
  },
  {
    number: "04",
    name: "Fade & Styling",
    description:
      "Degradado detallado con terminación, textura y styling personalizado.",
    time: "50 min",
    price: "₡10.500",
  },
  {
    number: "05",
    name: "Perfilado de Barba",
    description:
      "Mantenimiento y definición de líneas para conservar una barba limpia.",
    time: "25 min",
    price: "₡5.500",
  },
  {
    number: "06",
    name: "Club Experience",
    description:
      "Nuestra experiencia completa: corte, barba, tratamiento y styling final.",
    time: "90 min",
    price: "₡19.500",
  },
];

export default function ServiciosPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0d0d0d] text-[#f3eee7]">
      {/* ENTRADA PROFESIONAL */}
      <PageIntro
        title="SERVICIOS"
        subtitle="Técnica · Precisión · Detalle"
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

      {/* HERO */}
      <section className="px-6 pb-16 pt-20 md:px-10 lg:pb-24 lg:pt-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 55,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.35,
              }}
              className="flex items-center gap-3 text-[#c8a97e]"
            >
              <Sparkles size={14} />

              <p className="text-[9px] uppercase tracking-[0.4em]">
                Nuestros servicios
              </p>
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 45,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 max-w-5xl text-6xl leading-[0.88] tracking-[-0.065em] md:text-8xl lg:text-9xl"
            >
              El detalle
              <br />
              hace la diferencia.
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.5,
              }}
              className="mt-8 max-w-xl text-sm leading-7 text-white/45 md:text-base"
            >
              Servicios diseñados para combinar técnica, precisión y una
              experiencia cuidada de principio a fin.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* LISTA DE SERVICIOS */}
      <section className="px-6 pb-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="border-y border-white/10"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{
                  opacity: 0,
                  y: 45,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group border-b border-white/10 last:border-b-0"
              >
                <div className="grid gap-6 py-8 md:grid-cols-[70px_1fr_130px_140px_auto] md:items-center lg:py-10">
                  <motion.span
                    whileHover={{
                      x: 4,
                    }}
                    className="text-xs text-white/20"
                  >
                    {service.number}
                  </motion.span>

                  <div>
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{
                          rotate: -12,
                          scale: 1.12,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                      >
                        <Scissors
                          size={17}
                          className="text-[#c8a97e]"
                        />
                      </motion.div>

                      <h2 className="text-2xl tracking-[-0.04em] transition duration-300 group-hover:text-[#c8a97e] md:text-3xl">
                        {service.name}
                      </h2>
                    </div>

                    <p className="mt-3 max-w-xl text-xs leading-6 text-white/35">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-white/40">
                    <Clock3 size={14} />
                    {service.time}
                  </div>

                  <p className="text-xl tracking-[-0.03em]">
                    {service.price}
                  </p>

                  <motion.a
                    whileHover={{
                      scale: 1.08,
                    }}
                    whileTap={{
                      scale: 0.94,
                    }}
                    href={`/reservar?servicio=${encodeURIComponent(
                      service.name
                    )}`}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition duration-300 group-hover:border-[#c8a97e] group-hover:bg-[#c8a97e] group-hover:text-[#111]"
                    aria-label={`Reservar ${service.name}`}
                  >
                    <ArrowRight size={17} />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
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
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="border-t border-white/10 bg-[#151515] px-6 py-24 md:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-end">
          <motion.div
            initial={{
              opacity: 0,
              x: -45,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
            }}
          >
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#c8a97e]">
              Tu próxima visita
            </p>

            <h2 className="mt-5 text-5xl leading-[0.95] tracking-[-0.055em] md:text-7xl">
              Tu estilo merece
              <br />
              su espacio.
            </h2>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 45,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
              delay: 0.1,
            }}
            className="md:text-right"
          >
            <p className="ml-auto max-w-md text-sm leading-7 text-white/40">
              Selecciona el servicio, tu barbero preferido y el horario que mejor
              se adapte a ti.
            </p>

            <motion.a
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              href="/reservar"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#f0e7dc] px-7 py-4 text-sm text-[#111]"
            >
              Reservar cita
              <ArrowRight size={17} />
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p className="text-xs tracking-[0.15em] text-white/45">
            BARBER CLUB
          </p>

          <p className="text-[10px] text-white/25">
            Precisión · Estilo · Presencia
          </p>
        </div>
      </footer>
    </main>
  );
}