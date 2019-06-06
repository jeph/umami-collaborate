import io from 'socket.io-client'

export default function () {
  if (window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')) {
    return io.connect('127.0.0.1:3000')
  } else {
    return io.connect('https://umami-collaborate.herokuapp.com')
  }
}
