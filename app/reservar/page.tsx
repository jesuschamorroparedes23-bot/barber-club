"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Scissors,
  UserRound,
} from "lucide-react";

import PageIntro from "@/components/PageIntro";

const services = [
  {
    name: "Corte Signature",
    price: 9500,
    duration: "45 min",
  },
  {
    name: "Barba Premium",
    price: 7500,
    duration: "35 min",
  },
  {
    name: "Corte + Barba",
    price: 15500,
    duration: "70 min",
  },
  {
    name: "Fade & Styling",
    price: 10500,
    duration: "50 min",
  },
  {
    name: "Perfilado de Barba",
    price: 5500,
    duration: "25 min",
  },
  {
    name: "Club Experience",
    price: 19500,
    duration: "90 min",
  },
];

const barbers = [
  {
    name: "Santiago",
    specialty: "Fades & Styling",
    experience: "6 años",
  },
  {
    name: "Marco",
    specialty: "Barba & Clásicos",
    experience: "8 años",
  },
  {
    name: "Andrés",
    specialty: "Corte moderno",
    experience: "5 años",
  },
];

const times = [
  "9:00 AM",
  "10:00 AM",
  "11:30 AM",
  "1:00 PM",
  "2:30 PM",
  "4:00 PM",
  "5:30 PM",
  "7:00 PM",
];

const formatColones = (value: number) =>
  `₡${value.toLocaleString("es-CR")}`;

