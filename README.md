# @jdev/http-client

**Http-client** es una dependencia para manejar el estados de las peticiones y enviar **peticiones HTTP**, esta totalmente optimizanda para que funcione de la mejor forma posible, tambien tiene unas integraciones para manejar la Autenticacion y los token.

## Install dependecy

Para instalar la dependencia use el siguiente shell

```sh
npm i @jdev/http-client
```

## 🚀Get Started

Despues de la instalacion de la dependencia a tu proyecto, tienes que importar el HttpProvider en el `main.jsx`.

```jsx
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { HttpProvider } from '@jdev/http-client'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HttpProvider>
    <App />
  </HttpProvider>
)
```

## Config

HttpProvider necesita tener algunas configuraciones por defecto, las configuraciones son para poder detectar a que direcion de la `API` o que tipo de peticiones quieres hacer

para definir las configuraciones sigue los siguientes pasos

- **Definir la baseUrl**: La `baseUrl` es la que usa el http-client para saber el origen de la **API** para definir la `baseUrl` puedes usar el siguiente codigo

  `base-url.js`

  ```js
  export const BASE_URL = 'http://127.0.0.1/api' // -> toda la url base
  ```

  **Tienes que remplazar la `BASE_URL`** a la direcion de tu `API-REST`

- **Definir las Querys**: las Querys son aquellas consultas que solo suelen devolver datos son como las peticiones `GET`, para poder pasarselas por parametros al `HttpProvider` tienes que definirlas.

  `querys-routes.js`

  ```js
  export const QUERYS = [
    {
      name: 'getUsers', // -> Nombre de la query, esto lo usaras para refenirte a este Query a la hora de hacer consultas
      url: '/getUsers', // -> esto es la url de la query que a unirla con la BASE_URL tienes la URL absoluta
    },
  ]
  ```

  puedes defenir todas la querys o peticiones `GET` que tenga tu `API-REST`

- **Definir las Mutations**: las Mutations son aquellas consultas que puede modificar datos son aparecidas a las peticiones `POST,PUT,DELETE`, para poder pasarselas por parametros al `HttpProvider` tienes que definirlas.

  `mutations-routes.js`

  ```js
  export const MUTATIONS = [
    {
      name: 'createUsers', // -> Nombre de la query, esto lo usaras para refenirte a este Query a la hora de hacer consultas
      url: '/createUser', // -> esto es la url de la query que a unirla con la BASE_URL tienes la URL absoluta
      method: 'POST', // -> esto sera el metodo de modificacion de la consulta.
    },
    {
      name: 'updateUser',
      url: '/updateUser',
      method: 'PUT', // -> metodo de modificacion
    },
    {
      name: 'deleteUser',
      url: '/deleteUser',
      method: 'DELETE', // -> metodo de eliminacion
    },
  ]
  ```

  puedes defenir todas la mutations o peticiones `POST,PUT,DELETE` que tenga tu `API-REST`

- **Definir el headers**: el header de http-client tiene alguna propiedades ya definidas, pero tambien te da la capacidad de que tu puedas añadir mas cabeceras. la puedes añadir de la siguiente forma.
  `headers.js`

  ```js
  export const HEADERS = {
    'Content-Type': 'application/json', // -> esta cabecera ya esta definida en el http-client
    // Puedes definir todas la headers que quieras que tenga tu http-client
    accept: '*',
    'user-agent': 'http-client',
    origin: 'http-client',
  }
  ```

- **Orden de la configuraciones**: Para ordenar las configuraciones puedes usar dos formas:

  - Definir un solo archivo todas las configuraciones establecidas en los pasos anteriores, el archivo quedaria de la siguiete forma.

    `config.js`

    ```js
    export const BASE_URL = 'http://127.0.0.1/api' // -> toda la url base

    // Querys
    export const QUERYS = [
      {
        name: 'getUsers', // -> Nombre de la query, esto lo usaras para refenirte a este Query a la hora de hacer consultas
        url: '/getUsers', // -> esto es la url de la query que a unirla con la BASE_URL tienes la URL absoluta
      },
    ]

    // Mutations
    export const MUTATIONS = [
      {
        name: 'createUsers', // -> Nombre de la query, esto lo usaras para refenirte a este Query a la hora de hacer consultas
        url: '/createUser', // -> esto es la url de la query que a unirla con la BASE_URL tienes la URL absoluta
        method: 'POST', // -> esto sera el metodo de modificacion de la consulta.
      },
      {
        name: 'updateUser',
        url: '/updateUser',
        method: 'PUT', // -> metodo de modificacion
      },
      {
        name: 'deleteUser',
        url: '/deleteUser',
        method: 'DELETE', // -> metodo de eliminacion
      },
    ]

    //Headers
    export const HEADERS = {
      'Content-Type': 'application/json', // -> esta cabecera ya esta definida en el http-client
      // Puedes definir todas la headers que quieras que tenga tu http-client
      accept: '*',
      'user-agent': 'http-client',
      origin: 'http-client',
    }
    ```

  - Otra forma y la mas recomenda es crear archivos y guardalos en una carpeta con el siguiente nombre `config-http-client` la estructura es la siguientes.

    ```text
    ├── src/
    │   ├── config-http-client/
    │   │   └── querys-routes.js
    │   │   └── mutations-routes.js
    │   │   └── headers.js
    │   │   └── base-url.js
    └──
    ```

    de esta forma tenemos mas control de modificaciones de nuestra configuracion.

