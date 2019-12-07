# @jdev/http-client

**Http-client** es una dependencia para manejar el estados de las peticiones y enviar **peticiones HTTP**, esta totalmente optimizanda para que funcione de la mejor forma posible, tambien tiene unas integraciones para manejar la Autenticacion y los token.

## Install dependecy

Para instalar la dependencia use el siguiente shell

```sh
npm i @jdev/http-client
```

## 🚀Get Started

## Provider

importar el provider de la libreria, este provider necesita algunas configuraciones.

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

Puedes crear un archivo especifico para el tema de las configuraciones o lo puedes tener en el mismo **main.js**, las configuraciones debe incluir.

- **listURL**: aqui puedes definir todas tus rutas
- **baseURL**: la URL base de tu API

y esta configuracion se la pasas al provider por la prop: **config**

`main.jsx`

```jsx
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { HttpProvider } from '@jdev/http-client'

const CONFIG = {
  baseURL: 'https://localhost:3000/',
  listURL: [
    {
      nameRequest: 'getUsers',
      method: 'GET',
      url: 'api/getUsers',
    },
    {
      nameRequest: 'createUser',
      method: 'POST',
      ulr: 'api/createUser',
    },
  ],
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <HttpProvider config={CONFIG}>
    <App />
  </HttpProvider>
)
```

# Hooks

## useRequest:

hook para preparar y enviar la peticion HTTP a tu servidor de una manera segura y rapida.

`params`:

- `nameRequest <String>` : nombre de la mutations,definidos en las configuraciones , ejemplo: `getUsers`
- `body?  <Object>` : datos para enviar al servidor
- `timeAbort? <Number>` : tiempo para abordar la peticion si no recibe una respuesta

```jsx
import { useRequest } from '@jdev/http-client'

function ListUser(){
  const { data, isLoading,sendRequest, error} = useRequest('getUsers',null,2000) //

  useEffect(() => {
    sendRequest()
  },[])

  return (
    <div>
      {isLoading && <p>Loading</p>}
      {data && <CardUser data={data?.getUsers.data}>}
      {error && <p>{error}</p> }
    </div>
  )
}
```

el hook useSend devuelve los siguentes valores.

- **data**: aqui devolvera los resultados de la peticion
- **isLoading**: si la peticion aun se esta cargado
- **isError**: si hay un error
- **error**: el error de la peticion
- **sendRequest**: guncion para enviar la petcion, recibe por parametros, las query para tu peticion
- **abortRequest**: para abordar la peticion

## useSendRequest:

hook para enviar petiones este hooks, se usa junto el hook **useRequest**

`params`:

- `functionRequest <Function>` : request para enviar
- `params? <String>` : query para enviar junto a la request
- `timeUpdate? <Array[string]>` : tiempo para volver a ejecutar la request

```jsx
import { useSendRequest,useRequest } from '@jdev/http-client'

function ListUser(){
  const { data, isLoading,sendRequest, error} = useRequest('getUsers',null,2000) //
  const isSend = useSendRequest(sendRequest,null,4000)

  return (
    <div>
      {isLoading && <p>Loading</p>}
      {data && <CardUser data={data?.getUsers.data}>}
      {error && <p>{error}</p> }
      {isSend && <p>Respuesta enviada</p>}
    </div>
  )
}
```

el hook useSendRequest devuelve los siguentes valores.

- **isSend**: si la peticion se envio correctamente

## useStart

hook para ejecutar un funcion cuando la peticion se envie

`params`:

- `callback <Function>` : funcion a ejectutar

```jsx
import { useStart,useRequest,useSendRequest } from '@jdev/http-client'

function ListUser(){
  const { data, isLoading,sendRequest, error} = useRequest('getUsers',null,2000) //
  const isSend = useSendRequest(sendRequest,null,4000)
  useStart(() => console.log('Peticion Enviada'))

  return (
    <div>
      {isLoading && <p>Loading</p>}
      {data && <CardUser data={data?.getUsers.data}>}
      {error && <p>{error}</p> }
      {isSend && <p>Respuesta enviada</p>}
    </div>
  )
}
```

## useEnd

hook para ejecutar un funcion cuando la peticion termine

`params`:

- `callback <Function>` : funcion a ejecutar

```jsx
import { useEnd,useRequest,useSendRequest } from '@jdev/http-client'

function ListUser(){
  const { data, isLoading,sendRequest, error} = useRequest('getUsers',null,2000) //
  const isSend = useSendRequest(sendRequest,null,4000)
  useEnd(() => console.log('Peticion terminada'))

  return (
    <div>
      {isLoading && <p>Loading</p>}
      {data && <CardUser data={data?.getUsers.data}>}
      {error && <p>{error}</p> }
      {isSend && <p>Respuesta enviada</p>}
    </div>
  )
}
```

## useError

hook para ejecutar un funcion cuando la peticion tenga un error

`params`:

- `callback <Function>` : funcion a ejecutar

```jsx
import { useError,useRequest,useSendRequest } from '@jdev/http-client'

function ListUser(){
  const { data, isLoading,sendRequest, error} = useRequest('getUsers',null,2000) //
  const isSend = useSendRequest(sendRequest,null,4000)
  useError(() => console.log('Peticion fallo'))

  return (
    <div>
      {isLoading && <p>Loading</p>}
      {data && <CardUser data={data?.getUsers.data}>}
      {error && <p>{error}</p> }
      {isSend && <p>Respuesta enviada</p>}
    </div>
  )
}
```

## useBaseURL

hook para obtener y modificar la baseURL del Http-client

```jsx
import { useBaseURL, useEffect } from '@jdev/http-client'

function App() {
  const { url, changeBaseURL } = useBaseURL()

  useEffect(() => {
    changeBaseURL('https://localhost:4000/')
  }, [])

  return (
    <div>
      <p>URL: {url}</p>
    </div>
  )
}
```

el hook useBaseURL devuelve los siguentes valores.

- **url**: url actual
- **changeBaseURL**: para cambiar la url actual

## useGlobalConfig

hook para obtener y modificar toda la configuracion del Http-client

```jsx
import { useGlobalConfig } from '@jdev/http-client'

function App() {
  const { config, changeConfig } = useGlobalConfig()

  useEffect(() => {
    changeConfig((config, setConfig) => {
      setConfig({
        ...config,
        listURL: [
          ...config.listURL,
          {
            nameRequest: 'deleteUser',
            method: 'DELETE',
            url: 'api/deleteUser',
          },
        ],
      })
    })
  }, [])

  return (
    <div>
      <p>Config: {config}</p>
    </div>
  )
}
```

el hook useGlobalConfig devuelve los siguentes valores.

- **config**: config actual
- **changeConfig**: para cambiar la config actual

## useInterceptors

hook para obtener y modificar toda la cabecera de las requests

```jsx
import { useInterceptors } from '@jdev/http-client'

function App() {
  const { headers, setItem } = useInterceptors()
  setItem('Authorization', 'Bearer lkjd91023uadali%%') // -> actualizar siempre los headers antes de enviar la peticion al servidor

  return (
    <div>
      <p>Headers: {headers}</p>
    </div>
  )
}
```

el hook useInterceptors devuelve los siguentes valores.

- **headers**: headers actual
- **setItem**: para añadir un **Item** nuevo en el cabecera
- **deleteItem**: para eliminar un **Item** del cabecera
- **clear**: para limpiar toda la cabecera
