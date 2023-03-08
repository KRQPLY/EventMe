export default function toDateTime(secs, hour = false) {
  let myDate = new Date(secs * 1000)
  let options = { year: 'numeric', month: 'long', day: 'numeric' }
  if (hour) {
    options = { hour: '2-digit', minute: '2-digit' }
  }

  return myDate.toLocaleString(undefined, options)
}
