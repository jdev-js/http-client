import useQuery from './libs/use-query'

export default function App() {
  const { data,isLoading } = useQuery('getUsers')
  return (
    <div>
      <h1>Hola Mundo</h1>
      {isLoading && <p>Loading</p>}
      {data && data?.getUsers?.data.map((user,index) => {
        return <div key={index}>
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </div>
      })}
    </div>
  )
}