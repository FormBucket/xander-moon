function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

export default function decode(str) {
  try {
    return JSON.parse( b64DecodeUnicode( localStorage.getItem('token').split('.')[1] ) )
  } catch(e) {
    return { exp: -1 }
  }
}
