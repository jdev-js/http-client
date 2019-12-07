import useRequest from './use-request'
import useSendRequest from './use-send-request'
import useStart from './use-start'
import useEnd from './use-end'

export default function App() {
  const { data, isLoading, sendRequest } = useRequest('getUser')
  const isSend = useSendRequest(sendRequest)

  useStart(() => console.log('Start Request'))
  useEnd(() => console.log('End Request'))

  return (
    <div>
      {data !== null && <p>Data</p>}
      {isLoading && <p>Loading</p>}
      {isSend && <p>Request Enviada</p>}
    </div>
  )
}
