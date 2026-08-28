"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  MapPin,
  MessageCircle,
  Scissors,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageIntro from "@/components/PageIntro";

const experiences = [
  {
    number: "01",
    title: "Corte Signature",
    subtitle: "Precisión y acabado limpio",
    description:
      "Un corte personalizado según tu estilo, textura de cabello y forma del rostro.",
    price: "₡9.500",
    image:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "02",
    title: "Barba Premium",
    subtitle: "Perfilado, ritual y detalle",
    description:
      "Diseño de barba, toalla caliente y terminación profesional para un acabado impecable.",
    price: "₡7.500",
    image:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "03",
    title: "Club Experience",
    subtitle: "Corte + barba + styling",
    description:
      "La experiencia completa de Barber Club para salir listo, pulido y con presencia.",
    price: "₡15.500",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=85",
  },
];

const reviews = [
  {
    name: "Daniel R.",
    service: "Corte Signature",
    text: "La atención se siente cuidada desde que reservas. El corte quedó exactamente como lo pedí.",
  },
  {
    name: "Kevin M.",
    service: "Corte + Barba",
    text: "Muy buen ambiente, puntualidad y excelente acabado. La reserva online hace todo más fácil.",
  },
  {
    name: "Sebastián C.",
    service: "Club Experience",
    text: "Se nota el detalle en todo el servicio. Salí listo y sin perder tiempo coordinando por mensajes.",
  },
];

const hours = [
  ["Lunes", "9:00 AM — 7:00 PM"],
  ["Martes", "9:00 AM — 7:00 PM"],
  ["Miércoles", "9:00 AM — 7:00 PM"],
  ["Jueves", "9:00 AM — 7:00 PM"],
  ["Viernes", "9:00 AM — 8:00 PM"],
  ["Sábado", "9:00 AM — 6:00 PM"],
  ["Domingo", "Cerrado"],
];

