"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Lock,
  Scissors,
  Unlock,
  UserRound,
  UsersRound,
} from "lucide-react";

import {
  BookingRecord,
  getBookings,
  occupyWalkIn,
  releaseSlot,
} from "@/lib/bookingStore";

const barbers = ["Santiago", "Marco", "Andrés"];

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

const today = () => {
  const date = new Date();
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

export default function AdminPage() {
  const [barber, setBarber] = useState(barbers[0]);
  const [date, setDate] = useState(today());
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [notice, setNotice] = useState("");

  const refresh = () => setBookings(getBookings());

  useEffect(() => {
    refresh();

    const handleRefresh = () => refresh();
    window.addEventListener("storage", handleRefresh);
    window.addEventListener("barber-club-bookings-updated", handleRefresh);

    return () => {
      window.removeEventListener("storage", handleRefresh);
      window.removeEventListener("barber-club-bookings-updated", handleRefresh);
    };
  }, []);

  const dayBookings = useMemo(
    () =>
      bookings.filter(
        (booking) =>
          booking.barber === barber &&
          booking.date === date
      ),
    [barber, bookings, date]
  );

  const getSlot = (time: string) =>
    dayBookings.find((booking) => booking.time === time);

  const reservedCount = dayBookings.filter(
    (booking) => booking.status === "reserved"
  ).length;

  const walkInCount = dayBookings.filter(
    (booking) => booking.status === "walkin"
  ).length;

  const handleOccupy = (time: string) => {
    setNotice("");
    const result = occupyWalkIn(barber, date, time);

    if (!result.ok) {
      setNotice("Ese horario ya está ocupado.");
      refresh();
      return;
    }

    setNotice(`${barber} quedó ocupado a las ${time}.`);
    refresh();
  };

  const handleRelease = (booking: BookingRecord) => {
    releaseSlot(booking.id);
    setNotice(
      booking.status === "reserved"
        ? `La cita de ${booking.customerName} fue liberada. El horario vuelve a estar disponible.`
        : `El horario de ${booking.time} quedó disponible otra vez.`
    );
    refresh();
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-[#f3eee7]">
      <header className="border-b border-white/10 px-6 py-6 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs text-white/45 transition hover:text-white"
          >
            <ArrowLeft size={15} />
            Volver al sitio
          </a>

          <div className="text-right">
            <p className="text-sm font-semibold tracking-[0.14em]">
              BARBER CLUB
            </p>
            <p className="mt-1 text-[8px] uppercase tracking-[0.35em] text-[#c8a97e]">
              Panel demo
            </p>
          </div>
        </div>
      </header>

      <section className="px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 text-[#c8a97e]">
              <UsersRound size={16} />
              <p className="text-[9px] uppercase tracking-[0.38em]">
                Gestión de disponibilidad
              </p>
            </div>

            <h1 className="mt-5 text-5xl leading-[0.92] tracking-[-0.055em] md:text-7xl">
              Controla el puesto
              <br />
              con un clic.
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/45">
              Las reservas bloquean automáticamente su horario. Si llega un
              cliente sin reserva, toca “Ocupar”. Si una cita no llega, toca
              “Liberar” y el horario vuelve a quedar disponible.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <aside className="space-y-5">
              <div className="rounded-[30px] border border-white/10 bg-[#151515] p-6">
                <div className="flex items-center gap-3 text-[#c8a97e]">
                  <CalendarDays size={16} />
                  <p className="text-[9px] uppercase tracking-[0.3em]">
                    Fecha
                  </p>
                </div>

                <input
                  type="date"
                  value={date}
                  onChange={(event) => {
                    setDate(event.target.value);
                    setNotice("");
                  }}
                  className="mt-5 w-full rounded-[18px] border border-white/10 bg-[#0f0f0f] px-4 py-4 text-sm outline-none"
                />
              </div>

              <div className="rounded-[30px] border border-white/10 bg-[#151515] p-6">
                <div className="flex items-center gap-3 text-[#c8a97e]">
                  <UserRound size={16} />
                  <p className="text-[9px] uppercase tracking-[0.3em]">
                    Barbero
                  </p>
                </div>

                <div className="mt-5 space-y-2">
                  {barbers.map((item) => {
                    const active = barber === item;

                    return (
                      <button
                        key={item}
                        onClick={() => {
                          setBarber(item);
                          setNotice("");
                        }}
                        className={`flex w-full items-center justify-between rounded-[18px] border px-4 py-4 text-left text-sm transition ${
                          active
                            ? "border-[#c8a97e] bg-[#c8a97e] text-[#111]"
                            : "border-white/10 text-white/55 hover:border-white/20"
                        }`}
                      >
                        <span>{item}</span>
                        {active && <CheckCircle2 size={16} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                    Reservas
                  </p>
                  <p className="mt-3 text-3xl">{reservedCount}</p>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                    Sin cita
                  </p>
                  <p className="mt-3 text-3xl">{walkInCount}</p>
                </div>
              </div>
            </aside>

            <section className="rounded-[34px] border border-white/10 bg-[#151515] p-6 md:p-8">
              <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.35em] text-[#c8a97e]">
                    Agenda del día
                  </p>
                  <h2 className="mt-3 text-3xl tracking-[-0.04em]">
                    {barber}
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-xs text-white/35">
                  <Clock3 size={14} />
                  {date}
                </div>
              </div>

              {notice && (
                <div className="mt-5 rounded-[18px] border border-[#c8a97e]/15 bg-[#c8a97e]/[0.06] px-4 py-3 text-xs leading-5 text-[#d8c09b]">
                  {notice}
                </div>
              )}

              <div className="mt-6 space-y-3">
                {times.map((time) => {
                  const booking = getSlot(time);
                  const reserved = booking?.status === "reserved";
                  const walkin = booking?.status === "walkin";

                  return (
                    <div
                      key={time}
                      className="grid gap-4 rounded-[22px] border border-white/10 bg-[#101010] p-5 sm:grid-cols-[110px_1fr_auto] sm:items-center"
                    >
                      <div className="text-sm">{time}</div>

                      <div>
                        {!booking && (
                          <>
                            <p className="text-sm text-emerald-200/75">
                              Disponible
                            </p>
                            <p className="mt-1 text-[10px] text-white/25">
                              Puede reservarse online o usarse para un cliente sin cita.
                            </p>
                          </>
                        )}

                        {reserved && booking && (
                          <>
                            <p className="text-sm text-[#d8c09b]">
                              Reservado · {booking.customerName}
                            </p>
                            <p className="mt-1 text-[10px] text-white/30">
                              {booking.service}
                              {booking.phone ? ` · ${booking.phone}` : ""}
                            </p>
                          </>
                        )}

                        {walkin && (
                          <>
                            <p className="text-sm text-orange-200/70">
                              Ocupado manualmente
                            </p>
                            <p className="mt-1 text-[10px] text-white/25">
                              Cliente sin reserva.
                            </p>
                          </>
                        )}
                      </div>

                      {!booking ? (
                        <button
                          onClick={() => handleOccupy(time)}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c8a97e] px-5 py-3 text-xs text-[#111]"
                        >
                          <Lock size={14} />
                          Ocupar
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRelease(booking)}
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs text-white/65 transition hover:border-white/30 hover:text-white"
                        >
                          <Unlock size={14} />
                          {reserved ? "No llegó / Liberar" : "Liberar"}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 rounded-[22px] border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-start gap-3">
                  <Scissors size={16} className="mt-0.5 text-[#c8a97e]" />
                  <p className="text-xs leading-6 text-white/35">
                    Demo local: estos estados se guardan en este navegador.
                    Para una barbería real se conecta una base de datos para que
                    clientes y barberos vean la misma disponibilidad desde
                    cualquier teléfono o computadora.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
