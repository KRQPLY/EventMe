export default function toDateTime(date) {
  return new Date(date).getTime() / 1000
}
