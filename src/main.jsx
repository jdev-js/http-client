import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import HttpProvider from './libs/http-provider.jsx'

const BASE_URL = 'http://localhost:5173/api' 

const Querys = [
  {
    name: 'getUsers',
    url: '/users.json',
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
    <HttpProvider querys={Querys} baseUrl={BASE_URL}>
      <App />
    </HttpProvider>,
)
