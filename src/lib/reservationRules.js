export const allSlots = ["17:00", "18:00", "19:00", "20:00", "21:00"];

export function isClosedDay(dateString) {
  const date = new Date(dateString);
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, ...

  return day === 1;
}

function getOpeningHours(dateString) {
  const date = new Date(dateString);
  const day = date.getDay();

  // Monday closed handled elsewhere
  if (day === 0) return { open: 17, close: 20 }; // Sunday
  if (day === 2) return { open: 18, close: 22 }; // Tuesday
  return { open: 17, close: 22 }; // default
}

function slotToHour(slot) {
  return Number(slot.split(":")[0]);
}

function isTooSoon(slot, now) {
  const slotHour = slotToHour(slot);

  const slotTime = new Date(now);
  slotTime.setHours(slotHour, 0, 0, 0);

  return slotTime - now < 60 * 60 * 1000;
}

export function getAvailableSlots(dateString, allSlots, now = new Date()) {
  if (isClosedDay(dateString)) return [];

  const { open, close } = getOpeningHours(dateString);

  return allSlots.filter((slot) => {
    const hour = slotToHour(slot);

    if (hour < open || hour >= close) return false;

    // only apply cutoff if same day
    const isSameDay =
      new Date(dateString).toDateString() === now.toDateString();
    if (isSameDay && isTooSoon(slot, now)) return false;

    return true;
  });
}
