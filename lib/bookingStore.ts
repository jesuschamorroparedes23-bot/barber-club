"use client";

export type SlotStatus = "reserved" | "walkin";

export type BookingRecord = {
  id: string;
  barber: string;
  service: string;
  date: string;
  time: string;
  customerName: string;
  phone: string;
  email?: string;
  status: SlotStatus;
  createdAt: string;
};

const STORAGE_KEY = "barber-club-bookings-v1";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getBookings(): BookingRecord[] {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveBookings(bookings: BookingRecord[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  window.dispatchEvent(new Event("barber-club-bookings-updated"));
}

export function isSlotBusy(barber: string, date: string, time: string) {
  if (!barber || !date || !time) return false;

  return getBookings().some(
    (booking) =>
      booking.barber === barber &&
      booking.date === date &&
      booking.time === time
  );
}

export function addReservation(
  data: Omit<BookingRecord, "id" | "createdAt" | "status">
) {
  const bookings = getBookings();

  const conflict = bookings.some(
    (booking) =>
      booking.barber === data.barber &&
      booking.date === data.date &&
      booking.time === data.time
  );

  if (conflict) {
    return { ok: false as const, reason: "busy" as const };
  }

  const booking: BookingRecord = {
    ...data,
    id: crypto.randomUUID(),
    status: "reserved",
    createdAt: new Date().toISOString(),
  };

  saveBookings([...bookings, booking]);
  return { ok: true as const, booking };
}

export function occupyWalkIn(barber: string, date: string, time: string) {
  const bookings = getBookings();

  const conflict = bookings.some(
    (booking) =>
      booking.barber === barber &&
      booking.date === date &&
      booking.time === time
  );

  if (conflict) {
    return { ok: false as const, reason: "busy" as const };
  }

  const booking: BookingRecord = {
    id: crypto.randomUUID(),
    barber,
    service: "Cliente sin reserva",
    date,
    time,
    customerName: "Walk-in",
    phone: "",
    email: "",
    status: "walkin",
    createdAt: new Date().toISOString(),
  };

  saveBookings([...bookings, booking]);
  return { ok: true as const, booking };
}

export function releaseSlot(id: string) {
  const bookings = getBookings();
  saveBookings(bookings.filter((booking) => booking.id !== id));
}

export function getSlotBooking(
  barber: string,
  date: string,
  time: string
): BookingRecord | undefined {
  return getBookings().find(
    (booking) =>
      booking.barber === barber &&
      booking.date === date &&
      booking.time === time
  );
}