function ReservarContent() {
  const searchParams = useSearchParams();
  const serviceFromUrl = searchParams.get("servicio");
  const barberFromUrl = searchParams.get("barbero");

  const initialService = services.some(
    (item) => item.name === serviceFromUrl
  )
    ? serviceFromUrl!
    : services[0].name;

  const initialBarber = barbers.some(
    (item) => item.name === barberFromUrl
  )
    ? barberFromUrl!
    : barbers[0].name;

  const [service, setService] = useState(initialService);
  const [barber, setBarber] = useState(initialBarber);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [confirmed, setConfirmed] = useState(false);

  const currentService = useMemo(
    () =>
      services.find((item) => item.name === service) ??
      services[0],
    [service]
  );

  const currentBarber = useMemo(
    () =>
      barbers.find((item) => item.name === barber) ??
      barbers[0],
    [barber]
  );

  const canConfirm =
    service &&
    barber &&
    date &&
    time &&
    name.trim().length > 1 &&
    phone.trim().length > 5;

  if (confirmed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0d0d] px-6 text-[#f3eee7]">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-2xl rounded-[40px] border border-white/10 bg-[#151515] p-9 text-center shadow-2xl md:p-14"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#c8a97e] text-[#111]">
            <Check size={27} />
          </div>

          <p className="mt-8 text-[9px] uppercase tracking-[0.4em] text-[#c8a97e]">
            Reserva confirmada
          </p>

          <h1 className="mt-5 text-5xl leading-[0.95] tracking-[-0.055em] md:text-6xl">
            Nos vemos en
            <br />
            Barber Club.
          </h1>

          <div className="mx-auto mt-8 max-w-md rounded-[28px] bg-white/[0.04] p-6 text-left">
            <div className="space-y-4 text-sm">
              <div className="flex justify-between gap-5">
                <span className="text-white/35">Servicio</span>
                <span>{service}</span>
              </div>

              <div className="flex justify-between gap-5">
                <span className="text-white/35">Barbero</span>
                <span>{barber}</span>
              </div>

              <div className="flex justify-between gap-5">
                <span className="text-white/35">Fecha</span>
                <span>{date}</span>
              </div>

              <div className="flex justify-between gap-5">
                <span className="text-white/35">Hora</span>
                <span>{time}</span>
              </div>

              <div className="flex justify-between gap-5 border-t border-white/10 pt-4">
                <span className="text-white/35">Total</span>
                <span className="text-xl">
                  {formatColones(currentService.price)}
                </span>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/40">
            Esta es una reserva de demostración. En una implementación real,
            el cliente podría recibir confirmación por WhatsApp o correo.
          </p>

          <a
            href="/"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f0e7dc] px-7 py-4 text-sm text-[#111]"
          >
            Volver al inicio
            <ArrowRight size={17} />
          </a>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-[#f3eee7]">
      <PageIntro title="RESERVAR" subtitle="Tu tiempo · Tu estilo · Tu experiencia" />
      {/* HEADER */}
      <header className="border-b border-white/10 px-6 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between py-6">
          <a
            href="/"
            className="flex items-center gap-3 text-sm text-white/55"
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

          <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
            Reserva online
          </span>
        </div>
      </header>

      {/* INTRO */}
      <section className="px-6 pb-12 pt-16 md:px-10 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#c8a97e]">
              Agenda tu cita
            </p>

            <h1 className="mt-5 text-6xl leading-[0.88] tracking-[-0.065em] md:text-8xl">
              Tu tiempo.
              <br />
              Tu estilo.
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/40">
              Selecciona el servicio, tu profesional y el horario que mejor
              funcione para ti.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-28 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[1.08fr_0.92fr]">
          {/* OPCIONES */}
          <div className="space-y-5">
            {/* PASO 1 */}
            <section className="rounded-[32px] border border-white/10 bg-[#151515] p-6 md:p-8">
              <div className="flex items-center gap-3 text-[#c8a97e]">
                <Scissors size={17} />

                <span className="text-[9px] uppercase tracking-[0.3em]">
                  01 · Servicio
                </span>
              </div>

              <h2 className="mt-4 text-3xl tracking-[-0.04em]">
                ¿Qué necesitas?
              </h2>

              <div className="mt-6 grid gap-3">
                {services.map((item) => {
                  const active = service === item.name;

                  return (
                    <motion.button
                      key={item.name}
                      whileTap={{
                        scale: 0.98,
                      }}
                      onClick={() => setService(item.name)}
                      className={`flex items-center justify-between gap-5 rounded-[22px] border px-5 py-4 text-left transition ${
                        active
                          ? "border-[#c8a97e] bg-[#c8a97e] text-[#111]"
                          : "border-white/10 bg-white/[0.02]"
                      }`}
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>

                        <p
                          className={`mt-1 text-xs ${
                            active
                              ? "text-black/50"
                              : "text-white/35"
                          }`}
                        >
                          {item.duration}
                        </p>
                      </div>

                      <span className="text-sm">
                        {formatColones(item.price)}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* PASO 2 */}
            <section className="rounded-[32px] border border-white/10 bg-[#151515] p-6 md:p-8">
              <div className="flex items-center gap-3 text-[#c8a97e]">
                <UserRound size={17} />

                <span className="text-[9px] uppercase tracking-[0.3em]">
                  02 · Profesional
                </span>
              </div>

              <h2 className="mt-4 text-3xl tracking-[-0.04em]">
                Elige tu barbero
              </h2>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {barbers.map((item) => {
                  const active = barber === item.name;

                  return (
                    <motion.button
                      key={item.name}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={() => setBarber(item.name)}
                      className={`rounded-[22px] border p-5 text-left ${
                        active
                          ? "border-[#c8a97e] bg-[#c8a97e] text-[#111]"
                          : "border-white/10"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-full ${
                          active
                            ? "bg-black/10"
                            : "bg-white/5"
                        }`}
                      >
                        <UserRound size={18} />
                      </div>

                      <p className="mt-5 text-lg font-medium">
                        {item.name}
                      </p>

                      <p
                        className={`mt-2 text-xs ${
                          active
                            ? "text-black/50"
                            : "text-white/35"
                        }`}
                      >
                        {item.specialty}
                      </p>

                      <p
                        className={`mt-1 text-[10px] ${
                          active
                            ? "text-black/40"
                            : "text-white/25"
                        }`}
                      >
                        {item.experience}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* PASO 3 */}
            <section className="rounded-[32px] border border-white/10 bg-[#151515] p-6 md:p-8">
              <div className="flex items-center gap-3 text-[#c8a97e]">
                <CalendarDays size={17} />

                <span className="text-[9px] uppercase tracking-[0.3em]">
                  03 · Fecha y hora
                </span>
              </div>

              <h2 className="mt-4 text-3xl tracking-[-0.04em]">
                ¿Cuándo vienes?
              </h2>

              <input
                type="date"
                value={date}
                onChange={(event) =>
                  setDate(event.target.value)
                }
                className="mt-6 w-full rounded-[20px] border border-white/10 bg-[#0f0f0f] px-5 py-4 text-sm text-white outline-none"
              />

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {times.map((item) => {
                  const active = time === item;

                  return (
                    <motion.button
                      key={item}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={() => setTime(item)}
                      className={`rounded-[18px] border px-4 py-3 text-sm ${
                        active
                          ? "border-[#c8a97e] bg-[#c8a97e] text-[#111]"
                          : "border-white/10"
                      }`}
                    >
                      {item}
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* PASO 4 */}
            <section className="rounded-[32px] border border-white/10 bg-[#151515] p-6 md:p-8">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#c8a97e]">
                04 · Tus datos
              </p>

              <h2 className="mt-4 text-3xl tracking-[-0.04em]">
                ¿A nombre de quién?
              </h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <input
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Nombre"
                  className="rounded-[20px] border border-white/10 bg-[#0f0f0f] px-5 py-4 text-sm outline-none placeholder:text-white/25"
                />

                <input
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  placeholder="WhatsApp"
                  className="rounded-[20px] border border-white/10 bg-[#0f0f0f] px-5 py-4 text-sm outline-none placeholder:text-white/25"
                />

                <input
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="Correo electrónico (opcional)"
                  className="rounded-[20px] border border-white/10 bg-[#0f0f0f] px-5 py-4 text-sm outline-none placeholder:text-white/25 sm:col-span-2"
                />
              </div>
            </section>
          </div>

          {/* RESUMEN */}
          <aside className="lg:sticky lg:top-7 lg:self-start">
            <div className="overflow-hidden rounded-[36px] bg-[#f0e7dc] text-[#111]">
              <div className="bg-[#c8a97e] p-8">
                <p className="text-[9px] uppercase tracking-[0.3em] opacity-50">
                  Barber Club
                </p>

                <h2 className="mt-4 text-4xl tracking-[-0.05em]">
                  Tu cita
                </h2>
              </div>

              <div className="p-8">
                <div className="space-y-4 border-b border-black/10 pb-6 text-sm">
                  <div className="flex justify-between gap-5">
                    <span className="opacity-45">
                      Servicio
                    </span>

                    <span className="text-right">
                      {currentService.name}
                    </span>
                  </div>

                  <div className="flex justify-between gap-5">
                    <span className="opacity-45">
                      Duración
                    </span>

                    <span>
                      {currentService.duration}
                    </span>
                  </div>

                  <div className="flex justify-between gap-5">
                    <span className="opacity-45">
                      Barbero
                    </span>

                    <span>{currentBarber.name}</span>
                  </div>

                  <div className="flex justify-between gap-5">
                    <span className="opacity-45">
                      Fecha
                    </span>

                    <span>
                      {date || "Por seleccionar"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-5">
                    <span className="opacity-45">
                      Hora
                    </span>

                    <span>
                      {time || "Por seleccionar"}
                    </span>
                  </div>
                </div>

                <div className="mt-7 flex items-end justify-between gap-5">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] opacity-40">
                      Total
                    </p>

                    <p className="mt-2 text-4xl tracking-[-0.05em]">
                      {formatColones(
                        currentService.price
                      )}
                    </p>
                  </div>

                  <Clock3
                    size={21}
                    className="opacity-30"
                  />
                </div>

                <motion.button
                  whileTap={{
                    scale: 0.98,
                  }}
                  disabled={!canConfirm}
                  onClick={() =>
                    setConfirmed(true)
                  }
                  className="mt-7 flex w-full items-center justify-between rounded-full bg-[#111] px-7 py-4 text-sm text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Confirmar reserva

                  <ArrowRight size={17} />
                </motion.button>

                <p className="mt-4 text-center text-[10px] leading-5 opacity-40">
                  No se realizará ningún cobro.
                  <br />
                  Reserva demostrativa.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default function ReservarPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#0d0d0d] text-[#f3eee7]">
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
              Cargando reserva...
            </p>
          </div>
        </main>
      }
    >
      <ReservarContent />
    </Suspense>
  );
}
