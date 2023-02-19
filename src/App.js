import './App.css'

const WS_URL = 'ws://127.0.0.1:8000'

function App() {
  // Global var
  var response
  // Connection to WS
  const connect = () => {
    return new Promise(function (resolve, reject) {
      var server = new WebSocket(WS_URL)
      server.onopen = function () {
        resolve(server)
      }
      server.onerror = function (err) {
        console.log(err)
        reject(err)
      }
    })
  }
  const request = async (data) => {
    var request = {
      id: 'react-intro',
      data: data,
    }
    connect()
      .then((server) => {
        server.send(JSON.stringify(request))
        server.onmessage = ({ data }) => {
          response = JSON.parse(data) // save result
          console.log(response)
        }
      })
      .catch(function (err) {
        console.log(err)
      })
  }
  const clickme = () => {
    request('run')
  }
  return (
    <div className='App'>
      <button onClick={clickme}>Click</button>
    </div>
  )
}

export default App