Ya que tenemos definidas todas la configuraciones podemos pasarselas al `HttpProvider`.

`main.jsx`

```jsx
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { HttpProvider } from '@jdev/http-client'
import { QUERYS } from './config-http-client/querys-routes.js'
import { MUTATIONS } from './config-http-client/mutations-routes.js'
import { HEADERS } from './config-http-client/headers.js'
import { BASE_URL } from './config-http-client/base-url.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HttpProvider
    querys={QUERYS}
    mutations={MUTATIONS}
    headers={HEADERS}
    baseUrl={BASE_URL}
  >
    <App />
  </HttpProvider>
)
```

Con esto ya tenemos configurado nuestro http-client.

# Hooks

## useQuery:

el hook useQuery sirve para poder dar uso las peticiones de tipo query que definimos en las configuraciones.

`params`:

- `nameRequest <String>` : nombre de la mutations,definidos en las configuraciones , ejemplo: `getUsers`
- `params?  <Array[string]>` : parametros que le vas a pasar a la peticion

```jsx
import { useQuery } from '@jdev/http-client'

function ListUser(){
  const { data, isLoading, error} = useQuery('getUsers') //

  return (
    <div>
      {isLoading && <p>Loading</p>}
      {data && <CardUser data={data?.getUsers.data}>}
      {error && <p>{error}</p> }
    </div>
  )
}
```

el hook useQuery devuelve los siguentes valores.

- **data**: aqui devolvera los resultados de la peticion
- **isLoading**: si la peticion aun se esta cargado
- **isError**: si hay un error
- **error**: el error de la peticion
- **status**: el codigo de status de la peticion
- **statusText**: el codigo de status en texto
- **isOk**: si la peticion fue todo un exito
- **abortRequest**: para abordar la peticion

## useMutation:

el hook useMutation sirve para poder dar uso las peticiones de tipo mutation que definimos en las configuraciones.

`params`:

- `nameRequest <String>` : nombre de la mutations,definidos en las configuraciones , ejemplo: `createUsers`
- `body? <Object>` : los datos que le quieres enviar a la peticion
- `params? <Array[string]>` : parametros que le vas a pasar a la peticion

```jsx
import { useMutation } from '@jdev/http-client'

function createUsers() {
  const { data, isLoading, mutation, error } = useMutation('createUser', {
    input: { username: 'ejemplo123', email: 'ejemplo@ejemplo.com' },
  }) //

  return (
    <div>
      {error && <p>{error}</p>}
      <button onClick={mutation}>Create User</button>
      {isLoading && <p>Loading</p>}
    </div>
  )
}
```

el hook useQuery devuelve los siguentes valores.

- **data**: aqui devolvera los resultados de la peticion
- **isLoading**: si la peticion aun se esta cargado
- **mutation**: para enviar la peticion al servidor
- **isError**: si hay un error
- **error**: el error de la peticion
- **status**: el codigo de status de la peticion
- **statusText**: el codigo de status en texto
- **isOk**: si la peticion fue todo un exito
- **abortRequest**: para abordar la peticion

## useLazyQuery

el hook useLazyQuery sirve para poder dar uso las peticiones de tipo query, la diferencia es que la puede hacer en el momento que tu desees.

`params`:

- `nameRequest` : nombre de la query,definidos en las configuraciones , ejemplo: `getUsers`
- `params? <Array[string]>` : parametros que le vas a pasar a la peticion

```jsx
import { useLazyQuery } from '@jdev/http-client'

function ListUser() {
  const { data, isLoading, query, error } = useLazyQuery('createUser') //

  useEffect(() => {
    query()
  }, [])

  return (
    <div>
      {isLoading && <p>Loading</p>}
      {data && data?.data.map((user) => <p>{user.username}</p>)}
      {error && <p>{error}</p>}
    </div>
  )
}
```

el hook useLazyQuery devuelve los siguentes valores.

- **data**: aqui devolvera los resultados de la peticion
- **isLoading**: si la peticion aun se esta cargado
- **query**: para enviar la peticion al servidor
- **isError**: si hay un error
- **error**: el error de la peticion
- **status**: el codigo de status de la peticion
- **statusText**: el codigo de status en texto
- **isOk**: si la peticion fue todo un exito
- **abortRequest**: para abordar la peticion
