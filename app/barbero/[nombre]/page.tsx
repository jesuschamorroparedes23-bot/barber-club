"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  KeyRound,
  Lock,
  LogOut,
  Mail,
  Scissors,
  ShieldCheck,
  Unlock,
  UserRound,
  X,
} from "lucide-react";


const barberConfig = {
  santiago: {
    name: "Santiago",
    specialty: "Fades & Styling",
    defaultPin: "1111",
    email: "santiago@barberclub.demo",
  },
  marco: {
    name: "Marco",
    specialty: "Barba & Clásicos",
    defaultPin: "2222",
    email: "marco@barberclub.demo",
  },
  andres: {
    name: "Andrés",
    specialty: "Corte moderno",
    defaultPin: "3333",
    email: "andres@barberclub.demo",
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

type BookingRecord = {
  id: string;
  barber: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  customer_name: string;
  phone: string;
  email: string | null;
  status: "reserved" | "walkin";
  deposit_amount: number;
  deposit_status: "pending" | "confirmed";
  created_at: string;
};

const today = () => {
  const date = new Date();
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

const getPinStorageKey = (slug: string) => `barber-club-pin-${slug}`;
const getAuthStorageKey = (slug: string) => `barber-club-auth-${slug}`;

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

  const [showForgotPin, setShowForgotPin] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryStep, setRecoveryStep] = useState<"email" | "code" | "newpin">("email");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [recoveryCodeInput, setRecoveryCodeInput] = useState("");
  const [recoveryNewPin, setRecoveryNewPin] = useState("");
  const [recoveryConfirmPin, setRecoveryConfirmPin] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState("");

  const [showChangePin, setShowChangePin] = useState(false);
  const [currentPinInput, setCurrentPinInput] = useState("");
  const [newPinInput, setNewPinInput] = useState("");
  const [confirmPinInput, setConfirmPinInput] = useState("");
  const [changePinMessage, setChangePinMessage] = useState("");

  const refresh = async () => {
    if (!barber || !date) {
      setBookings([]);
      return;
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("barber", barber.name)
      .eq("appointment_date", date)
      .order("appointment_time");

    if (error) {
      console.error("Supabase barber bookings error:", error);
      setNotice("No se pudo cargar la agenda.");
      return;
    }

    setBookings((data ?? []) as BookingRecord[]);
  };

  const getCurrentPin = () => {
    if (!barber) return "";
    return (
      window.localStorage.getItem(getPinStorageKey(slug)) ??
      barber.defaultPin
    );
  };

  useEffect(() => {
    refresh();

    if (barber) {
      const savedAuth = window.sessionStorage.getItem(
        getAuthStorageKey(slug)
      );
      if (savedAuth === "true") {
        setAuthenticated(true);
      }
    }

    if (!barber || !date) return;

    const channel = supabase
      .channel(`barber-agenda-${barber.name}-${date}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookings",
        },
        () => {
          refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [barber, slug, date]);

  const dayBookings = useMemo(() => {
    if (!barber) return [];

    return bookings.filter(
      (booking) =>
        booking.barber === barber.name &&
        booking.appointment_date === date
    );
  }, [barber, bookings, date]);

  const reservedCount = dayBookings.filter(
    (booking) => booking.status === "reserved"
  ).length;

  const walkInCount = dayBookings.filter(
    (booking) => booking.status === "walkin"
  ).length;

  const getSlot = (time: string) =>
    dayBookings.find((booking) => booking.appointment_time === time);

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
    if (pin === getCurrentPin()) {
      setAuthenticated(true);
      setPinError("");
      window.sessionStorage.setItem(
        getAuthStorageKey(slug),
        "true"
      );
      return;
    }

    setPinError("PIN incorrecto");
  };

  const logout = () => {
    setAuthenticated(false);
    setPin("");
    window.sessionStorage.removeItem(getAuthStorageKey(slug));
  };

  const handleOccupy = async (time: string) => {
    setNotice("");

    const { error } = await supabase
      .from("bookings")
      .insert({
        barber: barber.name,
        service: "Cliente sin cita",
        appointment_date: date,
        appointment_time: time,
        customer_name: "Cliente sin cita",
        phone: "-",
        email: null,
        status: "walkin",
        deposit_amount: 0,
        deposit_status: "confirmed",
      });

    if (error) {
      console.error("Supabase occupy error:", error);

      if (error.code === "23505") {
        setNotice("Ese horario ya está ocupado.");
      } else {
        setNotice("No se pudo ocupar ese horario.");
      }

      await refresh();
      return;
    }

    setNotice(`Marcaste ${time} como ocupado.`);
    await refresh();
  };

  const handleRelease = async (booking: BookingRecord) => {
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", booking.id);

    if (error) {
      console.error("Supabase release error:", error);
      setNotice("No se pudo liberar ese horario.");
      return;
    }

    setNotice(
      booking.status === "reserved"
        ? `La cita de ${booking.customer_name} fue liberada.`
        : `${booking.appointment_time} vuelve a estar disponible.`
    );

    await refresh();
  };

  const startRecovery = () => {
    setShowForgotPin(true);
    setRecoveryEmail("");
    setRecoveryStep("email");
    setRecoveryCode("");
    setRecoveryCodeInput("");
    setRecoveryNewPin("");
    setRecoveryConfirmPin("");
    setRecoveryMessage("");
  };

  const sendRecoveryEmail = () => {
    if (recoveryEmail.trim().toLowerCase() !== barber.email.toLowerCase()) {
      setRecoveryMessage("Ese correo no coincide con el perfil de este barbero.");
      return;
    }

    // Demo only: in production this code would be emailed by the backend.
    const demoCode = String(Math.floor(100000 + Math.random() * 900000));
    setRecoveryCode(demoCode);
    setRecoveryStep("code");
    setRecoveryMessage(
      `Demo: el correo fue validado. Código temporal: ${demoCode}`
    );
  };

  const verifyRecoveryCode = () => {
    if (recoveryCodeInput !== recoveryCode) {
      setRecoveryMessage("El código no coincide.");
      return;
    }

    setRecoveryStep("newpin");
    setRecoveryMessage("Código correcto. Ahora crea un PIN nuevo.");
  };

  const saveRecoveredPin = () => {
    if (!/^\d{4}$/.test(recoveryNewPin)) {
      setRecoveryMessage("El PIN debe tener exactamente 4 números.");
      return;
    }

    if (recoveryNewPin !== recoveryConfirmPin) {
      setRecoveryMessage("Los PIN no coinciden.");
      return;
    }

    window.localStorage.setItem(
      getPinStorageKey(slug),
      recoveryNewPin
    );

    setPin(recoveryNewPin);
    setShowForgotPin(false);
    setPinError("");
  };

  const changePin = () => {
    setChangePinMessage("");

    if (currentPinInput !== getCurrentPin()) {
      setChangePinMessage("El PIN actual no es correcto.");
      return;
    }

    if (!/^\d{4}$/.test(newPinInput)) {
      setChangePinMessage("El PIN nuevo debe tener exactamente 4 números.");
      return;
    }

    if (newPinInput !== confirmPinInput) {
      setChangePinMessage("Los PIN nuevos no coinciden.");
      return;
    }

    window.localStorage.setItem(
      getPinStorageKey(slug),
      newPinInput
    );

    setChangePinMessage("PIN actualizado correctamente.");
    setCurrentPinInput("");
    setNewPinInput("");
    setConfirmPinInput("");
  };

  if (!authenticated) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d0d0d] px-6 py-10 text-[#f3eee7]">
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

          <button
            type="button"
            onClick={startRecovery}
            className="mt-4 w-full text-center text-xs text-white/40 transition hover:text-[#c8a97e]"
          >
            ¿Olvidaste tu PIN?
          </button>

          <p className="mt-6 text-center text-[10px] leading-5 text-white/25">
            Acceso demostrativo. En una implementación real el PIN y la
            recuperación por correo se validan desde un backend seguro.
          </p>
        </motion.div>

        {showForgotPin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-[30px] border border-white/10 bg-[#151515] p-6 text-[#f3eee7] md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.32em] text-[#c8a97e]">
                    Recuperar acceso
                  </p>
                  <h2 className="mt-3 text-3xl tracking-[-0.04em]">
                    Olvidé mi PIN
                  </h2>
                </div>

                <button
                  onClick={() => setShowForgotPin(false)}
                  className="rounded-full border border-white/10 p-2 text-white/40"
                >
                  <X size={16} />
                </button>
              </div>

              {recoveryStep === "email" && (
                <>
                  <p className="mt-5 text-sm leading-6 text-white/35">
                    Ingresa el correo asociado a tu perfil. En un sistema real
                    recibirías ahí un código de recuperación.
                  </p>

                  <div className="mt-5 flex items-center gap-3 rounded-[18px] border border-white/10 bg-[#0f0f0f] px-4">
                    <Mail size={16} className="text-[#c8a97e]" />
                    <input
                      type="email"
                      value={recoveryEmail}
                      onChange={(event) => {
                        setRecoveryEmail(event.target.value);
                        setRecoveryMessage("");
                      }}
                      placeholder="correo@barberclub.com"
                      className="w-full bg-transparent py-4 text-sm outline-none"
                    />
                  </div>

                  <button
                    onClick={sendRecoveryEmail}
                    className="mt-4 w-full rounded-full bg-[#c8a97e] px-5 py-4 text-sm text-[#111]"
                  >
                    Enviar código
                  </button>

                  <p className="mt-4 text-[10px] leading-5 text-white/20">
                    Correo demo de {barber.name}: {barber.email}
                  </p>
                </>
              )}

              {recoveryStep === "code" && (
                <>
                  <p className="mt-5 text-sm leading-6 text-white/35">
                    Escribe el código de 6 dígitos recibido.
                  </p>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={recoveryCodeInput}
                    onChange={(event) =>
                      setRecoveryCodeInput(
                        event.target.value.replace(/\D/g, "")
                      )
                    }
                    placeholder="000000"
                    className="mt-5 w-full rounded-[20px] border border-white/10 bg-[#0f0f0f] px-5 py-4 text-center text-xl tracking-[0.3em] outline-none"
                  />

                  <button
                    onClick={verifyRecoveryCode}
                    className="mt-4 w-full rounded-full bg-[#c8a97e] px-5 py-4 text-sm text-[#111]"
                  >
                    Verificar código
                  </button>
                </>
              )}

              {recoveryStep === "newpin" && (
                <>
                  <p className="mt-5 text-sm leading-6 text-white/35">
                    Crea un PIN nuevo de 4 números.
                  </p>

                  <div className="mt-5 space-y-3">
                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      value={recoveryNewPin}
                      onChange={(event) =>
                        setRecoveryNewPin(
                          event.target.value.replace(/\D/g, "")
                        )
                      }
                      placeholder="Nuevo PIN"
                      className="w-full rounded-[18px] border border-white/10 bg-[#0f0f0f] px-5 py-4 text-sm outline-none"
                    />

                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      value={recoveryConfirmPin}
                      onChange={(event) =>
                        setRecoveryConfirmPin(
                          event.target.value.replace(/\D/g, "")
                        )
                      }
                      placeholder="Confirmar nuevo PIN"
                      className="w-full rounded-[18px] border border-white/10 bg-[#0f0f0f] px-5 py-4 text-sm outline-none"
                    />
                  </div>

                  <button
                    onClick={saveRecoveredPin}
                    className="mt-4 w-full rounded-full bg-[#c8a97e] px-5 py-4 text-sm text-[#111]"
                  >
                    Guardar nuevo PIN
                  </button>
                </>
              )}

              {recoveryMessage && (
                <div className="mt-4 rounded-[16px] border border-[#c8a97e]/15 bg-[#c8a97e]/[0.06] px-4 py-3 text-xs leading-5 text-[#d8c09b]">
                  {recoveryMessage}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-[#f3eee7]">
      <header className="border-b border-white/10 px-5 py-5 md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-[8px] uppercase tracking-[0.35em] text-[#c8a97e]">
              Barber Club · Perfil
            </p>
            <h1 className="mt-2 text-2xl tracking-[-0.04em]">
              Hola, {barber.name}
            </h1>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowChangePin((value) => !value);
                setChangePinMessage("");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-xs text-white/45 transition hover:text-white"
            >
              <KeyRound size={14} />
              Cambiar PIN
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-xs text-white/45 transition hover:text-white"
            >
              <LogOut size={14} />
              Salir
            </button>
          </div>
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
                Mi agenda
              </h2>

              <p className="mt-3 text-xs text-white/25">
                Cuenta: {barber.email}
              </p>
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

          {showChangePin && (
            <div className="mt-7 rounded-[26px] border border-white/10 bg-[#151515] p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[#c8a97e]">
                    <KeyRound size={15} />
                    <p className="text-[9px] uppercase tracking-[0.28em]">
                      Seguridad
                    </p>
                  </div>
                  <h3 className="mt-3 text-2xl tracking-[-0.04em]">
                    Cambiar PIN
                  </h3>
                </div>

                <button
                  onClick={() => setShowChangePin(false)}
                  className="rounded-full border border-white/10 p-2 text-white/35"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={currentPinInput}
                  onChange={(event) =>
                    setCurrentPinInput(
                      event.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="PIN actual"
                  className="rounded-[18px] border border-white/10 bg-[#0f0f0f] px-4 py-4 text-sm outline-none"
                />

                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={newPinInput}
                  onChange={(event) =>
                    setNewPinInput(
                      event.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="PIN nuevo"
                  className="rounded-[18px] border border-white/10 bg-[#0f0f0f] px-4 py-4 text-sm outline-none"
                />

                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={confirmPinInput}
                  onChange={(event) =>
                    setConfirmPinInput(
                      event.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="Confirmar PIN"
                  className="rounded-[18px] border border-white/10 bg-[#0f0f0f] px-4 py-4 text-sm outline-none"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={changePin}
                  className="rounded-full bg-[#c8a97e] px-5 py-3 text-xs text-[#111]"
                >
                  Guardar PIN
                </button>

                {changePinMessage && (
                  <p className="text-xs text-[#d8c09b]">
                    {changePinMessage}
                  </p>
                )}
              </div>
            </div>
          )}

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
                          Reservado · {booking.customer_name}
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
                La agenda ya está conectada a Supabase y se comparte entre
                dispositivos. El PIN y la recuperación por correo siguen siendo
                demostrativos y se guardan localmente en este navegador.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
