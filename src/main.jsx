import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import HttpProvider from './http-provider.jsx'

const BASE_URL = 'http://localhost:5173/api'
const config = {
  listURL: [
    {
      nameRequest: 'getUser',
      url: '/users.json',
      method: 'GET',
    },
  ],
  baseURL: BASE_URL,
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <HttpProvider config={config}>
    <App />
  </HttpProvider>
)
