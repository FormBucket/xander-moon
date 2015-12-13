export default function redirect() {
  return function() {
    document.location=this
  }
}