export default function Home() {
  const showcaseRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".barber-scene");

      if (!showcaseRef.current || slides.length === 0) return;

      gsap.set(slides, {
        opacity: 0,
        pointerEvents: "none",
      });

      gsap.set(slides[0], {
        opacity: 1,
        pointerEvents: "auto",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: "top top",
          end: `+=${experiences.length * 1200}`,
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      slides.forEach((slide, index) => {
        const image = slide.querySelector(".scene-image");
        const content = slide.querySelector(".scene-content");
        const number = slide.querySelector(".scene-number");

        if (index === 0) {
          timeline.fromTo(
            image,
            {
              scale: 1.12,
              y: 40,
            },
            {
              scale: 1,
              y: 0,
              duration: 1.1,
              ease: "none",
            },
            0
          );

          timeline.fromTo(
            content,
            {
              opacity: 0,
              x: 80,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
            },
            0.1
          );

          return;
        }

        const previous = slides[index - 1];
        const position = index * 1.5;

        timeline.to(
          previous,
          {
            opacity: 0,
            duration: 0.45,
            pointerEvents: "none",
          },
          position
        );

        timeline.set(
          slide,
          {
            pointerEvents: "auto",
          },
          position
        );

        timeline.fromTo(
          slide,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.5,
          },
          position
        );

        timeline.fromTo(
          image,
          {
            scale: 1.12,
            x: index % 2 === 0 ? -90 : 90,
          },
          {
            scale: 1,
            x: 0,
            duration: 1.1,
            ease: "none",
          },
          position
        );

        timeline.fromTo(
          content,
          {
            opacity: 0,
            x: 90,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
          },
          position + 0.1
        );

        timeline.fromTo(
          number,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 0.08,
            y: 0,
            duration: 0.8,
          },
          position
        );
      });
    }, showcaseRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="overflow-x-hidden bg-[#0d0d0d] text-[#f3eee7]">
      <PageIntro />
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(8,8,8,.96) 0%, rgba(8,8,8,.72) 45%, rgba(8,8,8,.25) 100%), url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1800&q=90')",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(189,147,94,0.12),transparent_35%)]" />

        {/* NAV */}
        <nav className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 md:px-10">
          <a href="/" className="leading-none">
            <span className="text-xl font-semibold tracking-[0.16em]">
              BARBER CLUB
            </span>

            <span className="mt-1 block text-[8px] uppercase tracking-[0.48em] text-[#c8a97e]">
              Est. 2026
            </span>
          </a>

          <div className="hidden items-center gap-8 text-xs text-white/65 md:flex">
            <a href="#experiencia" className="hover:text-white">
              Experiencia
            </a>

            <a href="/servicios" className="hover:text-white">
              Servicios
            </a>

            <a href="/equipo" className="hover:text-white">
              Equipo
            </a>

            <a href="/reservar" className="hover:text-white">
              Reservar
            </a>
          </div>

          <a
            href="/reservar"
            className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-xs backdrop-blur-xl"
          >
            Reservar cita
          </a>
        </nav>

        {/* HERO CONTENT */}
        <div className="relative z-20 mx-auto flex min-h-[calc(100vh-100px)] max-w-7xl items-center px-6 md:px-10">
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
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-4xl"
          >
            <p className="text-[10px] uppercase tracking-[0.45em] text-[#c8a97e]">
              Barbería contemporánea
            </p>

            <h1 className="mt-6 max-w-4xl text-[15vw] leading-[0.82] tracking-[-0.065em] sm:text-[12vw] lg:text-[7.4vw]">
              Precisión.
              <br />
              Estilo.
              <br />
              Presencia.
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-7 text-white/55 md:text-base">
              Una experiencia de barbería creada para quienes cuidan cada detalle
              de su imagen.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="/reservar"
                className="inline-flex items-center gap-3 rounded-full bg-[#f0e7dc] px-7 py-4 text-sm text-[#111]"
              >
                Reservar cita
                <CalendarDays size={17} />
              </a>

              <a
                href="/servicios"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-sm"
              >
                Ver servicios
                <ArrowRight size={17} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-white/35">
          <span className="text-[8px] uppercase tracking-[0.35em]">
            Scroll
          </span>

          <motion.div
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </section>

      {/* EXPERIENCIA CON SCROLL */}
      <section
        ref={showcaseRef}
        id="experiencia"
        className="relative h-screen overflow-hidden bg-[#111]"
      >
        <div className="absolute left-6 top-7 z-40 md:left-10">
          <p className="text-[9px] uppercase tracking-[0.38em] text-white/40">
            Barber Club Experience
          </p>
        </div>

        <div className="absolute right-6 top-7 z-40 text-[9px] tracking-[0.3em] text-white/35 md:right-10">
          01 — 03
        </div>

        {experiences.map((item) => (
          <div
            key={item.number}
            className="barber-scene absolute inset-0 grid h-screen lg:grid-cols-[1.08fr_0.92fr]"
          >
            {/* IMAGEN */}
            <div className="relative min-h-[50vh] overflow-hidden lg:min-h-screen">
              <div
                className="scene-image absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `
                    linear-gradient(
                      180deg,
                      rgba(0,0,0,.06),
                      rgba(0,0,0,.25)
                    ),
                    url('${item.image}')
                  `,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111]/35" />

              <div className="scene-number absolute bottom-[-4%] left-[4%] text-[24vw] font-semibold leading-none tracking-[-0.09em] text-white opacity-[0.08] lg:text-[15vw]">
                {item.number}
              </div>
            </div>

            {/* TEXTO */}
            <div className="scene-content flex items-center px-7 py-10 md:px-12 lg:px-16">
              <div className="max-w-xl">
                <p className="text-[9px] uppercase tracking-[0.38em] text-[#c8a97e]">
                  {item.subtitle}
                </p>

                <h2 className="mt-5 text-5xl leading-[0.92] tracking-[-0.055em] md:text-7xl">
                  {item.title}
                </h2>

                <p className="mt-7 max-w-lg text-sm leading-7 text-white/50 md:text-base">
                  {item.description}
                </p>

                <div className="mt-9 flex items-end justify-between border-y border-white/10 py-6">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.3em] text-white/30">
                      Desde
                    </p>

                    <p className="mt-2 text-3xl tracking-[-0.04em]">
                      {item.price}
                    </p>
                  </div>

                  <a
                    href="/reservar"
                    className="inline-flex items-center gap-3 rounded-full bg-[#f0e7dc] px-6 py-4 text-sm text-[#111]"
                  >
                    Reservar
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-8 left-1/2 z-50 h-[1px] w-[220px] -translate-x-1/2 bg-white/10">
          <div className="h-full w-1/3 bg-[#c8a97e]" />
        </div>
      </section>

      {/* DESCUBRE BARBER CLUB */}
      <section className="bg-[#0d0d0d] px-6 py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 text-[#c8a97e]"
          >
            <Sparkles size={15} />

            <p className="text-[9px] uppercase tracking-[0.38em]">
              Descubre Barber Club
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {/* SERVICIOS */}
            <motion.a
              href="/servicios"
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative min-h-[420px] overflow-hidden rounded-[34px] border border-white/10"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, transparent 25%, rgba(0,0,0,.88) 100%), url('https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1200&q=85')",
                }}
              />

              <div className="absolute inset-x-0 bottom-0 p-8">
                <Scissors size={20} className="text-[#c8a97e]" />

                <h3 className="mt-4 text-4xl tracking-[-0.05em]">
                  Servicios
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
                  Conoce servicios, precios y experiencias disponibles.
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm">
                  Explorar servicios
                  <ArrowRight size={15} />
                </span>
              </div>
            </motion.a>

            {/* EQUIPO */}
            <motion.a
              href="/equipo"
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="group relative min-h-[420px] overflow-hidden rounded-[34px] border border-white/10 bg-[#151515]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(200,169,126,0.15),transparent_34%)]" />

              <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 text-[190px] font-semibold leading-none tracking-[-0.08em] text-white/[0.035] transition duration-700 group-hover:scale-105">
                BC
              </div>

              <div className="absolute inset-x-0 bottom-0 p-8">
                <UsersRound size={20} className="text-[#c8a97e]" />

                <h3 className="mt-4 text-4xl tracking-[-0.05em]">
                  Equipo
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
                  Conoce los perfiles, especialidades y experiencia de cada profesional.
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm">
                  Conocer equipo
                  <ArrowRight size={15} />
                </span>
              </div>
            </motion.a>

            {/* RESERVAR */}
            <motion.a
              href="/reservar"
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.16 }}
              className="group relative min-h-[420px] overflow-hidden rounded-[34px] border border-white/10"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, transparent 25%, rgba(0,0,0,.88) 100%), url('https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=85')",
                }}
              />

              <div className="absolute inset-x-0 bottom-0 p-8">
                <CalendarDays size={20} className="text-[#c8a97e]" />

                <h3 className="mt-4 text-4xl tracking-[-0.05em]">
                  Reserva
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
                  Elige servicio, profesional, fecha y hora desde una reserva simple y moderna.
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm">
                  Reservar ahora
                  <ArrowRight size={15} />
                </span>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* RESEÑAS */}
      <section className="border-y border-white/10 bg-[#111] px-6 py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#c8a97e]">
              Experiencias de clientes
            </p>

            <h2 className="mt-5 text-5xl leading-[0.95] tracking-[-0.055em] md:text-7xl">
              El resultado también
              <br />
              se siente.
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/40">
              Reseñas demostrativas para visualizar cómo puede mostrarse la reputación real de una barbería.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <motion.article
                key={review.name}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75, delay: index * 0.09 }}
                whileHover={{ y: -6 }}
                className="rounded-[32px] border border-white/10 bg-white/[0.025] p-8"
              >
                <div className="flex gap-1 text-[#c8a97e]">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} size={14} fill="currentColor" />
                  ))}
                </div>

                <p className="mt-7 text-lg leading-8 tracking-[-0.025em] text-white/75">
                  “{review.text}”
                </p>

                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="text-sm">{review.name}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/30">
                    {review.service}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* UBICACION Y HORARIOS */}
      <section className="bg-[#0d0d0d] px-6 py-28 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative min-h-[540px] overflow-hidden rounded-[38px] border border-white/10 bg-[#151515]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(200,169,126,0.14),transparent_34%)]" />

            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:42px_42px]" />

            <div className="relative z-10 flex min-h-[540px] flex-col justify-between p-8 md:p-12">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c8a97e]/30 bg-[#c8a97e]/10 text-[#c8a97e]">
                  <MapPin size={22} />
                </div>

                <p className="mt-8 text-[9px] uppercase tracking-[0.4em] text-[#c8a97e]">
                  Encuéntranos
                </p>

                <h2 className="mt-5 text-5xl leading-[0.95] tracking-[-0.055em] md:text-7xl">
                  Barber Club
                  <br />
                  San José.
                </h2>
              </div>

              <div>
                <p className="max-w-md text-sm leading-7 text-white/45">
                  Ubicación demostrativa. En una implementación real se conecta la dirección exacta del negocio con Google Maps.
                </p>

                <p className="mt-5 text-sm text-white/70">
                  San José, Costa Rica
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.08 }}
            className="rounded-[38px] border border-white/10 bg-[#151515] p-8 md:p-10"
          >
            <div className="flex items-center gap-3 text-[#c8a97e]">
              <Clock3 size={17} />
              <p className="text-[9px] uppercase tracking-[0.35em]">
                Horarios
              </p>
            </div>

            <h3 className="mt-6 text-4xl tracking-[-0.05em] md:text-5xl">
              Visítanos cuando
              <br />
              mejor te funcione.
            </h3>

            <div className="mt-9 border-y border-white/10">
              {hours.map(([day, schedule]) => (
                <div
                  key={day}
                  className="flex items-center justify-between gap-5 border-b border-white/10 py-4 text-sm last:border-b-0"
                >
                  <span className="text-white/40">{day}</span>
                  <span className={schedule === "Cerrado" ? "text-[#c8a97e]" : "text-white/75"}>
                    {schedule}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/reservar"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f0e7dc] px-7 py-4 text-sm text-[#111]"
            >
              Reservar cita
              <ArrowRight size={17} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-6 pb-28 md:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mx-auto max-w-7xl overflow-hidden rounded-[40px] border border-white/10 bg-[#c8a97e] p-8 text-[#111] md:p-12"
        >
          <p className="text-[9px] uppercase tracking-[0.4em] opacity-50">
            Barber Club
          </p>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <h2 className="text-5xl leading-[0.92] tracking-[-0.06em] md:text-7xl">
              Tu próxima cita
              <br />
              empieza aquí.
            </h2>

            <div className="lg:text-right">
              <p className="ml-auto max-w-md text-sm leading-7 opacity-60">
                Elige el servicio, profesional y horario desde una sola experiencia de reserva.
              </p>

              <a
                href="/reservar"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#111] px-7 py-4 text-sm text-white"
              >
                Reservar ahora
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* WHATSAPP FLOTANTE */}
      <motion.a
        href="https://wa.me/50671007357?text=Hola%2C%20vi%20su%20p%C3%A1gina%20web%20y%20quisiera%20consultar%20sobre%20una%20cita."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Contactar Barber Club por WhatsApp"
        className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-full border border-white/10 bg-[#171717]/95 px-4 py-3 text-[#f3eee7] shadow-2xl backdrop-blur-xl md:bottom-8 md:right-8 md:px-5"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c8a97e] text-[#111]">
          <MessageCircle size={19} />
        </span>

        <span className="hidden pr-1 sm:block">
          <span className="block text-[8px] uppercase tracking-[0.28em] text-white/35">
            ¿Necesitas ayuda?
          </span>
          <span className="mt-1 block text-xs">
            WhatsApp
          </span>
        </span>
      </motion.a>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-12 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em]">
              BARBER CLUB
            </p>

            <p className="mt-3 max-w-sm text-xs leading-6 text-white/35">
              Precisión. Estilo. Presencia. Una experiencia de barbería moderna con reserva online.
            </p>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#c8a97e]">
              Navegación
            </p>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/45">
              <a href="/servicios" className="transition hover:text-white">
                Servicios
              </a>
              <a href="/equipo" className="transition hover:text-white">
                Equipo
              </a>
              <a href="/reservar" className="transition hover:text-white">
                Reservar
              </a>
            </div>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#c8a97e]">
              Demo
            </p>

            <p className="mt-4 text-xs leading-6 text-white/35">
              Los horarios, dirección, reseñas y datos de contacto se reemplazan por los del negocio real.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-7 text-[10px] text-white/25 md:flex-row">
          <p>Sitio demostrativo · Barber Club</p>
          <p>Est. 2026 · Costa Rica</p>
        </div>
      </footer>
    </main>
  );
}