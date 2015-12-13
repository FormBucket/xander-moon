export function redirect() {
  return function() {
    document.location=this
  }
}
