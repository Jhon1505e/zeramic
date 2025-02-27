export function formatMoneda(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(value);
}

export function formatFecha(date: string) {
  const dateObj = new Date(date);
  const day = padStart(dateObj.getDate());
  const month = padStart(dateObj.getMonth() + 1);
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const meridian = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours >= 12 ? hours - 12 : hours;
  const hour = padStart(hour12);
  const minutes = padStart(dateObj.getMinutes());
  const seconds = padStart(dateObj.getSeconds());
  return `${day}/${month}/${year} - ${hour}:${minutes}:${seconds} ${meridian}`;
};

const padStart = (num: number) => String(num).padStart(2, '0');