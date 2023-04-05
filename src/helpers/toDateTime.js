export default function toDateTime(milis, hour = false) {
  let myDate = new Date(milis)
  let options = { year: 'numeric', month: 'long', day: 'numeric' }
  if (hour) {
    options = { hour: '2-digit', minute: '2-digit' }
  }

  return myDate.toLocaleString(undefined, options)
}
