export default function redirect(url) {
  return function() {
    document.location=url
  }
}
