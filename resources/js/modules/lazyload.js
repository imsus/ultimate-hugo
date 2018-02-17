import lozad from 'lozad'

const observer = lozad(document.querySelectorAll('img'))

export default function() {
  return observer.observe()
}
