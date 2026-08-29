"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Lock,
  LogOut,
  Scissors,
  ShieldCheck,
  Unlock,
  UserRound,
} from "lucide-react";

import {
  BookingRecord,
  getBookings,
  occupyWalkIn,
  releaseSlot,
} from "@/lib/bookingStore";

const barberConfig = {
  santiago: {
    name: "Santiago",
    specialty: "Fades & Styling",
    pin: "1111",
  },
  marco: {
    name: "Marco",
    specialty: "Barba & Clásicos",
    pin: "2222",
  },
  andres: {
    name: "Andrés",
    specialty: "Corte moderno",
    pin: "3333",
  },
} as const;

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

export default function BarberPanelPage() {
  const params = useParams<{ nombre: string }>();
  const slug = String(params?.nombre ?? "").toLowerCase();
  const barber = barberConfig[slug as keyof typeof barberConfig];

  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [pinError, setPinError] = useState("");
  const [date, setDate] = useState(today());
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [notice, setNotice] = useState("");

  const refresh = () => setBookings(getBookings());

  useEffect(() => {
    refresh();

    if (barber) {
      const saved = window.sessionStorage.getItem(
        `barber-club-auth-${slug}`
      );
      if (saved === "true") {
        setAuthenticated(true);
      }
    }

    const handleRefresh = () => refresh();
    window.addEventListener("storage", handleRefresh);
    window.addEventListener("barber-club-bookings-updated", handleRefresh);

    return () => {
      window.removeEventListener("storage", handleRefresh);
      window.removeEventListener("barber-club-bookings-updated", handleRefresh);
    };
  }, [barber, slug]);

  const dayBookings = useMemo(() => {
    if (!barber) return [];

    return bookings.filter(
      (booking) =>
        booking.barber === barber.name &&
        booking.date === date
    );
  }, [barber, bookings, date]);

  const reservedCount = dayBookings.filter(
    (booking) => booking.status === "reserved"
  ).length;

  const walkInCount = dayBookings.filter(
    (booking) => booking.status === "walkin"
  ).length;

  const getSlot = (time: string) =>
    dayBookings.find((booking) => booking.time === time);

  if (!barber) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0d0d] px-6 text-[#f3eee7]">
        <div className="max-w-md text-center">
          <p className="text-[9px] uppercase tracking-[0.35em] text-[#c8a97e]">
            Barber Club
          </p>
          <h1 className="mt-5 text-4xl tracking-[-0.05em]">
            Barbero no encontrado
          </h1>
          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs"
          >
            <ArrowLeft size={14} />
            Volver
          </a>
        </div>
      </main>
    );
  }

  const login = () => {
    if (pin === barber.pin) {
      setAuthenticated(true);
      setPinError("");
      window.sessionStorage.setItem(
        `barber-club-auth-${slug}`,
        "true"
      );
      return;
    }

    setPinError("PIN incorrecto");
  };

  const logout = () => {
    setAuthenticated(false);
    setPin("");
    window.sessionStorage.removeItem(
      `barber-club-auth-${slug}`
    );
  };

  const handleOccupy = (time: string) => {
    setNotice("");
    const result = occupyWalkIn(barber.name, date, time);

    if (!result.ok) {
      setNotice("Ese horario ya está ocupado.");
      refresh();
      return;
    }

    setNotice(`Marcaste ${time} como ocupado.`);
    refresh();
  };

  const handleRelease = (booking: BookingRecord) => {
    releaseSlot(booking.id);

    setNotice(
      booking.status === "reserved"
        ? `La cita de ${booking.customerName} fue liberada.`
        : `${booking.time} vuelve a estar disponible.`
    );

    refresh();
  };

  if (!authenticated) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d0d0d] px-6 text-[#f3eee7]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(200,169,126,0.12),transparent_36%)]" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 w-full max-w-md rounded-[34px] border border-white/10 bg-[#151515] p-7 md:p-9"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c8a97e]/25 bg-[#c8a97e]/10 text-[#c8a97e]">
            <ShieldCheck size={23} />
          </div>

          <p className="mt-7 text-[9px] uppercase tracking-[0.35em] text-[#c8a97e]">
            Acceso de barbero
          </p>

          <h1 className="mt-4 text-4xl tracking-[-0.05em]">
            {barber.name}
          </h1>

          <p className="mt-2 text-sm text-white/35">
            {barber.specialty}
          </p>

          <label className="mt-8 block text-[9px] uppercase tracking-[0.3em] text-white/35">
            PIN
          </label>

          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(event) => {
              setPin(event.target.value.replace(/\D/g, ""));
              setPinError("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") login();
            }}
            placeholder="••••"
            className="mt-3 w-full rounded-[20px] border border-white/10 bg-[#0f0f0f] px-5 py-4 text-center text-2xl tracking-[0.45em] outline-none transition focus:border-[#c8a97e]/50"
          />

          {pinError && (
            <p className="mt-3 text-center text-xs text-red-300/65">
              {pinError}
            </p>
          )}

          <button
            onClick={login}
            disabled={pin.length !== 4}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c8a97e] px-6 py-4 text-sm text-[#111] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Lock size={15} />
            Entrar al panel
          </button>

          <p className="mt-6 text-center text-[10px] leading-5 text-white/25">
            Acceso demostrativo. En una implementación real el PIN se valida
            desde un sistema seguro.
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-[#f3eee7]">
      <header className="border-b border-white/10 px-5 py-5 md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-[8px] uppercase tracking-[0.35em] text-[#c8a97e]">
              Barber Club · Mi agenda
            </p>
            <h1 className="mt-2 text-2xl tracking-[-0.04em]">
              Hola, {barber.name}
            </h1>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-xs text-white/45 transition hover:text-white"
          >
            <LogOut size={14} />
            Salir
          </button>
        </div>
      </header>

      <section className="px-5 py-8 md:px-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_auto] md:items-end">
            <div>
              <div className="flex items-center gap-2 text-[#c8a97e]">
                <UserRound size={15} />
                <p className="text-[9px] uppercase tracking-[0.3em]">
                  {barber.specialty}
                </p>
              </div>

              <h2 className="mt-4 text-4xl tracking-[-0.05em] md:text-5xl">
                Agenda del día
              </h2>
            </div>

            <div>
              <label className="text-[8px] uppercase tracking-[0.3em] text-white/30">
                Fecha
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-[18px] border border-white/10 bg-[#151515] px-4 py-3">
                <CalendarDays size={15} className="text-[#c8a97e]" />
                <input
                  type="date"
                  value={date}
                  onChange={(event) => {
                    setDate(event.target.value);
                    setNotice("");
                  }}
                  className="bg-transparent text-xs outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="rounded-[18px] border border-white/10 bg-[#151515] px-4 py-3">
                <p className="text-[8px] uppercase tracking-[0.22em] text-white/25">
                  Reservas
                </p>
                <p className="mt-1 text-xl">{reservedCount}</p>
              </div>

              <div className="rounded-[18px] border border-white/10 bg-[#151515] px-4 py-3">
                <p className="text-[8px] uppercase tracking-[0.22em] text-white/25">
                  Sin cita
                </p>
                <p className="mt-1 text-xl">{walkInCount}</p>
              </div>
            </div>
          </div>

          {notice && (
            <div className="mt-6 rounded-[18px] border border-[#c8a97e]/15 bg-[#c8a97e]/[0.06] px-4 py-3 text-xs text-[#d8c09b]">
              {notice}
            </div>
          )}

          <div className="mt-8 space-y-3">
            {times.map((time) => {
              const booking = getSlot(time);
              const reserved = booking?.status === "reserved";

              return (
                <div
                  key={time}
                  className="grid gap-4 rounded-[24px] border border-white/10 bg-[#151515] p-5 sm:grid-cols-[100px_1fr_auto] sm:items-center"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <Clock3 size={14} className="text-[#c8a97e]" />
                    {time}
                  </div>

                  <div>
                    {!booking && (
                      <>
                        <p className="text-sm text-emerald-200/75">
                          Disponible
                        </p>
                        <p className="mt-1 text-[10px] text-white/25">
                          El cliente todavía puede reservar esta hora.
                        </p>
                      </>
                    )}

                    {booking && reserved && (
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

                    {booking && !reserved && (
                      <>
                        <p className="text-sm text-orange-200/70">
                          Ocupado · Cliente sin cita
                        </p>
                        <p className="mt-1 text-[10px] text-white/25">
                          Bloqueado manualmente desde tu panel.
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
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs text-white/60 transition hover:border-white/30 hover:text-white"
                    >
                      <Unlock size={14} />
                      {reserved ? "No llegó / Liberar" : "Liberar"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-start gap-3">
              <Scissors size={16} className="mt-0.5 text-[#c8a97e]" />
              <p className="text-xs leading-6 text-white/30">
                Este panel está preparado como demostración. Para una barbería
                real, la agenda se conecta a una base de datos compartida para
                funcionar entre todos los teléfonos en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
